/**
 * Arnoux Knowledge Gaps - Spirit Instances
 *
 * This module contains the 4 knowledge gap Spirits identified by Dr. Louis Arnoux
 * in his critique of the Mycelial Economics framework (January 2026).
 *
 * Each gap represents a specific area of knowledge that must be addressed
 * to build a thermodynamically sound framework.
 *
 * @see .flows/thermodynamics/dol-knowledge-gap-spirit.rs for Rust implementation
 */

import type { KnowledgeGapSpirit } from './types';

/**
 * The Heterotroph Problem
 *
 * Spirit ID: spirit:heterotroph-problem
 *
 * Addresses the critique that mycelial metaphors describe heterotrophic parasitism
 * on existing energy sources, not a thermodynamically viable alternative.
 * Fungi decompose already-captured solar energy; they cannot generate primary energy.
 */
export const heterotrophProblem: KnowledgeGapSpirit = {
  id: 'spirit:heterotroph-problem',
  slug: 'heterotroph-problem',
  name: 'The Heterotroph Problem',
  description:
    'Mycelial metaphor inadvertently describes heterotrophic parasitism on existing energy sources, not a thermodynamically viable alternative. Fungi decompose already-captured solar energy; they cannot generate primary energy.',
  sourceCritique: {
    critic: 'Dr. Louis Arnoux',
    date: '2026-01-01T00:00:00Z',
    reference: 'https://univrs.io/critique/arnoux-2026',
    quote:
      "Your mycelium metaphor highlights the problem: fungi are heterotrophic. They need a ready source of energy in the form of decaying matter while plants are autotrophic using sun energy influx. Fungi are a direct parallel to humans feeding on fossil fuels.",
  },
  learningModules: [
    {
      id: 'mod-heterotroph-01',
      title: 'Autotrophs vs Heterotrophs in Economic Systems',
      description:
        'Understanding why economic metaphors must account for primary energy capture',
      readings: [
        {
          title: 'The Entropy Law and the Economic Process',
          authors: ['Nicholas Georgescu-Roegen'],
          year: 1971,
          publisher: 'Harvard University Press',
          identifier: 'ISBN: 978-0674257801',
          scope: 'Chapters 1-3, 9-11',
          rationale: 'Foundational text on thermodynamic economics',
          completed: false,
        },
        {
          title: 'Environment, Power, and Society',
          authors: ['Howard T. Odum'],
          year: 1971,
          publisher: 'Wiley-Interscience',
          scope: 'Energy systems language (emergy) chapters',
          rationale: 'Systems approach to energy flow analysis',
          completed: false,
        },
        {
          title: 'Energy and the Wealth of Nations',
          authors: ['Charles A.S. Hall', 'Kent Klitgaard'],
          year: 2012,
          publisher: 'Springer',
          identifier: 'ISBN: 978-1441993977',
          rationale: 'Modern synthesis of biophysical economics',
          completed: false,
        },
      ],
      exercises: [
        {
          title: 'Energy Flow Diagram',
          instructions:
            'Create a complete energy flow diagram for Univrs.io from solar influx to useful work, with joule quantities at each step',
          deliverable: 'SVG or interactive diagram with annotated energy values',
          verification: { type: 'peer-review' },
          completed: false,
        },
        {
          title: 'Autotrophic Foundation Analysis',
          instructions:
            'Identify the autotrophic energy sources that could power a regenerative economic system. Calculate conversion efficiencies at each step.',
          deliverable: 'Written analysis with calculations (minimum 2000 words)',
          verification: { type: 'external-review' },
          completed: false,
        },
      ],
      completionCriteria:
        'Can explain where primary energy enters the system and trace its flow through all transformations',
      completed: false,
      estimatedHours: 20,
      contentUrl: 'https://learn.univrs.io/docs/foundations/heterotroph-critique',
    },
  ],
  assessmentCriteria: [
    {
      id: 'crit-hetero-01',
      description: 'Can identify and quantify autotrophic energy sources for proposed system',
      verificationMethod: { type: 'calculation' },
      satisfied: false,
    },
    {
      id: 'crit-hetero-02',
      description: 'Energy flow diagram shows complete chain from source to useful work',
      verificationMethod: { type: 'peer-review' },
      satisfied: false,
    },
    {
      id: 'crit-hetero-03',
      description: 'Revised documentation explicitly addresses heterotroph critique',
      verificationMethod: { type: 'publication', venue: 'univrs.io' },
      satisfied: false,
    },
  ],
  status: 'identified',
  progress: 0,
  identifiedAt: '2026-01-01T00:00:00Z',
  relatedGaps: ['eroi-analysis', 'autopoiesis-closure'],
  tags: ['thermodynamics', 'energy', 'foundational'],
};

