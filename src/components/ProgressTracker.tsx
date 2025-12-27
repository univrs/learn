import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Lock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LessonProgress {
  slug: string
  completed: boolean
  completedAt?: string
}

export interface TrackProgress {
  trackId: string
  lessons: LessonProgress[]
  startedAt?: string
  completedAt?: string
}

interface ProgressTrackerProps {
  trackId: string
  lessons: Array<{
    slug: string
    title: string
    duration: string
  }>
  currentLesson?: string
  className?: string
  compact?: boolean
}

// Local storage key prefix
const STORAGE_KEY = 'univrs-tutorial-progress'

// Get progress from localStorage
function getProgress(): Record<string, TrackProgress> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Save progress to localStorage
function saveProgress(progress: Record<string, TrackProgress>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

// Get track progress
export function getTrackProgress(trackId: string): TrackProgress | null {
  const progress = getProgress()
  return progress[trackId] || null
}

// Mark a lesson as complete
export function markLessonComplete(trackId: string, slug: string): void {
  const progress = getProgress()

  if (!progress[trackId]) {
    progress[trackId] = {
      trackId,
      lessons: [],
      startedAt: new Date().toISOString()
    }
  }

  const existingLesson = progress[trackId].lessons.find(l => l.slug === slug)
  if (!existingLesson) {
    progress[trackId].lessons.push({
      slug,
      completed: true,
      completedAt: new Date().toISOString()
    })
  } else {
    existingLesson.completed = true
    existingLesson.completedAt = new Date().toISOString()
  }

  saveProgress(progress)
}

// Check if lesson is complete
export function isLessonComplete(trackId: string, slug: string): boolean {
  const trackProgress = getTrackProgress(trackId)
  if (!trackProgress) return false
  const lesson = trackProgress.lessons.find(l => l.slug === slug)
  return lesson?.completed || false
}

// Calculate track completion percentage
export function getTrackCompletionPercentage(trackId: string, totalLessons: number): number {
  const trackProgress = getTrackProgress(trackId)
  if (!trackProgress || totalLessons === 0) return 0
  const completed = trackProgress.lessons.filter(l => l.completed).length
  return Math.round((completed / totalLessons) * 100)
}

// Reset track progress
export function resetTrackProgress(trackId: string): void {
  const progress = getProgress()
  delete progress[trackId]
  saveProgress(progress)
}

export default function ProgressTracker({
  trackId,
  lessons,
  currentLesson,
  className,
  compact = false
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState<TrackProgress | null>(null)

  useEffect(() => {
    setProgress(getTrackProgress(trackId))

    // Listen for storage changes (cross-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setProgress(getTrackProgress(trackId))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [trackId])

  const completedCount = progress?.lessons.filter(l => l.completed).length || 0
  const percentage = Math.round((completedCount / lessons.length) * 100)

  const isComplete = (slug: string) => {
    return progress?.lessons.some(l => l.slug === slug && l.completed) || false
  }

  const isLocked = (index: number) => {
    // First lesson is never locked
    if (index === 0) return false
    // Lesson is locked if previous lesson is not complete
    const prevLesson = lessons[index - 1]
    return !isComplete(prevLesson.slug)
  }

  const isCurrent = (slug: string) => currentLesson === slug

  if (compact) {
    return (
      <div
        className={cn("rounded-lg p-4", className)}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Track Progress
          </span>
          <span
            className="text-sm"
            style={{ color: 'var(--glow-cyan)' }}
          >
            {completedCount}/{lessons.length}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--bark)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(135deg, var(--glow-cyan), #00b8a0)'
            }}
          />
        </div>

        <p
          className="text-xs mt-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {percentage === 100
            ? 'Track complete!'
            : `${percentage}% complete`}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn("rounded-xl p-6", className)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          Your Progress
        </h3>
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
          style={{
            backgroundColor: percentage === 100 ? 'var(--glow-cyan-dim)' : 'var(--moss)',
            color: percentage === 100 ? 'var(--glow-cyan)' : 'var(--text-secondary)'
          }}
        >
          {completedCount}/{lessons.length} lessons
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-3 rounded-full overflow-hidden mb-6"
        style={{ backgroundColor: 'var(--bark)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(135deg, var(--glow-cyan), #00b8a0)',
            boxShadow: percentage > 0 ? 'var(--glow-sm)' : 'none'
          }}
        />
      </div>

      {/* Lesson list */}
      <div className="space-y-2">
        {lessons.map((lesson, index) => {
          const completed = isComplete(lesson.slug)
          const locked = isLocked(index)
          const current = isCurrent(lesson.slug)

          return (
            <div
              key={lesson.slug}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all",
                current && "ring-1",
                !locked && "cursor-pointer hover:bg-opacity-80"
              )}
              style={{
                backgroundColor: current ? 'var(--moss)' : 'transparent',
                borderColor: current ? 'var(--glow-cyan)' : 'transparent',
                opacity: locked ? 0.5 : 1
              }}
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {completed ? (
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: 'var(--glow-cyan)' }}
                  />
                ) : locked ? (
                  <Lock
                    className="w-5 h-5"
                    style={{ color: 'var(--soft-gray)' }}
                  />
                ) : (
                  <Circle
                    className="w-5 h-5"
                    style={{ color: current ? 'var(--glow-cyan)' : 'var(--soft-gray)' }}
                  />
                )}
              </div>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{
                    color: completed
                      ? 'var(--text-secondary)'
                      : current
                        ? 'var(--text-primary)'
                        : 'var(--text-primary)'
                  }}
                >
                  {lesson.title}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--soft-gray)' }}
                >
                  {lesson.duration}
                </p>
              </div>

              {/* Arrow for non-locked items */}
              {!locked && (
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: 'var(--soft-gray)' }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Completion message */}
      {percentage === 100 && (
        <div
          className="mt-6 p-4 rounded-lg text-center"
          style={{
            backgroundColor: 'var(--glow-cyan-dim)',
            border: '1px solid var(--glow-cyan)'
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--glow-cyan)' }}
          >
            Congratulations! You've completed this track!
          </p>
        </div>
      )}
    </div>
  )
}
