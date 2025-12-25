import { Helmet } from 'react-helmet-async'
import { Github, ExternalLink, Code2, BookOpen, FileCode, MessageSquare } from 'lucide-react'

export default function Developers() {
  return (
    <>
      <Helmet>
        <title>Developers | Univrs Learn</title>
        <meta name="description" content="Get started with DOL - the specification-first language for building self-aware systems." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-light text-univrs-text-primary mb-6">
              DOL for Developers
            </h1>
            <p className="text-xl text-univrs-text-secondary">
              Specification-first development for self-aware systems.
            </p>
          </div>
        </div>
      </section>

      {/* Why DOL - Comparison Table */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light text-univrs-text-primary mb-8">Why DOL?</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-univrs-border">
                  <th className="py-3 px-4 text-univrs-text-primary font-normal">Traditional</th>
                  <th className="py-3 px-4 text-univrs-text-primary font-normal">DOL</th>
                </tr>
              </thead>
              <tbody className="text-univrs-text-secondary">
                <tr className="border-b border-univrs-border">
                  <td className="py-4 px-4">Write code, hope it works</td>
                  <td className="py-4 px-4 text-univrs-primary-400">Specify behavior, generate code</td>
                </tr>
                <tr className="border-b border-univrs-border">
                  <td className="py-4 px-4">Tests document behavior</td>
                  <td className="py-4 px-4 text-univrs-primary-400">Specifications ARE behavior</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Breaking changes surprise you</td>
                  <td className="py-4 px-4 text-univrs-primary-400">Evolution tracks changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light text-univrs-text-primary mb-8">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://github.com/univrs/dol"
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:border-univrs-primary-400 transition-colors group"
            >
              <Github className="w-6 h-6 text-univrs-primary-400 mb-3" />
              <h3 className="text-lg font-normal text-univrs-text-primary mb-1 group-hover:text-univrs-primary-400 transition-colors">
                GitHub
              </h3>
              <p className="text-sm text-univrs-text-muted">univrs/dol</p>
            </a>
            <a
              href="/dol/quick-start"
              className="card hover:border-univrs-secondary-400 transition-colors group"
            >
              <Code2 className="w-6 h-6 text-univrs-secondary-400 mb-3" />
              <h3 className="text-lg font-normal text-univrs-text-primary mb-1 group-hover:text-univrs-secondary-400 transition-colors">
                Quick Start
              </h3>
              <p className="text-sm text-univrs-text-muted">Get up and running</p>
            </a>
            <a
              href="/dol/language"
              className="card hover:border-purple-400 transition-colors group"
            >
              <BookOpen className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-lg font-normal text-univrs-text-primary mb-1 group-hover:text-purple-400 transition-colors">
                Language Guide
              </h3>
              <p className="text-sm text-univrs-text-muted">Learn the syntax</p>
            </a>
            <a
              href="/dol/examples"
              className="card hover:border-univrs-primary-400 transition-colors group"
            >
              <FileCode className="w-6 h-6 text-univrs-primary-400 mb-3" />
              <h3 className="text-lg font-normal text-univrs-text-primary mb-1 group-hover:text-univrs-primary-400 transition-colors">
                Examples
              </h3>
              <p className="text-sm text-univrs-text-muted">See it in action</p>
            </a>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light text-univrs-text-primary mb-8">Getting Started</h2>
          <div className="card max-w-3xl">
            <p className="text-univrs-text-secondary mb-6">
              Clone the repository and build DOL from source:
            </p>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-univrs-text-muted mb-1"># Clone the repository</div>
              <div className="text-univrs-text-primary mb-3">git clone https://github.com/univrs/dol.git</div>

              <div className="text-univrs-text-muted mb-1"># Navigate to the project</div>
              <div className="text-univrs-text-primary mb-3">cd dol</div>

              <div className="text-univrs-text-muted mb-1"># Build with all features</div>
              <div className="text-univrs-text-primary">cargo build --release --all-features</div>
            </div>
            <p className="text-univrs-text-muted text-sm mt-4">
              Requires Rust 1.70 or later. Install Rust from{' '}
              <a
                href="https://rustup.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-univrs-primary-400 hover:text-univrs-primary-300 underline"
              >
                rustup.rs
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Join the Community */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light text-univrs-text-primary mb-8">Join the Community</h2>
          <div className="card max-w-2xl">
            <p className="text-univrs-text-secondary mb-6">
              Connect with other developers, ask questions, and contribute to the DOL ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/univrs/dol/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageSquare className="mr-2 w-4 h-4" />
                GitHub Discussions
              </a>
              <a
                href="https://github.com/univrs/dol/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Contributing Guidelines
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
