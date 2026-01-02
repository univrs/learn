/**
 * Network Topology Analyzer - Graph Algorithms
 *
 * Implementation of small-world network mathematics based on Watts-Strogatz model.
 * Formulas from .flows/thermodynamics/small-world-mathematics.md
 */

import type {
  AdjacencyList,
  NetworkMetrics,
  NetworkParams,
  UnivrsNetworkParams,
  NetworkNode,
  NetworkEdge,
  LayoutConfig,
} from './types';

// ============================================================================
// NETWORK GENERATORS
// ============================================================================

/**
 * Generate a ring lattice where each node connects to k nearest neighbors.
 * This forms a regular structure with high clustering but long path lengths.
 *
 * Reference values:
 * - C_lattice ~ 3(k-2) / 4(k-1) ~ 0.75 for large k
 * - L_lattice ~ N / 2k (grows linearly with N)
 */
export function generateRingLattice(n: number, k: number): AdjacencyList {
  const adj: AdjacencyList = new Map();

  // Initialize empty sets for all nodes
  for (let i = 0; i < n; i++) {
    adj.set(i, new Set());
  }

  // Connect each node to k/2 neighbors on each side
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= Math.floor(k / 2); j++) {
      const neighbor = (i + j) % n;
      adj.get(i)!.add(neighbor);
      adj.get(neighbor)!.add(i);
    }
  }

  return adj;
}

/**
 * Generate an Erdos-Renyi random graph with average degree k.
 * Random graphs have low clustering but short path lengths.
 *
 * Reference values:
 * - C_random ~ p = k/N (near zero for large N)
 * - L_random ~ ln(N) / ln(k) (grows logarithmically)
 */
export function generateRandomGraph(n: number, k: number): AdjacencyList {
  const adj: AdjacencyList = new Map();
  const p = k / (n - 1); // Edge probability to achieve avg degree k

  // Initialize empty sets
  for (let i = 0; i < n; i++) {
    adj.set(i, new Set());
  }

  // Add edges with probability p
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.random() < p) {
        adj.get(i)!.add(j);
        adj.get(j)!.add(i);
      }
    }
  }

  return adj;
}

/**
 * Generate a Watts-Strogatz small-world network.
 * Start with ring lattice, rewire edges with probability p.
 *
 * The key insight: Adding just a few random shortcuts (p ~ 0.01-0.1)
 * dramatically reduces path length while preserving most clustering.
 *
 * Reference values:
 * - C(p) ~ C(0) * (1-p)^3 (remains high for small p)
 * - L(p) drops rapidly for small p
 * - Small-world coefficient sigma > 1
 */
export function generateWattsStrogatz(
  n: number,
  k: number,
  p: number
): AdjacencyList {
  // Start with ring lattice
  const adj = generateRingLattice(n, k);

  // Rewire edges with probability p
  for (let i = 0; i < n; i++) {
    const neighbors = Array.from(adj.get(i)!);
    for (const j of neighbors) {
      // Only process each edge once (when j > i)
      if (j > i && Math.random() < p) {
        // Remove edge (i, j)
        adj.get(i)!.delete(j);
        adj.get(j)!.delete(i);

        // Find a new random neighbor for i (not already connected, not self)
        const candidates: number[] = [];
        for (let c = 0; c < n; c++) {
          if (c !== i && !adj.get(i)!.has(c)) {
            candidates.push(c);
          }
        }

        if (candidates.length > 0) {
          const newNeighbor =
            candidates[Math.floor(Math.random() * candidates.length)];
          adj.get(i)!.add(newNeighbor);
          adj.get(newNeighbor)!.add(i);
        } else {
          // Restore original edge if no candidates
          adj.get(i)!.add(j);
          adj.get(j)!.add(i);
        }
      }
    }
  }

  return adj;
}

/**
 * Generate Univrs.io federated network topology.
 *
 * Structure:
 * - Dense local clusters (Dunbar-scale communities, ~150 nodes)
 * - Sparse inter-community connections (federation)
 *
 * This topology maintains small-world properties at scale while
 * respecting Dunbar's number for stable local relationships.
 */
