import { Link } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center animate-fade-up">
          {/* Tagline */}
          <p
            className="text-sm font-normal uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-4"
            style={{ color: 'var(--glow-cyan)' }}
          >
            <span
              className="w-10 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--glow-cyan))' }}
            />
            Univrs.io Ecosystem
            <span
              className="w-10 h-px"
              style={{ background: 'linear-gradient(90deg, var(--glow-cyan), transparent)' }}
            />
          </p>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Tools for systems that <span className="gradient-text">understand themselves</span>
          </h1>

          {/* Description */}
          <p
            className="max-w-2xl mx-auto text-lg mb-6"
            style={{ color: 'var(--soft-gray)' }}
          >
            The Univrs meta-tools ecosystem provides the foundation for specification-driven development,
            intelligent compilation, and composable capabilities.
          </p>

          {/* Key Metrics Banner */}
          <div
            className="max-w-3xl mx-auto mb-10 py-4 px-6 rounded-lg flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-medium"
            style={{
              backgroundColor: 'var(--forest-floor)',
              borderLeft: '3px solid var(--glow-cyan)'
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--glow-cyan)' }}>1,800+ Tests</span>
            </div>
            <div
              className="hidden sm:block w-px h-4"
              style={{ backgroundColor: 'var(--soft-gray)' }}
            />
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--glow-gold)' }}>DOL v0.8.0 + WASM</span>
            </div>
            <div
              className="hidden sm:block w-px h-4"
              style={{ backgroundColor: 'var(--soft-gray)' }}
            />
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--spore-purple)' }}>HIR + MLIR Pipeline</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dol"
              className="btn-primary group"
            >
              Get Started with DOL
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/univrs/dol"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="mr-2 w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
