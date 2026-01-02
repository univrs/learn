/**
 * Network Topology Analyzer
 *
 * Interactive tool for analyzing small-world network properties.
 * Implements Watts-Strogatz model mathematics from:
 * .flows/thermodynamics/small-world-mathematics.md
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Network,
  ChevronRight,
  Play,
  RotateCcw,
  Zap,
  Activity,
  GitBranch,
  Shuffle,
  Users,
  TrendingUp,
} from 'lucide-react';
import type {
  TopologyType,
  NetworkParams,
  NetworkMetrics,
  NetworkNode,
  NetworkEdge,
  ScalingResult,
  AnalysisStatus,
  AdjacencyList,
} from './types';
import {
  generateNetwork,
  smallWorldCoefficient,
  circleLayout,
  forceDirectedLayout,
  getEdges,
  clusteringCoefficient,
} from './graph';

// ============================================================================
// CONSTANTS
// ============================================================================

const TOPOLOGY_OPTIONS: Array<{
  id: TopologyType;
  name: string;
  description: string;
  icon: typeof Network;
}> = [
  {
    id: 'ring-lattice',
    name: 'Ring Lattice',
    description: 'Regular structure, high clustering, long paths',
    icon: GitBranch,
  },
  {
    id: 'random',
    name: 'Random',
    description: 'Erdos-Renyi random graph, low clustering, short paths',
    icon: Shuffle,
  },
  {
    id: 'watts-strogatz',
    name: 'Watts-Strogatz',
    description: 'Small-world network with rewiring',
    icon: Activity,
  },
  {
    id: 'univrs',
    name: 'Univrs',
    description: 'Federated Dunbar-scale communities',
    icon: Users,
  },
];

const SCALING_NODE_COUNTS = [150, 500, 1500];

// ============================================================================
// NETWORK CANVAS COMPONENT
// ============================================================================

interface NetworkCanvasProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  isSmallWorld: boolean;
  width?: number;
  height?: number;
}

function NetworkCanvas({
  nodes,
  edges,
  isSmallWorld,
  width = 500,
  height = 500,
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = 'var(--bg-card)';
    ctx.fillRect(0, 0, width, height);

    // Draw edges
    ctx.strokeStyle = isSmallWorld
      ? 'rgba(0, 255, 136, 0.15)'
      : 'rgba(138, 154, 143, 0.15)';
    ctx.lineWidth = 0.5;

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    for (const edge of edges) {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x * width, source.y * height);
        ctx.lineTo(target.x * width, target.y * height);
        ctx.stroke();
      }
    }

    // Draw nodes with clustering-based coloring
    for (const node of nodes) {
      const x = node.x * width;
      const y = node.y * height;
      const radius = Math.max(2, 6 - Math.log10(nodes.length) * 1.5);

      // Color based on local clustering coefficient
      const hue = isSmallWorld ? 160 : 40; // Cyan for small-world, gold otherwise
      const saturation = 100;
      const lightness = 30 + node.localClustering * 40;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fill();

      // Glow effect for high-clustering nodes
      if (node.localClustering > 0.5 && isSmallWorld) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.fill();
      }
    }

    // Small-world indicator glow
    if (isSmallWorld) {
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, width - 4, height - 4);

      // Corner glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.2)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 100, 100);
    }
  }, [nodes, edges, isSmallWorld, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '8px',
        border: isSmallWorld
          ? '1px solid var(--glow-cyan)'
          : '1px solid var(--border-subtle)',
        boxShadow: isSmallWorld ? 'var(--glow-md)' : 'none',
        transition: 'all 0.3s ease',
      }}
    />
  );
}

// ============================================================================
// METRIC DISPLAY COMPONENT
// ============================================================================

interface MetricCardProps {
  label: string;
  value: number | string;
  formula?: string;
  highlight?: boolean;
  comparison?: { label: string; value: number | string };
}

function MetricCard({
  label,
  value,
  formula,
  highlight,
  comparison,
}: MetricCardProps) {
  return (
    <div
      className="card"
      style={{
        borderColor: highlight ? 'var(--glow-cyan)' : undefined,
        boxShadow: highlight ? 'var(--glow-sm)' : undefined,
      }}
    >
      <div
        className="text-xs uppercase tracking-wide mb-1"
        style={{ color: 'var(--soft-gray)' }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-mono font-semibold"
        style={{ color: highlight ? 'var(--glow-cyan)' : 'var(--text-primary)' }}
      >
        {typeof value === 'number' ? value.toFixed(4) : value}
      </div>
      {formula && (
        <div
          className="text-xs font-mono mt-2 p-2 rounded"
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--soft-gray)' }}
        >
          {formula}
        </div>
      )}
      {comparison && (
        <div className="text-xs mt-2" style={{ color: 'var(--soft-gray)' }}>
          {comparison.label}:{' '}
          <span style={{ color: 'var(--glow-gold)' }}>
            {typeof comparison.value === 'number'
              ? comparison.value.toFixed(4)
              : comparison.value}
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCALING RESULTS COMPONENT
// ============================================================================

interface ScalingTableProps {
  results: ScalingResult[];
  isLoading: boolean;
}

function ScalingTable({ results, isLoading }: ScalingTableProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--soft-gray)' }}>
        <Activity className="w-6 h-6 animate-spin mx-auto mb-2" />
        Running scaling simulation...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--soft-gray)' }}>
        Click "Run Scaling Simulation" to analyze metrics at different scales
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <th className="text-left py-2 px-3" style={{ color: 'var(--soft-gray)' }}>
              N
            </th>
            <th className="text-right py-2 px-3" style={{ color: 'var(--soft-gray)' }}>
              C
            </th>
            <th className="text-right py-2 px-3" style={{ color: 'var(--soft-gray)' }}>
              L
            </th>
            <th className="text-right py-2 px-3" style={{ color: 'var(--soft-gray)' }}>
              sigma
            </th>
            <th className="text-center py-2 px-3" style={{ color: 'var(--soft-gray)' }}>
              Small-World?
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr
              key={idx}
              style={{
                borderBottom:
                  idx < results.length - 1 ? '1px solid var(--border-subtle)' : undefined,
              }}
            >
              <td
                className="py-2 px-3 font-mono"
                style={{ color: 'var(--text-primary)' }}
              >
                {result.nodeCount}
              </td>
              <td
                className="py-2 px-3 font-mono text-right"
                style={{ color: 'var(--text-secondary)' }}
              >
                {result.metrics.clustering.toFixed(4)}
              </td>
              <td
                className="py-2 px-3 font-mono text-right"
                style={{ color: 'var(--text-secondary)' }}
              >
                {result.metrics.pathLength.toFixed(2)}
              </td>
              <td
                className="py-2 px-3 font-mono text-right"
                style={{
                  color: result.metrics.isSmallWorld
                    ? 'var(--glow-cyan)'
                    : 'var(--text-secondary)',
                }}
              >
                {result.metrics.sigma.toFixed(2)}
              </td>
              <td className="py-2 px-3 text-center">
                {result.metrics.isSmallWorld ? (
                  <Zap
                    className="w-4 h-4 mx-auto"
                    style={{ color: 'var(--glow-cyan)' }}
                  />
                ) : (
                  <span style={{ color: 'var(--soft-gray)' }}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function NetworkTopologyAnalyzer() {
  // State
  const [topology, setTopology] = useState<TopologyType>('watts-strogatz');
  const [params, setParams] = useState<NetworkParams>({
    nodeCount: 100,
    averageDegree: 6,
    rewiringProbability: 0.1,
  });
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [edges, setEdges] = useState<NetworkEdge[]>([]);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [scalingResults, setScalingResults] = useState<ScalingResult[]>([]);
  const [isScalingLoading, setIsScalingLoading] = useState(false);

  // Store adjacency list for visualization updates
  const adjRef = useRef<AdjacencyList | null>(null);

  // Generate and analyze network
  const runAnalysis = useCallback(() => {
    setStatus('generating');

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        // Generate network
        const adj = generateNetwork(topology, params);
        adjRef.current = adj;

        setStatus('analyzing');

        setTimeout(() => {
          try {
            // Calculate metrics
            const networkMetrics = smallWorldCoefficient(adj);
            setMetrics(networkMetrics);

            // Generate visualization for small networks
            if (params.nodeCount <= 500) {
              let layoutNodes = circleLayout(adj);
              if (params.nodeCount <= 200) {
                layoutNodes = forceDirectedLayout(adj, layoutNodes);
              }
              setNodes(layoutNodes);
              setEdges(getEdges(adj));
            } else {
              // For large networks, show subset
              const subsetSize = 200;
              const subsetAdj: AdjacencyList = new Map();
              let count = 0;
              for (const [node, neighbors] of adj) {
                if (count >= subsetSize) break;
                subsetAdj.set(node, new Set([...neighbors].filter((n) => n < subsetSize)));
                count++;
              }
              let layoutNodes = circleLayout(subsetAdj);
              layoutNodes = forceDirectedLayout(subsetAdj, layoutNodes);
              // Update clustering values
              layoutNodes = layoutNodes.map((n) => ({
                ...n,
                localClustering: clusteringCoefficient(adj, n.id),
              }));
              setNodes(layoutNodes);
              setEdges(getEdges(subsetAdj));
            }

            setStatus('complete');
          } catch (error) {
            console.error('Analysis error:', error);
            setStatus('error');
          }
        }, 10);
      } catch (error) {
        console.error('Generation error:', error);
        setStatus('error');
      }
    }, 10);
  }, [topology, params]);

  // Run scaling simulation
  const runScalingSimulation = useCallback(() => {
    setIsScalingLoading(true);
    setScalingResults([]);

    // Run asynchronously to not block UI
    setTimeout(() => {
      const results: ScalingResult[] = [];

      for (const nodeCount of SCALING_NODE_COUNTS) {
        const adj = generateNetwork(topology, {
          ...params,
          nodeCount,
        });
        const networkMetrics = smallWorldCoefficient(adj);

        results.push({
          nodeCount,
          topology,
          metrics: networkMetrics,
        });
      }

      setScalingResults(results);
      setIsScalingLoading(false);
    }, 50);
  }, [topology, params]);

  // Reset to defaults
  const reset = useCallback(() => {
    setTopology('watts-strogatz');
    setParams({
      nodeCount: 100,
      averageDegree: 6,
      rewiringProbability: 0.1,
    });
    setMetrics(null);
    setNodes([]);
    setEdges([]);
    setStatus('idle');
    setScalingResults([]);
  }, []);

  // Initial analysis
  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <>
      <Helmet>
        <title>Network Topology Analyzer | Univrs Tools</title>
        <meta
          name="description"
          content="Analyze small-world network properties using Watts-Strogatz mathematics. Calculate clustering coefficients, path lengths, and sigma values interactively."
        />
      </Helmet>

      {/* Header */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 text-sm mb-6"
            style={{ color: 'var(--soft-gray)' }}
          >
            <Link to="/" className="hover:text-univrs-primary-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Tools</span>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Network Analyzer</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Network className="w-10 h-10" style={{ color: 'var(--glow-cyan)' }} />
            <h1
              className="text-3xl sm:text-4xl font-light"
              style={{ color: 'var(--text-primary)' }}
            >
              Network Topology Analyzer
            </h1>
          </div>

          <p
            className="text-xl max-w-3xl mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Explore small-world network mathematics. Generate different topologies and
            analyze clustering coefficients, path lengths, and small-world properties.
          </p>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
            style={{
              backgroundColor: 'var(--glow-cyan-dim)',
              color: 'var(--glow-cyan)',
            }}
          >
            <Activity className="w-4 h-4" />
            <span>Based on Watts-Strogatz (1998) model</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Controls & Visualization */}
            <div className="space-y-6">
              {/* Topology Selection */}
              <div className="card">
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Topology Type
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {TOPOLOGY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = topology === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setTopology(opt.id)}
                        className="text-left p-3 rounded-lg transition-all"
                        style={{
                          backgroundColor: isActive
                            ? 'var(--glow-cyan-dim)'
                            : 'var(--bg-secondary)',
                          border: `1px solid ${
                            isActive ? 'var(--glow-cyan)' : 'var(--border-subtle)'
                          }`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            className="w-4 h-4"
                            style={{
                              color: isActive
                                ? 'var(--glow-cyan)'
                                : 'var(--soft-gray)',
                            }}
                          />
                          <span
                            className="font-medium text-sm"
                            style={{
                              color: isActive
                                ? 'var(--glow-cyan)'
                                : 'var(--text-primary)',
                            }}
                          >
                            {opt.name}
                          </span>
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: 'var(--soft-gray)' }}
                        >
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parameters */}
              <div className="card">
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Parameters
                </h2>
                <div className="space-y-4">
                  {/* Node Count */}
                  <div>
                    <label
                      className="block text-sm mb-2"
                      style={{ color: 'var(--soft-gray)' }}
                    >
                      Node Count (N):{' '}
                      <span
                        className="font-mono"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {params.nodeCount}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={params.nodeCount}
                      onChange={(e) =>
                        setParams((p) => ({
                          ...p,
                          nodeCount: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                      style={{ accentColor: 'var(--glow-cyan)' }}
                    />
                    <div
                      className="flex justify-between text-xs"
                      style={{ color: 'var(--soft-gray)' }}
                    >
                      <span>10</span>
                      <span>1000</span>
                    </div>
                  </div>

                  {/* Average Degree */}
                  <div>
                    <label
                      className="block text-sm mb-2"
                      style={{ color: 'var(--soft-gray)' }}
                    >
                      Average Degree (k):{' '}
                      <span
                        className="font-mono"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {params.averageDegree}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="2"
                      value={params.averageDegree}
                      onChange={(e) =>
                        setParams((p) => ({
                          ...p,
                          averageDegree: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                      style={{ accentColor: 'var(--glow-cyan)' }}
                    />
                    <div
                      className="flex justify-between text-xs"
                      style={{ color: 'var(--soft-gray)' }}
                    >
                      <span>2</span>
                      <span>20</span>
                    </div>
                  </div>

                  {/* Rewiring Probability (only for Watts-Strogatz) */}
                  {topology === 'watts-strogatz' && (
                    <div>
                      <label
                        className="block text-sm mb-2"
                        style={{ color: 'var(--soft-gray)' }}
                      >
                        Rewiring Probability (p):{' '}
                        <span
                          className="font-mono"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {params.rewiringProbability.toFixed(2)}
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={params.rewiringProbability}
                        onChange={(e) =>
                          setParams((p) => ({
                            ...p,
                            rewiringProbability: parseFloat(e.target.value),
                          }))
                        }
                        className="w-full"
                        style={{ accentColor: 'var(--glow-cyan)' }}
                      />
                      <div
                        className="flex justify-between text-xs"
                        style={{ color: 'var(--soft-gray)' }}
                      >
                        <span>0 (lattice)</span>
                        <span>1 (random)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button onClick={runAnalysis} className="btn-primary flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Generate Network
                  </button>
                  <button onClick={reset} className="btn-secondary">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visualization */}
              <div className="card">
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Network Visualization
                  {params.nodeCount > 500 && (
                    <span
                      className="text-xs font-normal ml-2"
                      style={{ color: 'var(--soft-gray)' }}
                    >
                      (showing subset of 200 nodes)
                    </span>
                  )}
                </h2>
                <div className="flex justify-center">
                  {status === 'generating' || status === 'analyzing' ? (
                    <div
                      className="flex items-center justify-center"
                      style={{ width: 500, height: 500 }}
                    >
                      <Activity
                        className="w-8 h-8 animate-spin"
                        style={{ color: 'var(--glow-cyan)' }}
                      />
                    </div>
                  ) : (
                    <NetworkCanvas
                      nodes={nodes}
                      edges={edges}
                      isSmallWorld={metrics?.isSmallWorld ?? false}
                    />
                  )}
                </div>
                <div
                  className="text-xs mt-3 text-center"
                  style={{ color: 'var(--soft-gray)' }}
                >
                  Node color intensity indicates local clustering coefficient
                </div>
              </div>
            </div>

            {/* Right Column: Metrics */}
            <div className="space-y-6">
              {/* Small-World Status */}
              {metrics && (
                <div
                  className="card"
                  style={{
                    backgroundColor: metrics.isSmallWorld
                      ? 'rgba(0, 255, 136, 0.05)'
                      : 'var(--bg-card)',
                    borderColor: metrics.isSmallWorld
                      ? 'var(--glow-cyan)'
                      : 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    {metrics.isSmallWorld ? (
                      <>
                        <Zap
                          className="w-8 h-8"
                          style={{ color: 'var(--glow-cyan)' }}
                        />
                        <div>
                          <div
                            className="text-lg font-semibold"
                            style={{ color: 'var(--glow-cyan)' }}
                          >
                            Small-World Network Detected
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            sigma = {metrics.sigma.toFixed(2)} &gt; 1
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Network
                          className="w-8 h-8"
                          style={{ color: 'var(--soft-gray)' }}
                        />
                        <div>
                          <div
                            className="text-lg font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Not a Small-World Network
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            sigma = {metrics.sigma.toFixed(2)} &lt;= 1
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Metrics Grid */}
              {metrics && (
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    label="Clustering Coefficient (C)"
                    value={metrics.clustering}
                    formula="C = (1/N) * sum(C_i)"
                    comparison={{
                      label: 'C_random',
                      value: metrics.clusteringRandom,
                    }}
                  />
                  <MetricCard
                    label="Path Length (L)"
                    value={metrics.pathLength}
                    formula="L = (1/N(N-1)) * sum(d(i,j))"
                    comparison={{
                      label: 'L_random',
                      value: metrics.pathLengthRandom,
                    }}
                  />
                  <MetricCard
                    label="Small-World Coefficient"
                    value={metrics.sigma}
                    formula="sigma = (C/C_rand) / (L/L_rand)"
                    highlight={metrics.isSmallWorld}
                  />
                  <MetricCard
                    label="Average Degree"
                    value={metrics.averageDegree}
                    comparison={{
                      label: 'Total edges',
                      value: metrics.edgeCount,
                    }}
                  />
                </div>
              )}

              {/* Reference Formulas */}
              <div className="card">
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Key Formulas
                </h2>
                <div
                  className="space-y-3 font-mono text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ color: 'var(--glow-cyan)' }}>Clustering Coefficient:</div>
                    <div>C_i = 2 * E_i / (k_i * (k_i - 1))</div>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ color: 'var(--glow-gold)' }}>Random Baselines:</div>
                    <div>C_rand ~ k/N</div>
                    <div>L_rand ~ ln(N)/ln(k)</div>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ color: 'var(--spore-purple)' }}>Watts-Strogatz Scaling:</div>
                    <div>C(p) ~ C(0) * (1-p)^3</div>
                    <div>L(p) drops rapidly for small p</div>
                  </div>
                </div>
              </div>

              {/* Scaling Simulation */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Scaling Simulation
                  </h2>
                  <button
                    onClick={runScalingSimulation}
                    className="btn-secondary text-sm py-2 px-3"
                    disabled={isScalingLoading}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {isScalingLoading ? 'Running...' : 'Run Simulation'}
                  </button>
                </div>
                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--soft-gray)' }}
                >
                  Analyze how metrics change at different scales: 150 (Dunbar), 500
                  (community), 1500 (town)
                </p>
                <ScalingTable results={scalingResults} isLoading={isScalingLoading} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theory Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-light mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Understanding Small-World Networks
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <GitBranch
                className="w-8 h-8 mb-4"
                style={{ color: 'var(--glow-gold)' }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Ring Lattice
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Regular structure where each node connects to k nearest neighbors. High
                clustering (C ~ 0.75) but long path lengths (L ~ N/2k).
              </p>
            </div>
            <div className="card">
              <Shuffle
                className="w-8 h-8 mb-4"
                style={{ color: 'var(--spore-purple)' }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Random Graph
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Erdos-Renyi random connections. Low clustering (C ~ k/N) but short path
                lengths (L ~ ln(N)/ln(k)).
              </p>
            </div>
            <div className="card" style={{ borderColor: 'var(--glow-cyan)' }}>
              <Zap
                className="w-8 h-8 mb-4"
                style={{ color: 'var(--glow-cyan)' }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Small-World
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Best of both: Adding just a few random shortcuts (p ~ 0.01-0.1) preserves
                high clustering while dramatically reducing path lengths. sigma &gt; 1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dunbar Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-light mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Dunbar's Number & Network Topology
          </h2>
          <p
            className="text-lg mb-8 max-w-3xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Dunbar's research suggests humans can maintain ~150 stable relationships.
            The Univrs topology creates federated networks respecting this limit while
            maintaining small-world properties at scale.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Intimate', count: '~5', color: 'var(--spore-purple)' },
              { label: 'Close Friends', count: '~50', color: 'var(--glow-gold)' },
              { label: 'Casual Friends', count: '~150', color: 'var(--glow-cyan)' },
              { label: 'Acquaintances', count: '~500', color: 'var(--soft-gray)' },
            ].map((level) => (
              <div key={level.label} className="card text-center">
                <div
                  className="text-3xl font-mono mb-2"
                  style={{ color: level.color }}
                >
                  {level.count}
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {level.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
