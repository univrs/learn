/**
 * Energy Flow Calculator
 * Interactive tool implementing the energy flow analysis framework
 */

import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Info, AlertTriangle, CheckCircle, Sun, Zap, Battery, Home } from 'lucide-react';

import {
  EnergySource,
  LocationData,
  EfficiencyChain,
  NodeSpecification,
  ENERGY_SOURCES,
  LOCATION_PRESETS,
  CONSUMPTION_REFERENCES,
  EROI_THRESHOLD,
} from './types';

import {
  calculateAll,
  formatEnergy,
  getEroiColor,
  getClosureColor,
  estimateSolarResourceFromLatitude,
} from './calculations';

// Default efficiency values (from the analysis)
const DEFAULT_EFFICIENCIES: EfficiencyChain = {
  pvEfficiency: 0.20,
  inverterEfficiency: 0.96,
  transmissionEfficiency: 0.94,
  storageEfficiency: 0.85,
  endUseEfficiency: 0.90,
};

// Default node specification
const DEFAULT_NODE: NodeSpecification = {
  communitySize: 150,
  systemSizeKw: 100,
  targetConsumption: 2000,
  activeNodes: 10,
  batteryCapacityKwh: 500,
};

export default function EnergyCalculator() {
  // State for energy source
  const [selectedSource, setSelectedSource] = useState<EnergySource>(ENERGY_SOURCES[0]);

  // State for location
  const [location, setLocation] = useState<LocationData>(LOCATION_PRESETS[3]); // Default: 40N
  const [customLatitude, setCustomLatitude] = useState<number>(40);

  // State for efficiencies
  const [efficiencies, setEfficiencies] = useState<EfficiencyChain>(DEFAULT_EFFICIENCIES);

  // State for node specification
  const [node, setNode] = useState<NodeSpecification>(DEFAULT_NODE);

  // Calculate results
  const results = useMemo(
    () => calculateAll(selectedSource, location, efficiencies, node),
    [selectedSource, location, efficiencies, node]
  );

  // Update efficiency handler
  const updateEfficiency = (key: keyof EfficiencyChain, value: number) => {
    setEfficiencies((prev) => ({ ...prev, [key]: value }));
  };

  // Update node spec handler
  const updateNode = (key: keyof NodeSpecification, value: number) => {
    setNode((prev) => ({ ...prev, [key]: value }));
  };

  // Update location from latitude
  const updateLatitude = (lat: number) => {
    setCustomLatitude(lat);
    const solarResource = estimateSolarResourceFromLatitude(lat);
    setLocation({
      latitude: lat,
      longitude: 0,
      solarResource,
      description: `Custom (${lat}° latitude)`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Energy Flow Calculator | Univrs Learn</title>
        <meta
          name="description"
          content="Calculate delivered EROI and test autopoietic closure for distributed energy systems."
        />
      </Helmet>

      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-light mb-4">
              Energy Flow Calculator
            </h1>
            <p className="text-lg text-univrs-text-secondary">
              Analyze energy flows through proposed network architectures. Calculate delivered EROI
              and test whether a system can achieve autopoietic closure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              {/* Energy Source Selection */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <Sun className="w-5 h-5" style={{ color: 'var(--glow-gold)' }} />
                  Energy Source
                </h3>
                <select
                  value={selectedSource.id}
                  onChange={(e) => {
                    const source = ENERGY_SOURCES.find((s) => s.id === e.target.value);
                    if (source) setSelectedSource(source);
                  }}
                  className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                >
                  {ENERGY_SOURCES.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name} (EROI: {source.eroiMin}-{source.eroiMax}:1)
                    </option>
                  ))}
                </select>
                <div className="mt-3 text-sm text-univrs-text-secondary">
                  Source EROI: <span className="text-[var(--glow-cyan)]">{selectedSource.eroiDefault}:1</span>
                  {' | '}Lifespan: {selectedSource.lifespanYears} years
                </div>
              </div>

              {/* Location Settings */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <span style={{ color: 'var(--spore-purple)' }}>*</span>
                  Location
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-2">
                      Latitude: {customLatitude}°
                    </label>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      step="1"
                      value={customLatitude}
                      onChange={(e) => updateLatitude(Number(e.target.value))}
                      className="w-full accent-[var(--glow-cyan)]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-univrs-text-secondary">
                    <span>60°S</span>
                    <span>Equator</span>
                    <span>60°N</span>
                  </div>
                  <div className="text-sm">
                    Solar Resource:{' '}
                    <span className="text-[var(--glow-cyan)]">
                      {location.solarResource.toLocaleString()} kWh/m²/year
                    </span>
                  </div>
                </div>
              </div>

              {/* Community Specs */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" style={{ color: 'var(--glow-cyan)' }} />
                  Community Specification
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-1">
                      Community Size
                    </label>
                    <input
                      type="number"
                      value={node.communitySize}
                      onChange={(e) => updateNode('communitySize', Number(e.target.value))}
                      className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                    />
                    <span className="text-xs text-univrs-text-secondary">people</span>
                  </div>
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-1">
                      System Size
                    </label>
                    <input
                      type="number"
                      value={node.systemSizeKw}
                      onChange={(e) => updateNode('systemSizeKw', Number(e.target.value))}
                      className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                    />
                    <span className="text-xs text-univrs-text-secondary">kW peak</span>
                  </div>
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-1">
                      Target Consumption
                    </label>
                    <input
                      type="number"
                      value={node.targetConsumption}
                      onChange={(e) => updateNode('targetConsumption', Number(e.target.value))}
                      className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                    />
                    <span className="text-xs text-univrs-text-secondary">kWh/person/year</span>
                  </div>
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-1">
                      Battery Capacity
                    </label>
                    <input
                      type="number"
                      value={node.batteryCapacityKwh}
                      onChange={(e) => updateNode('batteryCapacityKwh', Number(e.target.value))}
                      className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                    />
                    <span className="text-xs text-univrs-text-secondary">kWh</span>
                  </div>
                  <div>
                    <label className="text-sm text-univrs-text-secondary block mb-1">
                      Active Nodes
                    </label>
                    <input
                      type="number"
                      value={node.activeNodes}
                      onChange={(e) => updateNode('activeNodes', Number(e.target.value))}
                      className="w-full bg-[var(--moss)] border border-[var(--border-subtle)] rounded px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--glow-cyan)]"
                    />
                    <span className="text-xs text-univrs-text-secondary">network nodes</span>
                  </div>
                </div>
                {/* Consumption reference */}
                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] text-xs text-univrs-text-secondary">
                  Reference: US avg {CONSUMPTION_REFERENCES.usAverage.toLocaleString()} | Global avg{' '}
                  {CONSUMPTION_REFERENCES.globalAverage.toLocaleString()} | Ecovillage{' '}
                  {CONSUMPTION_REFERENCES.ecovillage.toLocaleString()} kWh/person/year
                </div>
              </div>

              {/* Efficiency Chain */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" style={{ color: 'var(--glow-cyan)' }} />
                  Efficiency Chain
                </h3>
                <div className="space-y-4">
                  <EfficiencySlider
                    label="PV Conversion"
                    value={efficiencies.pvEfficiency}
                    onChange={(v) => updateEfficiency('pvEfficiency', v)}
                    min={0.1}
                    max={0.3}
                    step={0.01}
                    description="Solar panel efficiency (15-25% typical)"
                  />
                  <EfficiencySlider
                    label="Inverter"
                    value={efficiencies.inverterEfficiency}
                    onChange={(v) => updateEfficiency('inverterEfficiency', v)}
                    min={0.9}
                    max={0.99}
                    step={0.01}
                    description="DC to AC conversion (95-97% typical)"
                  />
                  <EfficiencySlider
                    label="Transmission"
                    value={efficiencies.transmissionEfficiency}
                    onChange={(v) => updateEfficiency('transmissionEfficiency', v)}
                    min={0.85}
                    max={0.99}
                    step={0.01}
                    description="Grid/local transmission (88-98%)"
                  />
                  <EfficiencySlider
                    label="Storage"
                    value={efficiencies.storageEfficiency}
                    onChange={(v) => updateEfficiency('storageEfficiency', v)}
                    min={0.7}
                    max={0.95}
                    step={0.01}
                    description="Battery round-trip (80-90% typical)"
                  />
                  <EfficiencySlider
                    label="End Use"
                    value={efficiencies.endUseEfficiency}
                    onChange={(v) => updateEfficiency('endUseEfficiency', v)}
                    min={0.7}
                    max={0.98}
                    step={0.01}
                    description="Final conversion to useful work"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Energy Flow Diagram */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4">Energy Flow Diagram</h3>
                <EnergyFlowDiagram breakdown={results.eroi.efficiencyBreakdown} />
              </div>

              {/* EROI Result */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  EROI Analysis
                  {results.eroi.meetsThreshold ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-[var(--moss)] rounded-lg text-center">
                    <div className="text-sm text-univrs-text-secondary mb-1">Source EROI</div>
                    <div className="text-2xl font-light text-[var(--glow-gold)]">
                      {results.eroi.sourceEroi}:1
                    </div>
                  </div>
                  <div className="p-4 bg-[var(--moss)] rounded-lg text-center">
                    <div className="text-sm text-univrs-text-secondary mb-1">Delivered EROI</div>
                    <div className={`text-2xl font-light ${getEroiColor(results.eroi.deliveredEroi)}`}>
                      {results.eroi.deliveredEroi.toFixed(1)}:1
                    </div>
                  </div>
                </div>
                <div className="text-sm text-univrs-text-secondary">
                  <p>
                    Cumulative efficiency:{' '}
                    <span className="text-[var(--glow-cyan)]">
                      {(results.eroi.cumulativeEfficiency * 100).toFixed(1)}%
                    </span>
                  </p>
                  <p className="mt-2">
                    Threshold for civilization sustainability:{' '}
                    <span className={results.eroi.meetsThreshold ? 'text-green-400' : 'text-red-400'}>
                      {EROI_THRESHOLD}:1
                    </span>
                  </p>
                  {!results.eroi.meetsThreshold && (
                    <p className="mt-2 text-red-400">
                      Warning: Delivered EROI below civilization threshold. System may not be sustainable.
                    </p>
                  )}
                </div>
              </div>

              {/* Energy Budget */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5" style={{ color: 'var(--spore-purple)' }} />
                  Energy Budget
                </h3>
                <div className="space-y-3">
                  <BudgetRow
                    label="Annual Generation"
                    value={formatEnergy(results.budget.annualGeneration)}
                    percent={100}
                    color="var(--glow-cyan)"
                  />
                  <BudgetRow
                    label="Network Overhead"
                    value={formatEnergy(results.budget.networkOverhead)}
                    percent={(results.budget.networkOverhead / results.budget.annualGeneration) * 100}
                    color="var(--glow-gold)"
                    negative
                  />
                  <BudgetRow
                    label="Reproduction Overhead"
                    value={formatEnergy(results.budget.reproductionOverhead)}
                    percent={(results.budget.reproductionOverhead / results.budget.annualGeneration) * 100}
                    color="var(--spore-purple)"
                    negative
                  />
                  <div className="pt-2 border-t border-[var(--border-subtle)]">
                    <BudgetRow
                      label="Available for Community"
                      value={formatEnergy(results.budget.availableEnergy)}
                      percent={(results.budget.availableEnergy / results.budget.annualGeneration) * 100}
                      color="var(--glow-cyan)"
                      bold
                    />
                  </div>
                  <div className="pt-2 text-center p-4 bg-[var(--moss)] rounded-lg">
                    <div className="text-sm text-univrs-text-secondary mb-1">Per Capita Available</div>
                    <div className="text-xl font-light text-[var(--text-primary)]">
                      {results.budget.perCapitaAvailable.toFixed(0)} kWh/person/year
                    </div>
                  </div>
                </div>
              </div>

              {/* Closure Test */}
              <div className="card">
                <h3 className="text-lg font-normal mb-4 flex items-center gap-2">
                  Autopoietic Closure Test
                  {results.closure.achievesClosure ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  )}
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-univrs-text-secondary">Self-Sufficiency</span>
                    <span className={getClosureColor(results.closure.selfSufficiencyPercent)}>
                      {results.closure.selfSufficiencyPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bark)] rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(results.closure.selfSufficiencyPercent, 100)}%`,
                        background: results.closure.achievesClosure
                          ? 'var(--glow-cyan)'
                          : results.closure.selfSufficiencyPercent >= 70
                          ? 'var(--glow-gold)'
                          : '#ef4444',
                      }}
                    />
                  </div>
                </div>
                {results.closure.gapKwhPerPerson > 0 && (
                  <div className="text-sm text-univrs-text-secondary mb-4">
                    Gap:{' '}
                    <span className="text-red-400">
                      {results.closure.gapKwhPerPerson.toFixed(0)} kWh/person/year
                    </span>{' '}
                    shortfall
                  </div>
                )}
                <div className="space-y-2">
                  {results.closure.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <Info className="w-4 h-4 text-[var(--glow-cyan)] flex-shrink-0 mt-0.5" />
                      <span className="text-univrs-text-secondary">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Info */}
      <section className="py-12 bg-univrs-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-light mb-4">About This Calculator</h2>
            <p className="text-univrs-text-secondary mb-4">
              This tool implements the energy flow analysis framework developed to address the
              fundamental question: "Where does the energy come from and how does it flow?"
            </p>
            <p className="text-univrs-text-secondary">
              The calculations account for efficiency losses at each step of the energy chain, from
              initial capture (solar flux) through PV conversion, inverter, transmission, storage,
              and final end-use conversion. The delivered EROI represents the actual energy return
              available for useful work, which is typically much lower than the source EROI often
              cited for renewable technologies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// Sub-components

interface EfficiencySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  description: string;
}

function EfficiencySlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  description,
}: EfficiencySliderProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm">{label}</label>
        <span className="text-sm text-[var(--glow-cyan)]">{(value * 100).toFixed(0)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--glow-cyan)]"
      />
      <div className="text-xs text-univrs-text-secondary">{description}</div>
    </div>
  );
}

interface BudgetRowProps {
  label: string;
  value: string;
  percent: number;
  color: string;
  negative?: boolean;
  bold?: boolean;
}

function BudgetRow({ label, value, percent, color, negative, bold }: BudgetRowProps) {
  return (
    <div className={`flex justify-between items-center ${bold ? 'font-medium' : ''}`}>
      <span className="text-sm text-univrs-text-secondary">
        {negative && '- '}
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-univrs-text-secondary">({percent.toFixed(1)}%)</span>
        <span className="text-sm" style={{ color }}>
          {value}
        </span>
      </div>
    </div>
  );
}

interface EnergyFlowDiagramProps {
  breakdown: {
    step: string;
    efficiency: number;
    energyAfter: number;
  }[];
}

function EnergyFlowDiagram({ breakdown }: EnergyFlowDiagramProps) {
  return (
    <svg viewBox="0 0 600 180" className="w-full" style={{ maxHeight: '180px' }}>
      {/* Background */}
      <rect x="0" y="0" width="600" height="180" fill="transparent" />

      {/* Flow visualization */}
      {breakdown.map((step, i) => {
        const x = 40 + i * 95;
        const barHeight = step.energyAfter * 100;
        const y = 140 - barHeight;
        const isLast = i === breakdown.length - 1;
        const lossPercent = i > 0 ? ((1 - step.efficiency) * 100).toFixed(0) : null;

        return (
          <g key={step.step}>
            {/* Energy bar */}
            <rect
              x={x}
              y={y}
              width="50"
              height={barHeight}
              fill={`url(#gradient-${i})`}
              rx="4"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--glow-cyan)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--glow-cyan)" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Step label */}
            <text
              x={x + 25}
              y="160"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="9"
            >
              {step.step}
            </text>

            {/* Energy remaining label */}
            <text
              x={x + 25}
              y={y - 5}
              textAnchor="middle"
              fill="var(--glow-cyan)"
              fontSize="10"
              fontWeight="500"
            >
              {(step.energyAfter * 100).toFixed(0)}%
            </text>

            {/* Loss indicator */}
            {lossPercent && Number(lossPercent) > 0 && (
              <text
                x={x - 5}
                y={y + barHeight / 2}
                textAnchor="end"
                fill="var(--glow-gold)"
                fontSize="8"
              >
                -{lossPercent}%
              </text>
            )}

            {/* Arrow to next step */}
            {!isLast && (
              <path
                d={`M ${x + 55} ${y + barHeight / 2} L ${x + 85} ${y + barHeight / 2}`}
                stroke="var(--border-subtle)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            )}
          </g>
        );
      })}

      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill="var(--border-subtle)" />
        </marker>
      </defs>

      {/* Title */}
      <text x="300" y="20" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
        Energy remaining at each transformation step
      </text>
    </svg>
  );
}