/**
 * Small Worlds Network Mathematics
 *
 * Spirit ID: spirit:small-worlds-math
 *
 * Addresses the critique that Dunbar's number is invoked without demonstrating
 * actual network topology mathematics: clustering coefficients, characteristic
 * path lengths, scaling behavior.
 */
export const smallWorldsMath: KnowledgeGapSpirit = {
  id: 'spirit:small-worlds-math',
  slug: 'small-worlds-math',
  name: 'Small Worlds Network Mathematics',
  description:
    "Dunbar's number invoked without demonstrating actual network topology mathematics: clustering coefficients, characteristic path lengths, scaling behavior.",
  sourceCritique: {
    critic: 'Dr. Louis Arnoux',
    date: '2026-01-01T00:00:00Z',
    reference: 'https://univrs.io/critique/arnoux-2026',
    quote:
      "Your use of the Dunbar number does not stack up. You do not seem to understand the maths of Small Worlds...",
  },
  learningModules: [
    {
      id: 'mod-smallworlds-01',
      title: 'Small World Network Theory',
      description:
        'Mathematical foundations of small world networks and their application to social systems',
      readings: [
        {
          title: 'Collective dynamics of small-world networks',
          authors: ['Duncan J. Watts', 'Steven H. Strogatz'],
          year: 1998,
          publisher: 'Nature',
          identifier: 'DOI: 10.1038/30918',
          rationale: 'The foundational paper on small-world networks',
          completed: false,
        },
        {
          title: 'Networks: An Introduction',
          authors: ['Mark Newman'],
          year: 2010,
          publisher: 'Oxford University Press',
          identifier: 'ISBN: 978-0199206650',
          scope: 'Chapters on network metrics and small-world networks',
          rationale: 'Comprehensive textbook covering network mathematics',
          completed: false,
        },
        {
          title: 'Six Degrees: The Science of a Connected Age',
          authors: ['Duncan J. Watts'],
          year: 2003,
          publisher: 'W.W. Norton',
          rationale: 'Accessible introduction to small-world concepts',
          completed: false,
        },
      ],
      exercises: [
        {
          title: 'Clustering Coefficient Calculator',
          instructions:
            'Implement a function to calculate the clustering coefficient C for any given network',
          deliverable: 'TypeScript/Rust function with tests',
          verification: { type: 'code-execution', testPath: 'tests/network/clustering.ts' },
          completed: false,
        },
        {
          title: 'Path Length Calculator',
          instructions:
            'Implement a function to calculate the characteristic path length L for any given network',
          deliverable: 'TypeScript/Rust function with tests',
          verification: { type: 'code-execution', testPath: 'tests/network/path_length.ts' },
          completed: false,
        },
        {
          title: 'Small-World Coefficient Analysis',
          instructions:
            'Calculate the small-world coefficient (sigma) for Univrs.io network topology at multiple scales (10, 50, 150, 500 nodes)',
          deliverable: 'Analysis document with calculations and visualizations',
          verification: { type: 'publication', venue: 'learn.univrs.io' },
          completed: false,
        },
      ],
      completionCriteria:
        'Can calculate C, L, and sigma for arbitrary networks and interpret results in context of organizational design',
      completed: false,
      estimatedHours: 25,
      contentUrl: 'https://learn.univrs.io/docs/foundations/small-worlds',
    },
  ],
  assessmentCriteria: [
    {
      id: 'crit-sw-01',
      description: 'Can calculate clustering coefficient C for a given network',
      verificationMethod: { type: 'code-execution', testPath: 'tests/network/clustering.ts' },
      satisfied: false,
    },
    {
      id: 'crit-sw-02',
      description: 'Can calculate characteristic path length L for a given network',
      verificationMethod: { type: 'code-execution', testPath: 'tests/network/path_length.ts' },
      satisfied: false,
    },
    {
      id: 'crit-sw-03',
      description: 'Small-world coefficient sigma calculated for Univrs.io topology at multiple scales',
      verificationMethod: { type: 'publication', venue: 'learn.univrs.io' },
      satisfied: false,
    },
  ],
  status: 'identified',
  progress: 0,
  identifiedAt: '2026-01-01T00:00:00Z',
  relatedGaps: [],
  tags: ['network-theory', 'mathematics', 'scaling'],
};

