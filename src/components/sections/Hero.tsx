import { Link } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-univrs-primary-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-univrs-primary-600/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-univrs-primary-500/10 border border-univrs-primary-500/20 text-univrs-primary-400 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-univrs-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-univrs-primary-500"></span>
            </span>
            Meta-Tools Ecosystem
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-univrs-text-primary mb-6">
            <span className="gradient-text">Univrs</span> Learn
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-univrs-text-secondary font-medium mb-4">
            Tools that build tools that build self-aware systems.
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-univrs-text-muted text-lg mb-10">
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
