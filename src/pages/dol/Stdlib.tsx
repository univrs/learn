import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Library, ChevronRight, BookOpen, Atom, Layers, Database, ArrowRight } from 'lucide-react'

const modules = [
  {
    name: 'Philosophy',
    description: 'Why ontology-first development matters',
    icon: BookOpen,
    topics: ['Three layers of system design', 'Physical grounding', 'Durable understanding'],
    color: 'var(--glow-cyan)',
  },
  {
    name: 'Foundations',
    description: 'Physics, causality, and information fundamentals',
    icon: Atom,
    topics: ['Thermodynamics', "Landauer's principle", 'Causality'],
    color: 'var(--glow-gold)',
  },
  {
    name: 'Primitives',
    description: 'Basic ontological building blocks',
    icon: Layers,
    topics: ['Continuants', 'Occurrents', 'Relations'],
    color: 'var(--spore-purple)',
  },
  {
    name: 'Information',
    description: 'Information theory applied to systems',
    icon: Database,
    topics: ['Encoding/decoding', 'Channel capacity', 'Bits ↔ Atoms'],
    color: 'var(--glow-cyan)',
  },
]

export default function DOLStdlib() {
  return (
    <>
      <Helmet>
        <title>DOL Standard Library | Univrs Learn</title>
        <meta name="description" content="Standard library documentation for the Design Ontology Language - philosophy, foundations, primitives, and information theory." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/dol" className="hover:text-univrs-primary-400 transition-colors">DOL</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Standard Library</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Library className="w-10 h-10" style={{ color: 'var(--glow-cyan)' }} />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Standard Library
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            The conceptual foundations and primitives that underpin all DOL specifications.
            Philosophy, physics, and information theory for systems design.
          </p>
        </div>
      </section>

      {/* Three Layers Diagram */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            The Three Layers of System Design
          </h2>
          <div className="space-y-4">
            <div className="card" style={{ borderLeft: '4px solid var(--glow-cyan)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--glow-cyan)' }}>Ontological Layer</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--glow-cyan-dim)', color: 'var(--glow-cyan)' }}>
                  Decades to centuries
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                "What exists? What can happen? What relationships hold?"
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--soft-gray)' }}>
                Entities, events, relationships, transformations and their invariants
              </p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--glow-gold)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--glow-gold)' }}>Architectural Layer</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--glow-gold-dim)', color: 'var(--glow-gold)' }}>
                  Years to decades
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                "How do we organize our solution?"
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--soft-gray)' }}>
                Component boundaries, communication patterns, failure modes
              </p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--spore-purple)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--spore-purple)' }}>Implementation Layer</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(176, 136, 249, 0.2)', color: 'var(--spore-purple)' }}>
                  Months to years
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                "How do we build it with today's tools?"
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--soft-gray)' }}>
                Programming languages, libraries, hardware targets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Standard Library Modules
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div key={module.name} className="card group cursor-pointer">
                <div className="flex items-start gap-4">
                  <module.icon className="w-8 h-8 flex-shrink-0" style={{ color: module.color }} />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: module.color }}>
                      {module.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {module.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--soft-gray)' }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: module.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Grounding */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Physical Grounding: The Non-Negotiables
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Any honest ontology of computing must acknowledge physical reality. These are invariants
            of physical reality that any ontology must respect:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Conservation of Energy', desc: 'Computation requires energy. There is no free lunch.' },
              { title: 'Second Law of Thermodynamics', desc: 'Entropy increases. Information degrades without energy input.' },
              { title: 'Causality', desc: 'Effects follow causes. The future depends on the past.' },
              { title: 'Finite Speed of Light', desc: 'Information propagates at bounded speed.' },
              { title: "Landauer's Principle", desc: 'Erasing information has a minimum energy cost.' },
            ].map((principle) => (
              <div key={principle.title} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--glow-cyan)' }}>{principle.title}</h4>
                <p className="text-xs" style={{ color: 'var(--soft-gray)' }}>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bits ↔ Atoms */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            The Bidirectional Bridge: Bits ↔ Atoms
          </h2>
          <div className="rounded-xl p-8 font-mono text-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--glow-cyan-dim)' }}>
                  <span style={{ color: 'var(--glow-cyan)' }}>DIGITAL</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--soft-gray)' }}>Domain</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--glow-gold)' }}>Actuation</span>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--glow-gold)' }} />
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" style={{ color: 'var(--spore-purple)' }} />
                  <span style={{ color: 'var(--spore-purple)' }}>Sensing</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--glow-gold-dim)' }}>
                  <span style={{ color: 'var(--glow-gold)' }}>PHYSICAL</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--soft-gray)' }}>Domain</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center" style={{ color: 'var(--text-secondary)' }}>
            Every actuation has latency, energy cost, and failure probability.
            Every sensing has precision limits, sampling constraints, and information loss.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl italic" style={{ color: 'var(--text-secondary)' }}>
            "The map is not the territory, but a good map outlives any particular journey."
          </blockquote>
          <p className="mt-6" style={{ color: 'var(--soft-gray)' }}>
            Design Ontology exists precisely at this interface—rigorous enough to reason about,
            practical enough to implement, flexible enough to evolve.
          </p>
        </div>
      </section>
    </>
  )
}
