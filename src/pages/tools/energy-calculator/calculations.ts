/**
 * Energy Flow Calculator - Calculation Functions
 * Implements the energy flow analysis framework for Univrs.io
 */

import {
  EfficiencyChain,
  NodeSpecification,
  EnergySource,
  LocationData,
  EroiResult,
  EnergyBudget,
  ClosureResult,
  CalculationResults,
  EROI_THRESHOLD,
  CONSUMPTION_REFERENCES,
} from './types';

/**
 * Calculate delivered EROI after all transformation losses
 *
 * This is the core calculation from the energy flow analysis.
 * Source EROI (e.g., 15:1 for solar PV) gets reduced by each
 * efficiency step in the transformation chain.
 */
export function calculateDeliveredEroi(
  sourceEroi: number,
  efficiencies: EfficiencyChain
): EroiResult {
  const {
    pvEfficiency,
    inverterEfficiency,
    transmissionEfficiency,
    storageEfficiency,
    endUseEfficiency,
  } = efficiencies;

  // Calculate cumulative efficiency through the chain
  const cumulativeEfficiency =
    pvEfficiency *
    inverterEfficiency *
    transmissionEfficiency *
    storageEfficiency *
    endUseEfficiency;

  // Delivered EROI is source EROI multiplied by cumulative efficiency
  const deliveredEroi = sourceEroi * cumulativeEfficiency;

  // Build the breakdown showing energy at each step
  let energyRemaining = 1.0;
  const efficiencyBreakdown = [
    { step: 'Solar Flux', efficiency: 1.0, energyAfter: energyRemaining },
  ];

  // PV Conversion
  energyRemaining *= pvEfficiency;
  efficiencyBreakdown.push({
    step: 'PV Conversion',
    efficiency: pvEfficiency,
    energyAfter: energyRemaining,
  });

  // Inverter
  energyRemaining *= inverterEfficiency;
  efficiencyBreakdown.push({
    step: 'Inverter',
    efficiency: inverterEfficiency,
    energyAfter: energyRemaining,
  });

  // Transmission
  energyRemaining *= transmissionEfficiency;
  efficiencyBreakdown.push({
    step: 'Transmission',
    efficiency: transmissionEfficiency,
    energyAfter: energyRemaining,
  });

  // Storage
  energyRemaining *= storageEfficiency;
  efficiencyBreakdown.push({
    step: 'Storage',
    efficiency: storageEfficiency,
    energyAfter: energyRemaining,
  });

  // End Use
  energyRemaining *= endUseEfficiency;
  efficiencyBreakdown.push({
    step: 'End Use',
    efficiency: endUseEfficiency,
    energyAfter: energyRemaining,
  });

  return {
    sourceEroi,
    deliveredEroi,
    cumulativeEfficiency,
    meetsThreshold: deliveredEroi >= EROI_THRESHOLD,
    efficiencyBreakdown,
  };
}

/**
 * Calculate annual energy generation based on system specs
 */
export function calculateAnnualGeneration(
  systemSizeKw: number,
  location: LocationData,
  source: EnergySource
): number {
  // For solar: use location's solar resource and capacity factor
  // Solar resource is in kWh/m2/year, but we use effective sun hours
  // Approximate: solar resource / 1000 gives effective peak sun hours per day
  // Then multiply by 365 to get yearly effective hours

  if (source.id.startsWith('solar')) {
    // Effective sun hours based on location
    const effectiveHours = location.solarResource;
    return systemSizeKw * effectiveHours;
  }

  // For wind/hydro: use capacity factor
  const hoursPerYear = 8760;
  const effectiveHours = hoursPerYear * source.capacityFactorDefault;
  return systemSizeKw * effectiveHours;
}

/**
 * Calculate network coordination overhead
 * Per-node energy budget based on the analysis framework
 */
export function calculateNetworkOverhead(activeNodes: number): number {
  // Per-node annual energy (from analysis):
  // Computing: 43.8 kWh/year
  // Communication: 87.6 kWh/year
  // Storage: 26.3 kWh/year
  const perNodeOverhead = 43.8 + 87.6 + 26.3; // ~158 kWh/year

  return activeNodes * perNodeOverhead;
}

/**
 * Calculate reproduction/replacement overhead
 * Annual amortized manufacturing energy for infrastructure
 */
export function calculateReproductionOverhead(
  systemSizeKw: number,
  batteryCapacityKwh: number,
  activeNodes: number,
  source: EnergySource
): number {
  // Solar/energy system manufacturing
  const systemManufacturingEnergy = systemSizeKw * source.manufacturingEnergyPerKw;
  const systemAmortized = systemManufacturingEnergy / source.lifespanYears;

  // Battery manufacturing (100-200 kWh per kWh capacity, use 150 average)
  const batteryManufacturingEnergy = batteryCapacityKwh * 150;
  const batteryLifespan = 12; // years
  const batteryAmortized = batteryManufacturingEnergy / batteryLifespan;

  // Computing/networking hardware (~1000 kWh per node)
  const nodeManufacturingEnergy = activeNodes * 1000;
  const nodeLifespan = 6; // years
  const nodeAmortized = nodeManufacturingEnergy / nodeLifespan;

  return systemAmortized + batteryAmortized + nodeAmortized;
}

/**
 * Calculate complete energy budget for a node
 */