export function generateUnivrsTopology(params: UnivrsNetworkParams): AdjacencyList {
  const { communityCount, communitySize, intraDegree, interDegree } = params;
  const totalNodes = communityCount * communitySize;
  const adj: AdjacencyList = new Map();

  // Initialize empty sets
  for (let i = 0; i < totalNodes; i++) {
    adj.set(i, new Set());
  }

  // Build local communities (ring lattice structure within each)
  for (let c = 0; c < communityCount; c++) {
    const base = c * communitySize;
    for (let i = 0; i < communitySize; i++) {
      const node = base + i;
      // Local connections within community
      for (let j = 1; j <= Math.floor(intraDegree / 2); j++) {
        const neighbor = base + ((i + j) % communitySize);
        adj.get(node)!.add(neighbor);
        adj.get(neighbor)!.add(node);
      }
    }
  }

  // Add inter-community connections (small-world shortcuts)
  for (let c = 0; c < communityCount; c++) {
    const base = c * communitySize;
    const connectionsToMake = Math.floor((interDegree * communitySize) / 2);

    for (let i = 0; i < connectionsToMake; i++) {
      // Pick random node in this community
      const localNode = base + Math.floor(Math.random() * communitySize);

      // Connect to random node in a different community
      const otherCommunities = Array.from(
        { length: communityCount },
        (_, i) => i
      ).filter((x) => x !== c);
      const otherCommunity =
        otherCommunities[Math.floor(Math.random() * otherCommunities.length)];
      const otherBase = otherCommunity * communitySize;
      const otherNode =
        otherBase + Math.floor(Math.random() * communitySize);

      adj.get(localNode)!.add(otherNode);
      adj.get(otherNode)!.add(localNode);
    }
  }

  return adj;
}

// ============================================================================
// NETWORK ANALYSIS ALGORITHMS
// ============================================================================

/**
 * Calculate local clustering coefficient for a single node.
 *
 * C_i = 2 * E_i / (k_i * (k_i - 1))
 *
 * Where:
 * - E_i = number of edges between node i's neighbors
 * - k_i = degree of node i (number of neighbors)
 *
 * @returns Value between 0 (no clustering) and 1 (perfect clustering)
 */
export function clusteringCoefficient(adj: AdjacencyList, node: number): number {
  const neighbors = adj.get(node);
  if (!neighbors) return 0;

  const k = neighbors.size;
  if (k < 2) return 0; // Need at least 2 neighbors for clustering

  // Count edges between neighbors
  let edgesBetween = 0;
  const neighborList = Array.from(neighbors);

  for (let i = 0; i < neighborList.length; i++) {
    for (let j = i + 1; j < neighborList.length; j++) {
      const neighborI = neighborList[i];
      const neighborJ = neighborList[j];
      if (adj.get(neighborI)?.has(neighborJ)) {
        edgesBetween++;
      }
    }
  }

  // Maximum possible edges between k neighbors
  const maxEdges = (k * (k - 1)) / 2;

  return edgesBetween / maxEdges;
}

/**
 * Calculate average clustering coefficient for the entire network.
 *
 * C = (1/N) * sum(C_i) for all nodes i
 */
export function averageClustering(adj: AdjacencyList): number {
  const nodes = Array.from(adj.keys());
  if (nodes.length === 0) return 0;

  const sum = nodes.reduce(
    (acc, node) => acc + clusteringCoefficient(adj, node),
    0
  );
  return sum / nodes.length;
}

/**
 * Find shortest path between two nodes using BFS.
 *
 * @returns Path length, or Infinity if no path exists
 */
export function shortestPath(
  adj: AdjacencyList,
  source: number,
  target: number
): number {
  if (source === target) return 0;

  const visited = new Set<number>([source]);
  const queue: Array<[number, number]> = [[source, 0]];

  while (queue.length > 0) {
    const [node, dist] = queue.shift()!;
    const neighbors = adj.get(node);

    if (neighbors) {
      for (const neighbor of neighbors) {
        if (neighbor === target) {
          return dist + 1;
        }
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, dist + 1]);
        }
      }
    }
  }

  return Infinity; // No path exists
}

