import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FileCode, BookOpen, Library, Code2, ArrowRight } from 'lucide-react'

const sections = [
  {
    name: 'Learn DOL',
    description: 'Interactive tutorials from basics to advanced concepts',
    href: '/dol/learn',
    icon: BookOpen,
  },
  {
    name: 'Reference',
    description: 'Complete language specification and syntax',
    href: '/dol/reference',
    icon: Code2,
  },
  {
    name: 'Standard Library',
    description: 'Built-in types, traits, and constraints',
    href: '/dol/stdlib',
    icon: Library,
  },
]

export default function DOLIndex() {
  return (
    <>
      <Helmet>
        <title>DOL - Design Ontology Language | Univrs Learn</title>
        <meta name="description" content="Learn the Design Ontology Language (DOL) - a specification language for systems that know what they should be." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-univrs-primary-500 to-univrs-primary-700 flex items-center justify-center">
                <FileCode className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary">
                Design Ontology Language
              </h1>
            </div>
            <p className="text-xl text-univrs-text-secondary mb-8">
              A specification language for systems that know what they should be.
              Write specs first. Generate tests. Implement with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Key Concepts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Genes', desc: 'Define properties and data structures' },
              { name: 'Traits', desc: 'Define behaviors and capabilities' },
              { name: 'Constraints', desc: 'Define rules and invariants' },
              { name: 'Systems', desc: 'Compose genes, traits, and constraints' },
            ].map((concept) => (
              <div key={concept.name} className="card">
                <h3 className="text-lg font-semibold text-univrs-primary-400 mb-2">{concept.name}</h3>
                <p className="text-sm text-univrs-text-muted">{concept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Quick Example</h2>
          <div className="bg-univrs-bg-secondary rounded-xl border border-white/5 overflow-hidden">
            <div className="px-4 py-2 bg-univrs-bg-tertiary border-b border-white/5 flex items-center gap-2">
              <span className="text-xs text-univrs-text-muted font-mono">example.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono text-univrs-secondary-400 overflow-x-auto">
{`// Define a system with physical properties
system Particle {
  // Genes define data
  gene position: Vector3
  gene velocity: Vector3
  gene mass: Float

  // Traits define behavior
  trait Movable {
    fn update(dt: Float) {
      position += velocity * dt
    }
  }

  // Constraints define rules
  constraint mass > 0.0
  constraint magnitude(velocity) <= SPEED_OF_LIGHT
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Explore DOL</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.href}
                className="card group"
              >
                <section.icon className="w-8 h-8 text-univrs-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-univrs-text-primary mb-2 group-hover:text-univrs-primary-400 transition-colors">
                  {section.name}
                </h3>
                <p className="text-sm text-univrs-text-muted mb-4">{section.description}</p>
                <div className="flex items-center text-sm text-univrs-primary-400">
                  Explore
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
