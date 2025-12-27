import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Sparkles,
  Terminal,
  Trophy,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTrackProgress } from './ProgressTracker'
import sidebarConfig from '../../config/sidebar.json'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  BookOpen,
  Sparkles,
  Terminal,
  Trophy
}

interface SidebarItem {
  slug: string
  title: string
  description: string
  duration: string
}

interface SidebarTrack {
  label: string
  description: string
  duration: string
  level: string
  icon: string
  items: SidebarItem[]
}

interface TutorialSidebarProps {
  currentTrack?: string
  currentLesson?: string
  className?: string
}

export default function TutorialSidebar({
  currentTrack,
  currentLesson,
  className
}: TutorialSidebarProps) {
  const location = useLocation()
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState<Record<string, number>>({})

  // Initialize expanded state based on current track
  useEffect(() => {
    if (currentTrack) {
      setExpandedTracks(prev => ({ ...prev, [currentTrack]: true }))
    }
  }, [currentTrack])

  // Load progress for all tracks
  useEffect(() => {
    const tracks = sidebarConfig.tutorials.items as Record<string, SidebarTrack>
    const newProgress: Record<string, number> = {}

    Object.entries(tracks).forEach(([trackId, track]) => {
      const trackProgress = getTrackProgress(trackId)
      const completed = trackProgress?.lessons.filter(l => l.completed).length || 0
      newProgress[trackId] = Math.round((completed / track.items.length) * 100)
    })

    setProgress(newProgress)
  }, [location.pathname])

  const toggleTrack = (trackId: string) => {
    setExpandedTracks(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }))
  }

  const isLessonComplete = (trackId: string, slug: string): boolean => {
    const trackProgress = getTrackProgress(trackId)
    return trackProgress?.lessons.some(l => l.slug === slug && l.completed) || false
  }

  const tracks = sidebarConfig.tutorials.items as Record<string, SidebarTrack>

  // Find previous and next lessons
  const findAdjacentLessons = () => {
    if (!currentTrack || !currentLesson) return { prev: null, next: null }

    const track = tracks[currentTrack]
    if (!track) return { prev: null, next: null }

    const currentIndex = track.items.findIndex(item => item.slug === currentLesson)
    if (currentIndex === -1) return { prev: null, next: null }

    const prev = currentIndex > 0 ? {
      ...track.items[currentIndex - 1],
      trackId: currentTrack
    } : null

    const next = currentIndex < track.items.length - 1 ? {
      ...track.items[currentIndex + 1],
      trackId: currentTrack
    } : null

    return { prev, next }
  }

  const { prev, next } = findAdjacentLessons()

  return (
    <aside
      className={cn("flex flex-col h-full", className)}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)'
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <Link
          to="/tutorials"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          <Home className="w-4 h-4" style={{ color: 'var(--glow-cyan)' }} />
          Tutorials
        </Link>
      </div>

      {/* Track list - scrollable */}
      <nav className="flex-1 overflow-y-auto p-2">
        {Object.entries(tracks).map(([trackId, track]) => {
          const Icon = iconMap[track.icon] || BookOpen
          const isExpanded = expandedTracks[trackId]
          const isCurrentTrack = trackId === currentTrack
          const trackProgress = progress[trackId] || 0

          return (
            <div key={trackId} className="mb-2">
              {/* Track header */}
              <button
                onClick={() => toggleTrack(trackId)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                  isCurrentTrack && "ring-1"
                )}
                style={{
                  backgroundColor: isCurrentTrack ? 'var(--moss)' : 'transparent',
                  borderColor: isCurrentTrack ? 'var(--glow-cyan-dim)' : 'transparent'
                }}
              >
                <Icon
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: 'var(--glow-cyan)' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {track.label}
                    </span>
                    {trackProgress > 0 && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: trackProgress === 100
                            ? 'var(--glow-cyan-dim)'
                            : 'var(--bark)',
                          color: trackProgress === 100
                            ? 'var(--glow-cyan)'
                            : 'var(--text-secondary)'
                        }}
                      >
                        {trackProgress}%
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {track.items.length} lessons
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'var(--soft-gray)' }}
                  />
                ) : (
                  <ChevronRight
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'var(--soft-gray)' }}
                  />
                )}
              </button>

              {/* Lessons */}
              {isExpanded && (
                <div className="mt-1 ml-6 space-y-1">
                  {track.items.map((item, index) => {
                    const isComplete = isLessonComplete(trackId, item.slug)
                    const isCurrent = trackId === currentTrack && item.slug === currentLesson

                    return (
                      <Link
                        key={item.slug}
                        to={`/tutorials/${trackId}/${item.slug}`}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md transition-all text-sm",
                          isCurrent && "ring-1"
                        )}
                        style={{
                          backgroundColor: isCurrent ? 'var(--forest-floor)' : 'transparent',
                          borderColor: isCurrent ? 'var(--glow-cyan)' : 'transparent'
                        }}
                      >
                        {isComplete ? (
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: 'var(--glow-cyan)' }}
                          />
                        ) : (
                          <Circle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: isCurrent ? 'var(--glow-cyan)' : 'var(--soft-gray)' }}
                          />
                        )}
                        <span
                          className="flex-1 truncate"
                          style={{
                            color: isCurrent
                              ? 'var(--text-primary)'
                              : isComplete
                                ? 'var(--text-secondary)'
                                : 'var(--text-primary)'
                          }}
                        >
                          {index + 1}. {item.title}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Navigation footer */}
      {(prev || next) && (
        <div
          className="flex-shrink-0 p-4 space-y-2"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {prev && (
            <Link
              to={`/tutorials/${prev.trackId}/${prev.slug}`}
              className="flex items-center gap-2 p-2 rounded-lg transition-all w-full hover:bg-opacity-80"
              style={{
                backgroundColor: 'var(--forest-floor)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <ArrowLeft
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'var(--soft-gray)' }}
              />
              <div className="flex-1 min-w-0 text-left">
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Previous
                </p>
                <p
                  className="text-sm truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {prev.title}
                </p>
              </div>
            </Link>
          )}

          {next && (
            <Link
              to={`/tutorials/${next.trackId}/${next.slug}`}
              className="flex items-center gap-2 p-2 rounded-lg transition-all w-full hover:bg-opacity-80"
              style={{
                backgroundColor: 'var(--moss)',
                border: '1px solid var(--glow-cyan-dim)'
              }}
            >
              <div className="flex-1 min-w-0 text-left">
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Next
                </p>
                <p
                  className="text-sm truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {next.title}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'var(--glow-cyan)' }}
              />
            </Link>
          )}
        </div>
      )}
    </aside>
  )
}