/**
 * Energy Return on Investment Analysis
 *
 * Spirit ID: spirit:eroi-analysis
 *
 * Addresses the critique that there is no calculation of system EROI at point
 * of production through to delivered useful work, and no comparison to
 * civilization maintenance thresholds.
 */
export const eroiAnalysis: KnowledgeGapSpirit = {
  id: 'spirit:eroi-analysis',
  slug: 'eroi-analysis',
  name: 'Energy Return on Investment Analysis',
  description:
    'No calculation of system EROI at point of production through to delivered useful work. No comparison to civilization maintenance thresholds.',
  sourceCritique: {
    critic: 'Dr. Louis Arnoux',
    date: '2026-01-01T00:00:00Z',
    reference: 'https://univrs.io/critique/arnoux-2026',
    quote:
      "Your 'system' does not have a thermodynamic basis: where does the energy come from and how does it flow.",
  },
  learningModules: [
    {
      id: 'mod-eroi-01',
      title: 'EROI Fundamentals',
      description:
        'Understanding Energy Return on Investment calculations and their implications for economic viability',
      readings: [
        {
          title: 'EROI of different fuels and the implications for society',
          authors: ['Charles A.S. Hall', 'Jessica G. Lambert', 'Stephen B. Balogh'],
          year: 2014,
          publisher: 'Energy Policy',
          identifier: 'DOI: 10.1016/j.enpol.2013.05.049',
          rationale: 'Key paper on EROI calculations and thresholds',
          completed: false,
        },
        {
          title: 'The Energy Return of Solar PV',
          authors: ['Marco Raugei', 'Pere Fullana-i-Palmer', 'Vasilis Fthenakis'],
          year: 2012,
          publisher: 'Energy Policy',
          rationale: 'Methodology for calculating EROI of renewable systems',
          completed: false,
        },
        {
          title: "Spain's Photovoltaic Revolution: The Energy Return on Investment",
          authors: ['Pedro Prieto', 'Charles A.S. Hall'],
          year: 2013,
          publisher: 'Springer',
          identifier: 'ISBN: 978-1441994363',
          rationale: 'Detailed real-world EROI analysis',
          completed: false,
        },
      ],
      exercises: [
        {
          title: 'EROI Calculator',
          instructions:
            'Build a calculator that computes EROI at point of production for different energy sources',
          deliverable: 'Interactive tool with documented methodology',
          verification: { type: 'peer-review' },
          completed: false,
        },
        {
          title: 'Delivered EROI Analysis',
          instructions:
            'Calculate delivered EROI for Univrs.io operations, accounting for all transformation losses from source to useful work',
          deliverable: 'Spreadsheet with full calculation chain and sensitivity analysis',
          verification: { type: 'calculation', expectedRange: [1, 50] },
          completed: false,
        },
        {
          title: 'Civilization Threshold Comparison',
          instructions:
            'Document the EROI threshold (~10:1) required for civilization maintenance and compare to calculated Univrs.io EROI',
          deliverable: 'Published analysis with policy implications',
          verification: { type: 'publication', venue: 'learn.univrs.io' },
          completed: false,
        },
      ],
      completionCriteria:
        'Can calculate EROI at multiple points in energy transformation chain and compare to societal thresholds',
      completed: false,
      estimatedHours: 30,
      contentUrl: 'https://learn.univrs.io/docs/foundations/eroi-analysis',
    },
  ],
  assessmentCriteria: [
    {
      id: 'crit-eroi-01',
      description: 'EROI calculated for proposed energy sources at point of production',
      verificationMethod: { type: 'calculation', expectedRange: [1, 100] },
      satisfied: false,
    },
    {
      id: 'crit-eroi-02',
      description: 'Delivered EROI calculated after all transformation losses',
      verificationMethod: { type: 'calculation', expectedRange: [1, 50] },
      satisfied: false,
    },
    {
      id: 'crit-eroi-03',
      description: 'Comparison to civilization maintenance threshold (~10:1) documented',
      verificationMethod: { type: 'publication', venue: 'learn.univrs.io' },
      satisfied: false,
    },
  ],
  status: 'identified',
  progress: 0,
  identifiedAt: '2026-01-01T00:00:00Z',
  relatedGaps: ['heterotroph-problem'],
  tags: ['eroi', 'energy', 'thermodynamics'],
};

