import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Clock, BarChart2, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import TutorialSidebar from './TutorialSidebar'
import ProgressTracker, { markLessonComplete } from './ProgressTracker'
import sidebarConfig from '../../config/sidebar.json'

interface TutorialLayoutProps {
  children: ReactNode
  trackId: string
  lessonSlug: string
  className?: string
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

export default function TutorialLayout({
  children,
  trackId,
  lessonSlug,
  className
}: TutorialLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tracks = sidebarConfig.tutorials.items as Record<string, SidebarTrack>
  const track = tracks[trackId]
  const lessons = track?.items || []
  const currentIndex = lessons.findIndex(l => l.slug === lessonSlug)
  const currentLesson = lessons[currentIndex]
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  // Transform lessons for ProgressTracker
  const progressLessons = lessons.map(l => ({
    slug: l.slug,
    title: l.title,
    duration: l.duration
  }))

  const handleMarkComplete = () => {
    markLessonComplete(trackId, lessonSlug)
    // Force re-render by triggering a custom event
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className={cn("flex h-[calc(100vh-70px)]", className)}>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 left-4 z-50 p-3 rounded-full lg:hidden"
        style={{
          backgroundColor: 'var(--glow-cyan)',
          color: 'var(--void)',
          boxShadow: 'var(--glow-md)'
        }}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 lg:relative lg:translate-x-0 pt-[70px] lg:pt-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <TutorialSidebar
          currentTrack={trackId}
          currentLesson={lessonSlug}
          className="h-full"
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Lesson header */}
          <div
            className="sticky top-0 z-10 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(10, 13, 11, 0.95)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    to={`/tutorials/${trackId}`}
                    className="text-sm mb-1 block transition-colors hover:opacity-80"
                    style={{ color: 'var(--glow-cyan)' }}
                  >
                    {track?.label}
                  </Link>
                  <h1
                    className="text-xl font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {currentLesson?.title || 'Lesson'}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  {currentLesson?.duration && (
                    <div
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Clock className="w-4 h-4" />
                      {currentLesson.duration}
                    </div>
                  )}

                  <div
                    className="flex items-center gap-1.5 text-sm px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--moss)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <BarChart2 className="w-4 h-4" />
                    {currentIndex + 1} / {lessons.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson content */}
          <article className="max-w-4xl mx-auto px-6 py-8">
            <div
              className="prose prose-invert max-w-none"
              style={{
                '--tw-prose-body': 'var(--text-secondary)',
                '--tw-prose-headings': 'var(--text-primary)',
                '--tw-prose-links': 'var(--glow-cyan)',
                '--tw-prose-code': 'var(--glow-cyan)',
                '--tw-prose-pre-bg': 'var(--bg-secondary)',
              } as React.CSSProperties}
            >
              {children}
            </div>

            {/* Lesson completion */}
            <div
              className="mt-12 p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <h3
                className="text-lg font-medium mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Completed this lesson?
              </h3>
              <button
                onClick={handleMarkComplete}
                className="btn-primary"
              >
                Mark as Complete
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {prevLesson ? (
                <Link
                  to={`/tutorials/${trackId}/${prevLesson.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg transition-all hover:bg-opacity-80"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <ArrowLeft
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: 'var(--soft-gray)' }}
                  />
                  <div className="text-left">
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Previous
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {prevLesson.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  to={`/tutorials/${trackId}/${nextLesson.slug}`}
                  className="flex items-center justify-end gap-3 p-4 rounded-lg transition-all hover:bg-opacity-80"
                  style={{
                    backgroundColor: 'var(--moss)',
                    border: '1px solid var(--glow-cyan-dim)'
                  }}
                >
                  <div className="text-right">
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Next
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {nextLesson.title}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: 'var(--glow-cyan)' }}
                  />
                </Link>
              ) : (
                <Link
                  to="/tutorials"
                  className="flex items-center justify-end gap-3 p-4 rounded-lg transition-all hover:bg-opacity-80"
                  style={{
                    backgroundColor: 'var(--glow-cyan-dim)',
                    border: '1px solid var(--glow-cyan)'
                  }}
                >
                  <div className="text-right">
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Track Complete!
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--glow-cyan)' }}
                    >
                      Back to Tutorials
                    </p>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: 'var(--glow-cyan)' }}
                  />
                </Link>
              )}
            </div>
          </article>
        </main>

        {/* Right sidebar - Progress tracker (hidden on mobile) */}
        <aside
          className="hidden xl:block w-80 overflow-y-auto p-6 flex-shrink-0"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '1px solid var(--border-subtle)'
          }}
        >
          <ProgressTracker
            trackId={trackId}
            lessons={progressLessons}
            currentLesson={lessonSlug}
          />

          {/* Track info */}
          {track && (
            <div
              className="mt-6 p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <h4
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                About this track
              </h4>
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {track.description}
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--moss)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {track.duration}
                </span>
                <span
                  className="px-2 py-1 rounded capitalize"
                  style={{
                    backgroundColor: track.level === 'beginner'
                      ? 'var(--glow-cyan-dim)'
                      : track.level === 'intermediate'
                        ? 'var(--glow-gold-dim)'
                        : 'var(--spore-purple)',
                    color: track.level === 'beginner'
                      ? 'var(--glow-cyan)'
                      : track.level === 'intermediate'
                        ? 'var(--glow-gold)'
                        : 'var(--mycelium-white)'
                  }}
                >
                  {track.level}
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