/**
 * Calculate characteristic path length.
 *
 * L = (1 / N(N-1)) * sum(d(i,j)) for all pairs i != j
 *
 * For large networks, we sample random pairs to estimate.
 *
 * @param sampleSize Maximum pairs to sample (null = all pairs)
 */
export function characteristicPathLength(
  adj: AdjacencyList,
  sampleSize: number | null = null
): number {
  const nodes = Array.from(adj.keys());
  const n = nodes.length;

  if (n < 2) return 0;

  let pairs: Array<[number, number]>;

  if (sampleSize && sampleSize < n * (n - 1)) {
    // Sample random pairs
    pairs = [];
    const maxAttempts = sampleSize * 10;
    let attempts = 0;

    while (pairs.length < sampleSize && attempts < maxAttempts) {
      const i = nodes[Math.floor(Math.random() * n)];
      const j = nodes[Math.floor(Math.random() * n)];
      if (i !== j) {
        pairs.push([i, j]);
      }
      attempts++;
    }
  } else {
    // All pairs
    pairs = [];
    for (const i of nodes) {
      for (const j of nodes) {
        if (i !== j) {
          pairs.push([i, j]);
        }
      }
    }
  }

  // Calculate average path length
  const pathLengths = pairs.map(([i, j]) => shortestPath(adj, i, j));
  const finitePaths = pathLengths.filter((p) => p < Infinity);

  if (finitePaths.length === 0) return Infinity;

  return finitePaths.reduce((a, b) => a + b, 0) / finitePaths.length;
}

/**
 * Calculate complete small-world analysis metrics.
 *
 * sigma = (C/C_rand) / (L/L_rand)
 *
 * Where:
 * - C_rand ~ k/N (expected clustering for random graph)
 * - L_rand ~ ln(N)/ln(k) (expected path length for random graph)
 *
 * If sigma > 1, the network exhibits small-world properties.
 */
export function smallWorldCoefficient(adj: AdjacencyList): NetworkMetrics {
  const nodes = Array.from(adj.keys());
  const n = nodes.length;

  if (n === 0) {
    return {
      clustering: 0,
      clusteringRandom: 0,
      pathLength: 0,
      pathLengthRandom: 0,
      sigma: 0,
      isSmallWorld: false,
      averageDegree: 0,
      nodeCount: 0,
      edgeCount: 0,
    };
  }

  // Calculate actual metrics
  const C = averageClustering(adj);

  // For large networks, sample paths; for small networks, compute all
  const sampleSize = n > 100 ? Math.min(1000, n * 10) : null;
  const L = characteristicPathLength(adj, sampleSize);

  // Calculate average degree
  const totalDegree = nodes.reduce((acc, node) => acc + (adj.get(node)?.size || 0), 0);
  const k = totalDegree / n;

  // Calculate edge count (each edge counted twice in degree sum)
  const edgeCount = totalDegree / 2;

  // Random network baselines
  const C_rand = k / n;
  const L_rand = k > 1 ? Math.log(n) / Math.log(k) : Infinity;

  // Small-world coefficient
  let sigma = 0;
  if (C_rand > 0 && L_rand > 0 && L_rand < Infinity && L > 0 && L < Infinity) {
    sigma = (C / C_rand) / (L / L_rand);
  }

  return {
    clustering: C,
    clusteringRandom: C_rand,
    pathLength: L,
    pathLengthRandom: L_rand,
    sigma,
    isSmallWorld: sigma > 1,
    averageDegree: k,
    nodeCount: n,
    edgeCount: Math.round(edgeCount),
  };
}

// ============================================================================
// VISUALIZATION HELPERS
// ============================================================================

/**
 * Generate initial positions for nodes in a circle layout.
 */
