/**
 * Network Topology Analyzer - TypeScript Types
 *
 * Type definitions for small-world network analysis.
 * Based on Watts-Strogatz model mathematics.
 */

/** Node in the network graph */
export interface NetworkNode {
  id: number;
  x: number;
  y: number;
  localClustering: number;
}

/** Edge between two nodes */
export interface NetworkEdge {
  source: number;
  target: number;
}

/** Adjacency list representation of a graph */
export type AdjacencyList = Map<number, Set<number>>;

/** Network topology types */
export type TopologyType = 'ring-lattice' | 'random' | 'watts-strogatz' | 'univrs';

/** Network metrics from small-world analysis */
export interface NetworkMetrics {
  /** Average clustering coefficient C = (1/N) * sum(C_i) */
  clustering: number;
  /** Expected clustering for random graph C_rand ~ k/N */
  clusteringRandom: number;
  /** Characteristic path length L = (1/N(N-1)) * sum(d(i,j)) */
  pathLength: number;
  /** Expected path length for random graph L_rand ~ ln(N)/ln(k) */
  pathLengthRandom: number;
  /** Small-world coefficient sigma = (C/C_rand) / (L/L_rand) */
  sigma: number;
  /** Network exhibits small-world properties if sigma > 1 */
  isSmallWorld: boolean;
  /** Average node degree */
  averageDegree: number;
  /** Total number of nodes */
  nodeCount: number;
  /** Total number of edges */
  edgeCount: number;
}

/** Parameters for network generation */
export interface NetworkParams {
  /** Number of nodes in the network */
  nodeCount: number;
  /** Average degree (connections per node) */
  averageDegree: number;
  /** Rewiring probability for Watts-Strogatz (0 to 1) */
  rewiringProbability: number;
}

/** Univrs-specific network parameters */
export interface UnivrsNetworkParams {
  /** Number of communities (Dunbar-scale clusters) */
  communityCount: number;
  /** Nodes per community (default ~150 for Dunbar) */
  communitySize: number;
  /** Connections within community */
  intraDegree: number;
  /** Connections between communities */
  interDegree: number;
}

/** Scaling simulation result */
export interface ScalingResult {
  nodeCount: number;
  topology: TopologyType;
  metrics: NetworkMetrics;
}

/** Visualization state */
export interface VisualizationState {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  highlightSmallWorld: boolean;
}

/** Force-directed layout configuration */
export interface LayoutConfig {
  /** Repulsion force between nodes */
  repulsion: number;
  /** Attraction force along edges */
  attraction: number;
  /** Damping factor for velocity */
  damping: number;
  /** Number of simulation iterations */
  iterations: number;
}

/** Analysis status for async computation */
export type AnalysisStatus = 'idle' | 'generating' | 'analyzing' | 'complete' | 'error';

/** Complete network state */
export interface NetworkState {
  adjacencyList: AdjacencyList;
  params: NetworkParams;
  topology: TopologyType;
  metrics: NetworkMetrics | null;
  visualization: VisualizationState;
  status: AnalysisStatus;
  error: string | null;
}