/**
 * Autopoietic Closure Assessment
 *
 * Spirit ID: spirit:autopoiesis-closure
 *
 * Addresses the critique that there is no demonstration that the proposed system
 * can achieve autopoietic status: self-producing, self-maintaining, reproducing
 * its own operational basis from available energy flows.
 */
export const autopoiesisClosure: KnowledgeGapSpirit = {
  id: 'spirit:autopoiesis-closure',
  slug: 'autopoiesis-closure',
  name: 'Autopoietic Closure Assessment',
  description:
    'No demonstration that proposed system can achieve autopoietic status: self-producing, self-maintaining, reproducing its own operational basis from available energy flows.',
  sourceCritique: {
    critic: 'Dr. Louis Arnoux',
    date: '2026-01-01T00:00:00Z',
    reference: 'https://univrs.io/critique/arnoux-2026',
    quote:
      'Since sometime between 2010 and 2020, humankind has ceased being autopoietic and to date no replacement system that could cut it has been put in place. What you propose is certainly not one.',
  },
  learningModules: [
    {
      id: 'mod-autopoiesis-01',
      title: 'Autopoiesis in Living Systems',
      description:
        'Understanding autopoietic theory and its application to social and economic systems',
      readings: [
        {
          title: 'Autopoiesis and Cognition: The Realization of the Living',
          authors: ['Humberto R. Maturana', 'Francisco J. Varela'],
          year: 1980,
          publisher: 'D. Reidel Publishing',
          identifier: 'ISBN: 978-9027710154',
          rationale: 'The foundational text on autopoiesis',
          completed: false,
        },
        {
          title: 'The Tree of Knowledge',
          authors: ['Humberto R. Maturana', 'Francisco J. Varela'],
          year: 1987,
          publisher: 'Shambhala',
          rationale: 'More accessible introduction to autopoietic concepts',
          completed: false,
        },
        {
          title: 'Social Systems',
          authors: ['Niklas Luhmann'],
          year: 1984,
          publisher: 'Stanford University Press',
          scope: 'Chapters on autopoiesis in social systems',
          rationale: 'Application of autopoiesis to social theory',
          completed: false,
        },
      ],
      exercises: [
        {
          title: 'Autopoiesis Criteria Checklist',
          instructions:
            'Develop a checklist of criteria for determining whether a system is autopoietic, based on Maturana and Varela',
          deliverable: 'Documented checklist with rationale for each criterion',
          verification: { type: 'self-assessment' },
          completed: false,
        },
        {
          title: 'Closure Analysis',
          instructions:
            'Apply the autopoiesis checklist to Univrs.io. Identify which criteria are met and which require additional work.',
          deliverable: 'Gap analysis document with remediation paths',
          verification: { type: 'peer-review' },
          completed: false,
        },
        {
          title: 'Thermodynamic Viability Assessment',
          instructions:
            'Combine EROI analysis with autopoiesis criteria to determine if Univrs.io could achieve autopoietic status given available energy flows',
          deliverable: 'Published assessment with quantitative backing',
          verification: { type: 'external-review' },
          completed: false,
        },
      ],
      completionCriteria:
        'Can apply autopoiesis theory to economic systems and identify gaps in operational closure',
      completed: false,
      estimatedHours: 35,
      contentUrl: 'https://learn.univrs.io/docs/foundations/autopoiesis-closure',
    },
  ],
  assessmentCriteria: [
    {
      id: 'crit-auto-01',
      description: 'Can explain autopoiesis concept and apply to economic systems',
      verificationMethod: { type: 'self-assessment' },
      satisfied: false,
    },
    {
      id: 'crit-auto-02',
      description: 'Closure analysis shows whether Univrs.io could achieve autopoietic status',
      verificationMethod: { type: 'calculation' },
      satisfied: false,
    },
    {
      id: 'crit-auto-03',
      description: 'If closure not achievable, gaps identified with path to addressing them',
      verificationMethod: { type: 'publication', venue: 'univrs.io' },
      satisfied: false,
    },
  ],
  status: 'identified',
  progress: 0,
  identifiedAt: '2026-01-01T00:00:00Z',
  relatedGaps: ['heterotroph-problem', 'eroi-analysis'],
  tags: ['autopoiesis', 'systems-theory', 'foundational'],
};

