/**
 * Knowledge Gap Spirits - Public API
 *
 * This module provides the public interface for the DOL Knowledge Gap Spirits
 * created in response to Dr. Louis Arnoux's critique (January 2026).
 *
 * Usage:
 * ```typescript
 * import {
 *   arnouxGaps,
 *   getGapBySlug,
 *   heterotrophProblem,
 *   STATUS_DISPLAY
 * } from '@/data/spirits';
 * ```
 */

// Type exports
export type {
  KnowledgeGapSpirit,
  GapStatus,
  GapSummary,
  CritiqueSource,
  LearningModule,
  Reading,
  Exercise,
  AssessmentCriterion,
  VerificationMethod,
} from './types';

// Utility function exports
export {
  calculateProgress,
  determineStatus,
  getGapSummary,
  STATUS_DISPLAY,
} from './types';

// Individual gap exports
export {
  heterotrophProblem,
  smallWorldsMath,
  eroiAnalysis,
  autopoiesisClosure,
} from './arnoux-gaps';

// Collection and lookup exports
export {
  arnouxGaps,
  getGapBySlug,
  getGapById,
  getGapsByTag,
  getTotalLearningHours,
  getOverallProgress,
} from './arnoux-gaps';

/**
 * Spirit ID constants for type-safe references.
 */
export const SPIRIT_IDS = {
  HETEROTROPH_PROBLEM: 'spirit:heterotroph-problem',
  SMALL_WORLDS_MATH: 'spirit:small-worlds-math',
  EROI_ANALYSIS: 'spirit:eroi-analysis',
  AUTOPOIESIS_CLOSURE: 'spirit:autopoiesis-closure',
} as const;

/**
 * Spirit slug constants for URL routing.
 */
export const SPIRIT_SLUGS = {
  HETEROTROPH_PROBLEM: 'heterotroph-problem',
  SMALL_WORLDS_MATH: 'small-worlds-math',
  EROI_ANALYSIS: 'eroi-analysis',
  AUTOPOIESIS_CLOSURE: 'autopoiesis-closure',
} as const;
