/**
 * Knowledge Gap Spirits - TypeScript Type Definitions
 *
 * This module defines the TypeScript interfaces for tracking and closing knowledge gaps
 * identified through external critique. Created in response to Dr. Louis Arnoux's
 * critique of the Mycelial Economics framework (January 2026).
 *
 * Spirits are self-describing entities in the DOL (Design Ontology Language) that
 * track learning progress, assessment criteria, and closure verification for
 * identified knowledge gaps.
 *
 * @see .flows/thermodynamics/dol-knowledge-gap-spirit.rs for Rust implementation
 */

/**
 * Status of a knowledge gap's progression.
 */
export type GapStatus =
  | 'identified'    // Gap has been identified but work not started
  | 'learning'      // Currently working through learning modules
  | 'practicing'    // Learning complete, working on exercises
  | 'demonstrating' // Exercises complete, demonstrating mastery
  | 'closed';       // All criteria satisfied, gap closed

/**
 * Methods for verifying criterion satisfaction.
 */
export type VerificationMethod =
  | { type: 'self-assessment' }
  | { type: 'peer-review' }
  | { type: 'external-review' }
  | { type: 'calculation'; expectedRange?: [number, number] }
  | { type: 'publication'; venue?: string }
  | { type: 'code-execution'; testPath?: string };

/**
 * Source information for the critique that identified a gap.
 */
export interface CritiqueSource {
  /** Name of the critic */
  critic: string;

  /** Date of critique (ISO 8601 format) */
  date: string;

  /** URL or reference to original critique */
  reference?: string;

  /** Verbatim quote of the relevant critique */
  quote?: string;
}

/**
 * A required reading for a learning module.
 */
export interface Reading {
  /** Title of the work */
  title: string;

  /** Author(s) */
  authors: string[];

  /** Year of publication */
  year?: number;

  /** Publisher or journal */
  publisher?: string;

  /** URL if available online */
  url?: string;

  /** ISBN or DOI */
  identifier?: string;

  /** Specific chapters or pages */
  scope?: string;

  /** Why this reading matters */
  rationale: string;

  /** Has been read */
  completed: boolean;
}

/**
 * A practical exercise to reinforce learning.
 */
export interface Exercise {
  /** Exercise title */
  title: string;

  /** What to do */
  instructions: string;

  /** Expected deliverable */
  deliverable: string;

  /** How completion is verified */
  verification: VerificationMethod;

  /** Completion status */
  completed: boolean;

  /** Path to completed work */
  artifactPath?: string;
}

/**
 * A learning module that contributes to closing a knowledge gap.
 */
export interface LearningModule {
  /** Unique identifier */
  id: string;

  /** Module title */
  title: string;

  /** Module description */
  description: string;

  /** Required readings */
  readings: Reading[];

  /** Practical exercises */
  exercises: Exercise[];

  /** How to verify completion */
  completionCriteria: string;

  /** Completion status */
  completed: boolean;

  /** Completion timestamp (ISO 8601) */
  completedAt?: string;

  /** Estimated time to complete (hours) */
  estimatedHours: number;

  /** URL to learning content */
  contentUrl?: string;
}

/**
 * A criterion for assessing whether a knowledge gap is closed.
 */
export interface AssessmentCriterion {
  /** Unique identifier */
  id: string;

  /** Description of what must be demonstrated */
  description: string;

  /** How to verify this criterion */
  verificationMethod: VerificationMethod;

  /** Whether satisfied */
  satisfied: boolean;

  /** Evidence or artifact demonstrating satisfaction */
  evidence?: string;

  /** Who verified (if external) */
  verifier?: string;

  /** When verified (ISO 8601) */
  verifiedAt?: string;
}

/**
 * A Spirit representing an identified knowledge gap requiring closure.
 *
 * This is the main interface for tracking knowledge gaps identified through
 * external critique. Each gap contains learning modules, assessment criteria,
 * and progress tracking.
 */
