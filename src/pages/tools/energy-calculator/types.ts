/**
 * Energy Flow Calculator Types
 * Based on the energy flow analysis framework for Univrs.io
 */

// Energy source technologies with their EROI characteristics
export interface EnergySource {
  id: string;
  name: string;
  eroiMin: number;
  eroiMax: number;
  eroiDefault: number;
  capacityFactorMin: number;
  capacityFactorMax: number;
  capacityFactorDefault: number;
  lifespanYears: number;
  manufacturingEnergyPerKw: number; // kWh per kW capacity
}

// Location characteristics affecting solar resource
export interface LocationData {
  latitude: number;
  longitude: number;
  solarResource: number; // kWh/m2/year
  description: string;
}

// Efficiency values for each step in the energy chain
export interface EfficiencyChain {
  pvEfficiency: number;        // Solar PV conversion (15-22%)
  inverterEfficiency: number;  // DC to AC conversion (95-97%)
  transmissionEfficiency: number; // Grid/local transmission (88-98%)
  storageEfficiency: number;   // Battery round-trip (80-90%)
  endUseEfficiency: number;    // Final conversion to useful work (80-95%)
}

// Community/node specifications
export interface NodeSpecification {
  communitySize: number;       // Number of people
  systemSizeKw: number;        // Peak capacity in kW
  targetConsumption: number;   // kWh/person/year target
  activeNodes: number;         // Number of network nodes
  batteryCapacityKwh: number;  // Storage capacity
}

// Energy budget breakdown
export interface EnergyBudget {
  annualGeneration: number;    // Total kWh/year generated
  networkOverhead: number;     // kWh/year for coordination
  reproductionOverhead: number; // kWh/year for infrastructure replacement
  availableEnergy: number;     // kWh/year for community use
  perCapitaAvailable: number;  // kWh/person/year
}

// EROI calculation results
export interface EroiResult {
  sourceEroi: number;
  deliveredEroi: number;
  cumulativeEfficiency: number;
  meetsThreshold: boolean;     // True if >= 7:1
  efficiencyBreakdown: {
    step: string;
    efficiency: number;
    energyAfter: number;       // Relative energy remaining (1.0 = 100%)
  }[];
}

// Closure test results
export interface ClosureResult {
  generationVsConsumption: number; // Ratio of available to target
  selfSufficiencyPercent: number;
  gapKwhPerPerson: number;
  achievesClosure: boolean;
  recommendations: string[];
}

// Complete calculator state
export interface CalculatorState {
  source: EnergySource;
  location: LocationData;
  efficiencies: EfficiencyChain;
  node: NodeSpecification;
}

// Complete calculation output
export interface CalculationResults {
  eroi: EroiResult;
  budget: EnergyBudget;
  closure: ClosureResult;
}

// Predefined energy sources
export const ENERGY_SOURCES: EnergySource[] = [
  {
    id: 'solar-utility',
    name: 'Solar PV (Utility)',
    eroiMin: 10,
    eroiMax: 20,
    eroiDefault: 15,
    capacityFactorMin: 0.15,
    capacityFactorMax: 0.25,
    capacityFactorDefault: 0.20,
    lifespanYears: 27.5,
    manufacturingEnergyPerKw: 1500,
  },
  {
    id: 'solar-rooftop',
    name: 'Solar PV (Rooftop)',
    eroiMin: 6,
    eroiMax: 12,
    eroiDefault: 9,
    capacityFactorMin: 0.12,
    capacityFactorMax: 0.20,
    capacityFactorDefault: 0.16,
    lifespanYears: 27.5,
    manufacturingEnergyPerKw: 1500,
  },
  {
    id: 'wind-onshore',
    name: 'Wind (Onshore)',
    eroiMin: 18,
    eroiMax: 25,
    eroiDefault: 21,
    capacityFactorMin: 0.25,
    capacityFactorMax: 0.40,
    capacityFactorDefault: 0.32,
    lifespanYears: 22.5,
    manufacturingEnergyPerKw: 1200,
  },
  {
    id: 'wind-offshore',
    name: 'Wind (Offshore)',
    eroiMin: 12,
    eroiMax: 18,
    eroiDefault: 15,
    capacityFactorMin: 0.35,
    capacityFactorMax: 0.50,
    capacityFactorDefault: 0.42,
    lifespanYears: 22.5,
    manufacturingEnergyPerKw: 2000,
  },
  {
    id: 'hydro',
    name: 'Hydroelectric',
    eroiMin: 40,
    eroiMax: 100,
    eroiDefault: 70,
    capacityFactorMin: 0.30,
    capacityFactorMax: 0.60,
    capacityFactorDefault: 0.45,
    lifespanYears: 75,
    manufacturingEnergyPerKw: 800,
  },
];

// Predefined location presets based on latitude bands
export const LOCATION_PRESETS: LocationData[] = [
  { latitude: 0, longitude: 0, solarResource: 2250, description: 'Equatorial (0°)' },
  { latitude: 20, longitude: 0, solarResource: 2000, description: 'Tropical (20°N/S)' },
  { latitude: 35, longitude: 0, solarResource: 1700, description: 'Subtropical (35°N/S)' },
  { latitude: 40, longitude: 0, solarResource: 1500, description: 'Mid-Latitude (40°N/S)' },
  { latitude: 50, longitude: 0, solarResource: 1200, description: 'Temperate (50°N/S)' },
  { latitude: 60, longitude: 0, solarResource: 1000, description: 'High Latitude (60°N/S)' },
];

// Reference consumption levels
export const CONSUMPTION_REFERENCES = {
  usAverage: 12000,      // kWh/person/year
  globalAverage: 3000,   // kWh/person/year
  minimumModern: 2000,   // kWh/person/year for basic modern lifestyle
  ecovillage: 1000,      // kWh/person/year in optimized community
};

// The critical EROI threshold for civilization sustainability
export const EROI_THRESHOLD = 7;