export function circleLayout(adj: AdjacencyList): NetworkNode[] {
  const nodes = Array.from(adj.keys());
  const n = nodes.length;
  const centerX = 0.5;
  const centerY = 0.5;
  const radius = 0.4;

  return nodes.map((id, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return {
      id,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      localClustering: clusteringCoefficient(adj, id),
    };
  });
}

/**
 * Apply force-directed layout to improve node positions.
 * Uses a simple spring-embedding algorithm.
 */
export function forceDirectedLayout(
  adj: AdjacencyList,
  initialNodes: NetworkNode[],
  config: LayoutConfig = {
    repulsion: 0.001,
    attraction: 0.1,
    damping: 0.9,
    iterations: 50,
  }
): NetworkNode[] {
  const nodes = initialNodes.map((n) => ({ ...n }));
  const velocities = nodes.map(() => ({ vx: 0, vy: 0 }));

  for (let iter = 0; iter < config.iterations; iter++) {
    // Calculate forces
    const forces = nodes.map(() => ({ fx: 0, fy: 0 }));

    // Repulsion between all node pairs
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const force = config.repulsion / (dist * dist);

        forces[i].fx -= (dx / dist) * force;
        forces[i].fy -= (dy / dist) * force;
        forces[j].fx += (dx / dist) * force;
        forces[j].fy += (dy / dist) * force;
      }
    }

    // Attraction along edges
    for (let i = 0; i < nodes.length; i++) {
      const neighbors = adj.get(nodes[i].id);
      if (neighbors) {
        for (const neighborId of neighbors) {
          const j = nodes.findIndex((n) => n.id === neighborId);
          if (j > i) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = dist * config.attraction;

            forces[i].fx += (dx / dist) * force;
            forces[i].fy += (dy / dist) * force;
            forces[j].fx -= (dx / dist) * force;
            forces[j].fy -= (dy / dist) * force;
          }
        }
      }
    }

    // Update velocities and positions
    for (let i = 0; i < nodes.length; i++) {
      velocities[i].vx = (velocities[i].vx + forces[i].fx) * config.damping;
      velocities[i].vy = (velocities[i].vy + forces[i].fy) * config.damping;

      nodes[i].x += velocities[i].vx;
      nodes[i].y += velocities[i].vy;

      // Keep nodes in bounds
      nodes[i].x = Math.max(0.05, Math.min(0.95, nodes[i].x));
      nodes[i].y = Math.max(0.05, Math.min(0.95, nodes[i].y));
    }
  }

  return nodes;
}

/**
 * Extract edges from adjacency list for rendering.
 */
export function getEdges(adj: AdjacencyList): NetworkEdge[] {
  const edges: NetworkEdge[] = [];
  const seen = new Set<string>();

  for (const [source, neighbors] of adj) {
    for (const target of neighbors) {
      const key = source < target ? `${source}-${target}` : `${target}-${source}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ source, target });
      }
    }
  }

  return edges;
}

/**
 * Helper to generate a network from standard parameters.
 */
export function generateNetwork(
  topology: 'ring-lattice' | 'random' | 'watts-strogatz' | 'univrs',
  params: NetworkParams
): AdjacencyList {
  const { nodeCount, averageDegree, rewiringProbability } = params;

  switch (topology) {
    case 'ring-lattice':
      return generateRingLattice(nodeCount, averageDegree);
    case 'random':
      return generateRandomGraph(nodeCount, averageDegree);
    case 'watts-strogatz':
      return generateWattsStrogatz(nodeCount, averageDegree, rewiringProbability);
    case 'univrs':
      // For Univrs topology, interpret nodeCount as total and create communities
      const communitySize = Math.min(150, nodeCount);
      const communityCount = Math.max(1, Math.floor(nodeCount / communitySize));
      return generateUnivrsTopology({
        communityCount,
        communitySize,
        intraDegree: Math.min(averageDegree, communitySize - 1),
        interDegree: Math.max(1, Math.floor(averageDegree * 0.3)),
      });
    default:
      return new Map();
  }
}