/**
 * All Arnoux-identified knowledge gaps.
 *
 * These four gaps form the foundation for addressing the thermodynamic
 * critique of the Mycelial Economics framework.
 */
export const arnouxGaps: KnowledgeGapSpirit[] = [
  heterotrophProblem,
  smallWorldsMath,
  eroiAnalysis,
  autopoiesisClosure,
];

/**
 * Get a gap by slug.
 */
export function getGapBySlug(slug: string): KnowledgeGapSpirit | undefined {
  return arnouxGaps.find(gap => gap.slug === slug);
}

/**
 * Get a gap by spirit ID.
 */
export function getGapById(id: string): KnowledgeGapSpirit | undefined {
  return arnouxGaps.find(gap => gap.id === id);
}

/**
 * Get all gaps with a specific tag.
 */
export function getGapsByTag(tag: string): KnowledgeGapSpirit[] {
  return arnouxGaps.filter(gap => gap.tags.includes(tag));
}

/**
 * Get the total learning hours across all gaps.
 */
export function getTotalLearningHours(): number {
  return arnouxGaps
    .flatMap(gap => gap.learningModules)
    .reduce((total, mod) => total + mod.estimatedHours, 0);
}

/**
 * Get overall progress across all Arnoux gaps.
 */
export function getOverallProgress(): {
  totalCriteria: number;
  satisfiedCriteria: number;
  percentage: number;
} {
  const allCriteria = arnouxGaps.flatMap(gap => gap.assessmentCriteria);
  const satisfied = allCriteria.filter(c => c.satisfied).length;

  return {
    totalCriteria: allCriteria.length,
    satisfiedCriteria: satisfied,
    percentage: allCriteria.length > 0 ? (satisfied / allCriteria.length) * 100 : 0,
  };
}