export function calculateEnergyBudget(
  systemSizeKw: number,
  location: LocationData,
  source: EnergySource,
  communitySize: number,
  activeNodes: number,
  batteryCapacityKwh: number
): EnergyBudget {
  const annualGeneration = calculateAnnualGeneration(systemSizeKw, location, source);
  const networkOverhead = calculateNetworkOverhead(activeNodes);
  const reproductionOverhead = calculateReproductionOverhead(
    systemSizeKw,
    batteryCapacityKwh,
    activeNodes,
    source
  );

  const availableEnergy = annualGeneration - networkOverhead - reproductionOverhead;
  const perCapitaAvailable = communitySize > 0 ? availableEnergy / communitySize : 0;

  return {
    annualGeneration,
    networkOverhead,
    reproductionOverhead,
    availableEnergy,
    perCapitaAvailable,
  };
}

/**
 * Test autopoietic closure - can the system reproduce itself?
 */
export function calculateClosure(
  budget: EnergyBudget,
  targetConsumption: number,
  communitySize: number
): ClosureResult {
  const totalTargetConsumption = targetConsumption * communitySize;
  const generationVsConsumption = budget.availableEnergy / totalTargetConsumption;
  const selfSufficiencyPercent = Math.min(generationVsConsumption * 100, 100);
  const gapKwhPerPerson = Math.max(targetConsumption - budget.perCapitaAvailable, 0);
  const achievesClosure = generationVsConsumption >= 1.0;

  // Generate recommendations based on the gap
  const recommendations: string[] = [];

  if (!achievesClosure) {
    const shortfallPercent = ((1 - generationVsConsumption) * 100).toFixed(0);

    if (targetConsumption > CONSUMPTION_REFERENCES.globalAverage) {
      recommendations.push(
        `Consider reducing target consumption from ${targetConsumption.toLocaleString()} to ${CONSUMPTION_REFERENCES.globalAverage.toLocaleString()} kWh/person/year (global average)`
      );
    }

    if (targetConsumption > CONSUMPTION_REFERENCES.ecovillage) {
      recommendations.push(
        `Ecovillage research shows modern satisfaction achievable at ~${CONSUMPTION_REFERENCES.ecovillage.toLocaleString()} kWh/person/year`
      );
    }

    recommendations.push(
      `Current shortfall: ${shortfallPercent}%. Consider increasing system size or reducing consumption.`
    );

    // Calculate required system size for closure
    const requiredGeneration = totalTargetConsumption + budget.networkOverhead + budget.reproductionOverhead;

    recommendations.push(
      `For full closure at current consumption: consider ~${Math.ceil(requiredGeneration / 1500)} kW system`
    );
  } else {
    recommendations.push('System achieves energy closure at current specifications.');

    const surplus = budget.perCapitaAvailable - targetConsumption;
    if (surplus > 0) {
      recommendations.push(
        `Surplus of ${surplus.toFixed(0)} kWh/person/year available for growth or export.`
      );
    }
  }

  return {
    generationVsConsumption,
    selfSufficiencyPercent,
    gapKwhPerPerson,
    achievesClosure,
    recommendations,
  };
}

/**
 * Main calculation function - runs all calculations
 */
export function calculateAll(
  source: EnergySource,
  location: LocationData,
  efficiencies: EfficiencyChain,
  node: NodeSpecification
): CalculationResults {
  // EROI calculation
  const eroi = calculateDeliveredEroi(source.eroiDefault, efficiencies);

  // Energy budget
  const budget = calculateEnergyBudget(
    node.systemSizeKw,
    location,
    source,
    node.communitySize,
    node.activeNodes,
    node.batteryCapacityKwh
  );

  // Closure test
  const closure = calculateClosure(budget, node.targetConsumption, node.communitySize);

  return { eroi, budget, closure };
}

/**
 * Format number with appropriate units
 */
export function formatEnergy(kWh: number): string {
  if (kWh >= 1000000) {
    return `${(kWh / 1000000).toFixed(1)} GWh`;
  } else if (kWh >= 1000) {
    return `${(kWh / 1000).toFixed(1)} MWh`;
  }
  return `${kWh.toFixed(0)} kWh`;
}

/**
 * Get EROI status color
 */
export function getEroiColor(eroi: number): string {
  if (eroi >= EROI_THRESHOLD) return 'text-green-400';
  if (eroi >= EROI_THRESHOLD * 0.5) return 'text-yellow-400';
  return 'text-red-400';
}

/**
 * Get closure status color
 */
export function getClosureColor(percent: number): string {
  if (percent >= 100) return 'text-green-400';
  if (percent >= 70) return 'text-yellow-400';
  return 'text-red-400';
}

/**
 * Estimate solar resource from latitude
 */
export function estimateSolarResourceFromLatitude(latitude: number): number {
  const absLat = Math.abs(latitude);

  // Approximate solar resource based on latitude
  // Equator: ~2250 kWh/m2/year
  // Decreases roughly linearly to ~800 at 70 degrees
  if (absLat <= 10) return 2250;
  if (absLat <= 20) return 2000;
  if (absLat <= 30) return 1800;
  if (absLat <= 40) return 1500;
  if (absLat <= 50) return 1200;
  if (absLat <= 60) return 1000;
  return 800;
}
