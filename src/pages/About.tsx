import { Helmet } from 'react-helmet-async'
import { Github, ExternalLink, Users, Target, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Univrs Learn</title>
        <meta name="description" content="Learn about the Univrs meta-tools ecosystem and the philosophy behind specification-driven development." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary mb-6">
              About Univrs Meta-Tools
            </h1>
            <p className="text-xl text-univrs-text-secondary">
              Build tools for self-aware systems.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <Target className="w-8 h-8 text-univrs-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-univrs-text-primary mb-2">Specification-First</h3>
              <p className="text-sm text-univrs-text-muted">
                Define what your system should be before building it. Let specifications
                drive implementation, testing, and documentation.
              </p>
            </div>
            <div className="card">
              <Lightbulb className="w-8 h-8 text-univrs-secondary-400 mb-4" />
              <h3 className="text-lg font-semibold text-univrs-text-primary mb-2">Self-Aware Systems</h3>
              <p className="text-sm text-univrs-text-muted">
                Systems that understand their own structure, constraints, and capabilities.
                Code that knows what it should be.
              </p>
            </div>
            <div className="card">
              <Users className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-univrs-text-primary mb-2">Composable Tools</h3>
              <p className="text-sm text-univrs-text-muted">
                Small, focused tools that work together. Build complex systems from
                simple, well-defined components.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ecosystem */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">The Ecosystem</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-univrs-text-secondary text-lg mb-6">
              The Univrs meta-tools ecosystem consists of three main pillars:
            </p>
            <ul className="space-y-4 text-univrs-text-secondary">
              <li>
                <strong className="text-univrs-primary-400">DOL (Design Ontology Language)</strong> -
                A specification language that lets you define systems in terms of genes (data),
                traits (behavior), and constraints (rules).
              </li>
              <li>
                <strong className="text-univrs-secondary-400">LLVM Translation Tools</strong> -
                Powered by LLVM, these tools enable cross-language translation, optimization,
                and analysis through an MCP server interface.
              </li>
              <li>
                <strong className="text-purple-400">Skills Framework</strong> -
                A standard for defining composable capabilities that can be discovered,
                combined, and used by AI agents and traditional software alike.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section id="contributing" className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Contributing</h2>
          <div className="card max-w-2xl">
            <p className="text-univrs-text-secondary mb-6">
              Univrs is an open-source project and we welcome contributions of all kinds:
              bug fixes, new features, documentation improvements, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/univrs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="mr-2 w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://univrs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Visit univrs.io
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