export interface KnowledgeGapSpirit {
  /** Unique identifier */
  id: string;

  /** Human-readable slug (e.g., "heterotroph-problem") */
  slug: string;

  /** Display name */
  name: string;

  /** Detailed description of the gap */
  description: string;

  /** Source of the critique that identified this gap */
  sourceCritique: CritiqueSource;

  /** Learning modules that address this gap */
  learningModules: LearningModule[];

  /** Criteria for assessing whether gap is closed */
  assessmentCriteria: AssessmentCriterion[];

  /** Current status */
  status: GapStatus;

  /** Progress percentage (0-1, derived from completed criteria) */
  progress: number;

  /** When the gap was identified (ISO 8601) */
  identifiedAt: string;

  /** When the gap was closed (if applicable, ISO 8601) */
  closedAt?: string;

  /** Related gaps (dependencies or connections) - slug references */
  relatedGaps: string[];

  /** Tags for categorization */
  tags: string[];
}

/**
 * A summary view of a knowledge gap's state.
 * Useful for displaying in lists or dashboard views.
 */
export interface GapSummary {
  slug: string;
  name: string;
  status: GapStatus;
  progress: number;
  modulesCompleted: number;
  modulesTotal: number;
  criteriaSatisfied: number;
  criteriaTotal: number;
}

/**
 * Calculate progress based on satisfied criteria.
 */
export function calculateProgress(gap: KnowledgeGapSpirit): number {
  if (gap.assessmentCriteria.length === 0) {
    return 0;
  }

  const satisfied = gap.assessmentCriteria.filter(c => c.satisfied).length;
  return satisfied / gap.assessmentCriteria.length;
}

/**
 * Determine status based on progress and learning completion.
 */
export function determineStatus(gap: KnowledgeGapSpirit): GapStatus {
  const allModulesComplete = gap.learningModules.every(m => m.completed);
  const allExercisesComplete = gap.learningModules
    .flatMap(m => m.exercises)
    .every(e => e.completed);
  const allCriteriaSatisfied = gap.assessmentCriteria.every(c => c.satisfied);

  if (allCriteriaSatisfied) {
    return 'closed';
  }
  if (allModulesComplete && allExercisesComplete) {
    return 'demonstrating';
  }
  if (allModulesComplete) {
    return 'practicing';
  }
  if (gap.progress > 0) {
    return 'learning';
  }
  return 'identified';
}

/**
 * Get a summary of a gap's state.
 */
export function getGapSummary(gap: KnowledgeGapSpirit): GapSummary {
  return {
    slug: gap.slug,
    name: gap.name,
    status: gap.status,
    progress: gap.progress,
    modulesCompleted: gap.learningModules.filter(m => m.completed).length,
    modulesTotal: gap.learningModules.length,
    criteriaSatisfied: gap.assessmentCriteria.filter(c => c.satisfied).length,
    criteriaTotal: gap.assessmentCriteria.length,
  };
}

/**
 * Status display configuration for UI rendering.
 */
export const STATUS_DISPLAY: Record<GapStatus, { label: string; color: string; bgColor: string }> = {
  identified: {
    label: 'Identified',
    color: 'var(--soft-gray)',
    bgColor: 'var(--moss)'
  },
  learning: {
    label: 'Learning',
    color: 'var(--glow-gold)',
    bgColor: 'rgba(255, 215, 0, 0.1)'
  },
  practicing: {
    label: 'Practicing',
    color: 'var(--spore-purple)',
    bgColor: 'rgba(176, 136, 249, 0.1)'
  },
  demonstrating: {
    label: 'Demonstrating',
    color: 'var(--glow-cyan)',
    bgColor: 'var(--glow-cyan-dim)'
  },
  closed: {
    label: 'Closed',
    color: '#00ff88',
    bgColor: 'rgba(0, 255, 136, 0.1)'
  },
};
