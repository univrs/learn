import { Link } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center animate-fade-up">
          {/* Tagline */}
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-4"
            style={{ color: 'var(--glow-cyan)' }}
          >
            <span
              className="w-10 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--glow-cyan))' }}
            />
            Meta-Tools Ecosystem
            <span
              className="w-10 h-px"
              style={{ background: 'linear-gradient(90deg, var(--glow-cyan), transparent)' }}
            />
          </p>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="gradient-text">Univrs</span> Learn
          </h1>

          {/* Tagline */}
          <p
            className="text-xl sm:text-2xl font-medium mb-4 italic"
            style={{ color: 'var(--text-secondary)' }}
          >
            Creating tools of self-aware systems.
          </p>

          {/* Description */}
          <p
            className="max-w-2xl mx-auto text-lg mb-10"
            style={{ color: 'var(--soft-gray)' }}
          >
            The Univrs meta-tools ecosystem provides the foundation for specification-driven development,
            intelligent compilation, and composable capabilities.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dol"
              className="btn-primary group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/univrs"
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
