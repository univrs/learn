import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Code2, ChevronRight, FileCode, Network, Sprout, Dna, ArrowRight } from 'lucide-react'

const modules = [
  {
    file: 'types.dol',
    description: 'Foundation types: Vec3, Gradient, Nutrient, Energy, GeoTime',
    icon: FileCode,
    color: 'var(--glow-cyan)',
  },
  {
    file: 'hyphal.dol',
    description: 'Fungal growth modeling: tips, segments, branching, fusion',
    icon: Sprout,
    color: 'var(--glow-gold)',
  },
  {
    file: 'transport.dol',
    description: 'Source-sink resource flow dynamics in networks',
    icon: Network,
    color: 'var(--spore-purple)',
  },
  {
    file: 'ecosystem.dol',
    description: 'Lotka-Volterra population dynamics and trophic levels',
    icon: Sprout,
    color: 'var(--glow-cyan)',
  },
  {
    file: 'evolution.dol',
    description: 'Speciation via evolves, genetic traits, lineage tracking',
    icon: Dna,
    color: 'var(--glow-gold)',
  },
  {
    file: 'mycelium.dol',
    description: 'Complete mycelium network simulation',
    icon: Network,
    color: 'var(--spore-purple)',
  },
]

export default function DOLExamples() {
  return (
    <>
      <Helmet>
        <title>DOL Examples | Univrs Learn</title>
        <meta name="description" content="Real-world DOL examples showcasing biological systems modeling with the biology module." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/dol" className="hover:text-univrs-primary-400 transition-colors">DOL</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Examples</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-10 h-10" style={{ color: 'var(--glow-cyan)' }} />
            <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
              DOL Examples
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Real-world examples showcasing DOL v0.7.0 capabilities through a complete biological systems module.
            Learn by exploring actual production code.
          </p>
        </div>
      </section>

      {/* Biology Module Overview */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Biology Module
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            A complete DOL v0.7.0 showcase modeling biological systems from molecular to ecosystem scales.
            Located in the DOL repository at <code className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--glow-cyan)' }}>examples/stdlib/biology/</code>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <div key={module.file} className="card">
                <div className="flex items-start gap-3">
                  <module.icon className="w-6 h-6 flex-shrink-0" style={{ color: module.color }} />
                  <div>
                    <code className="text-xs font-mono" style={{ color: module.color }}>
                      {module.file}
                    </code>
                    <p className="text-xs mt-1" style={{ color: 'var(--soft-gray)' }}>
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Pattern: Typed Fields */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Pattern: Typed Fields with Defaults
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            DOL genes can have strongly-typed fields with default values, methods, and constraints.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>types.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`/// 3D position vector
pub gene Vec3 {
  has x: Float64
  has y: Float64
  has z: Float64

  fun magnitude() -> Float64 {
    return (this.x * this.x + this.y * this.y + this.z * this.z).sqrt()
  }

  fun normalize() -> Vec3 {
    mag = this.magnitude()
    return Vec3 { x: this.x / mag, y: this.y / mag, z: this.z / mag }
  }

  exegesis {
    Three-dimensional vector for spatial positioning.
    Used for hyphal growth direction, nutrient gradients, etc.
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Pattern: Scientific Constraints */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Pattern: Scientific Constraints
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Model real-world phenomena like ecological stoichiometry (Redfield ratio) as DOL constraints.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>types.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`/// Elemental nutrients (Redfield ratio)
pub gene Nutrient {
  has carbon: Float64
  has nitrogen: Float64
  has phosphorus: Float64
  has water: Float64

  constraint non_negative {
    this.carbon >= 0.0 &&
    this.nitrogen >= 0.0 &&
    this.phosphorus >= 0.0 &&
    this.water >= 0.0
  }

  constraint stoichiometry {
    // Redfield ratio: C:N:P ≈ 106:16:1
    this.nitrogen > 0.0 implies (
      this.carbon / this.nitrogen >= 6.0 &&
      this.carbon / this.nitrogen <= 10.0
    )
  }

  exegesis {
    Nutrient package following ecological stoichiometry.
    The Redfield ratio (C:N:P ≈ 106:16:1) constrains valid
    nutrient compositions for biological realism.
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Pattern: Traits and Laws */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Pattern: Traits with Biological Laws
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Traits define behavioral contracts with laws that enforce biological principles like mass conservation.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>hyphal.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`pub trait Hyphal {
  /// Extend toward nutrient gradient
  is extend(gradient: Gradient<Nutrient>) -> Self

  /// Branch into multiple hyphae
  is branch(factor: Float64) -> List<Self>

  /// Fuse with another hypha (anastomosis)
  is fuse(other: Self) -> Option<Self>

  law conservation_of_mass {
    // Mass in = mass out + mass stored
    forall self: Self.
      self.absorbed_mass() ==
        self.transported_mass() + self.stored_mass()
  }

  law branching_conserves_potential {
    // Branching distributes potential, doesn't create it
    forall self: Self, factor: Float64.
      sum(self.branch(factor).map(|b| b.branching_potential))
        <= self.branching_potential
  }

  exegesis {
    Hyphal trait encodes fungal growth behaviors:
    - Chemotropic extension toward nutrients
    - Branching to explore space
    - Anastomosis (fusion) to form networks
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Pattern: Ecosystem Dynamics */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Pattern: Population Dynamics (Lotka-Volterra)
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Model predator-prey dynamics with trophic levels and energy transfer efficiency.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>ecosystem.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`/// Species in an ecosystem
pub gene Species {
  has id: UInt64
  has name: String
  has role: TrophicRole
  has population: UInt64
  has birth_rate: Float64
  has death_rate: Float64
  has carrying_capacity: UInt64

  /// Logistic growth rate
  fun growth_rate() -> Float64 {
    r = this.birth_rate - this.death_rate
    k = this.carrying_capacity as Float64
    n = this.population as Float64
    return r * n * (1.0 - n / k)
  }
}

/// Predator-prey interaction
pub gene Interaction {
  has predator: UInt64
  has prey: UInt64
  has attack_rate: Float64
  has handling_time: Float64
  has conversion_efficiency: Float64

  /// Holling Type II functional response
  fun predation_rate(prey_density: Float64) -> Float64 {
    return (this.attack_rate * prey_density) /
           (1.0 + this.attack_rate * this.handling_time * prey_density)
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Pattern: Evolution */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Pattern: Speciation with <code className="text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--glow-gold)' }}>evolves</code>
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Model evolutionary transitions with geological timestamps and migration functions.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>evolution.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`/// Eukaryote evolved from Organism (via endosymbiosis)
evolves Organism > Eukaryote @ 2.0Gya {
  added nucleus: Nucleus
  added mitochondria: List<Mitochondrion>
  added endomembrane_system: Bool = true

  constraint has_nucleus {
    this.nucleus is not null
  }

  constraint has_mitochondria {
    // All eukaryotes have mitochondria (or remnants)
    this.mitochondria.len() >= 1
  }

  migrate from Organism {
    return Eukaryote {
      species_id: old.species_id,
      genome: old.genome,
      lineage: Lineage {
        ancestor_id: Some(old.species_id),
        divergence_time: GeoTime { mya: 2000.0 },
        innovations: ["nucleus", "mitochondria", "endosymbiosis"]
      },
      generation: old.generation,
      nucleus: Nucleus.default(),
      mitochondria: [Mitochondrion.default()],
      endomembrane_system: true
    }
  }

  exegesis {
    Eukaryotes: complex cells with membrane-bound organelles.
    Evolved ~2 billion years ago via endosymbiosis.
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Complete System Example */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Complete System: Mycelium Network
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            A full simulation combining spatial growth, resource transport, and network dynamics.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>mycelium.dol</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`pub system MyceliumNetwork {
  uses Hyphal
  uses Transport<Nutrient>
  uses Evolvable

  state nodes: Map<UInt64, MyceliumNode>
  state edges: List<HyphalSegment>
  state total_biomass: Float64
  state generation: UInt64

  constraint network_connected {
    // Network must be fully connected
    forall node1, node2 in this.nodes.values().
      exists_path(node1, node2)
  }

  /// Initialize network from spore
  pub fun from_spore(position: Vec3) -> MyceliumNetwork {
    initial_tip = HyphalTip {
      position: position,
      direction: Vec3 { x: 0.0, y: 0.0, z: 1.0 },
      age: 0.0,
      branching_potential: 1.0,
      nutrients_absorbed: Nutrient.zero()
    }
    // ... initialize network
  }

  /// Grow network one time step
  pub fun grow(nutrient_field: Gradient<Nutrient>) -> MyceliumNetwork {
    // Extend tips toward nutrients
    // Branch when potential is high
    // Fuse when tips meet (anastomosis)
    // ...
  }

  exegesis {
    Complete mycelium network simulation combining:
    - Hyphal tip extension toward nutrients
    - Branching at high-nutrient locations
    - Anastomosis (network fusion)
    - Nutrient transport through network
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Running Examples */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Running the Examples
          </h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>
                Clone and Explore
              </h3>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`# Clone the DOL repository
git clone https://github.com/univrs/dol
cd dol

# Explore the biology examples
cd examples/stdlib/biology/
ls -la`}
                </pre>
              </div>
            </div>

            <div className="card">
              <h3 className="font-normal mb-3" style={{ color: 'var(--glow-gold)' }}>
                Validate with dol-check
              </h3>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`# Check all biology examples
dol-check examples/stdlib/biology/

# Check specific file
dol-check examples/stdlib/biology/mycelium.dol`}
                </pre>
              </div>
            </div>

            <div className="card">
              <h3 className="font-normal mb-3" style={{ color: 'var(--spore-purple)' }}>
                Run Tests
              </h3>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ color: 'var(--text-secondary)' }}>
{`# Run biology module tests
cargo test biology

# Run specific test
cargo test test_mycelium_growth`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Applications Beyond Biology
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            These biological patterns apply to many domains. The ontologies are universal.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-normal mb-2" style={{ color: 'var(--glow-cyan)' }}>
                Network Growth
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Hyphal growth models apply to:
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>• Neural network formation</li>
                <li>• Vascular system development</li>
                <li>• Social network expansion</li>
                <li>• Supply chain optimization</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-normal mb-2" style={{ color: 'var(--glow-gold)' }}>
                Resource Flow
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Transport models apply to:
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>• Data packet routing</li>
                <li>• Economic supply chains</li>
                <li>• Energy grid balancing</li>
                <li>• Water distribution networks</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-normal mb-2" style={{ color: 'var(--spore-purple)' }}>
                Population Dynamics
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Ecosystem models apply to:
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>• Multi-agent simulations</li>
                <li>• Economic market dynamics</li>
                <li>• Epidemic modeling</li>
                <li>• Competitive strategy games</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-normal mb-2" style={{ color: 'var(--glow-cyan)' }}>
                Evolution and Migration
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Speciation patterns apply to:
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>• API version migrations</li>
                <li>• Database schema evolution</li>
                <li>• Software architecture transitions</li>
                <li>• Protocol upgrades</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>
            Next Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/dol/learn" className="card group">
              <h3 className="font-normal mb-2 group-hover:text-univrs-primary-400 transition-colors flex items-center gap-2" style={{ color: 'var(--glow-cyan)' }}>
                Learn DOL
                <ArrowRight className="w-4 h-4" />
              </h3>
              <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
                Start with tutorials to learn DOL syntax and concepts
              </p>
            </Link>

            <Link to="/dol/stdlib" className="card group">
              <h3 className="font-normal mb-2 group-hover:text-univrs-primary-400 transition-colors flex items-center gap-2" style={{ color: 'var(--glow-gold)' }}>
                Standard Library
                <ArrowRight className="w-4 h-4" />
              </h3>
              <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
                Explore the philosophical foundations and primitives
              </p>
            </Link>

            <a href="https://github.com/univrs/dol" target="_blank" rel="noopener noreferrer" className="card group">
              <h3 className="font-normal mb-2 group-hover:text-univrs-primary-400 transition-colors flex items-center gap-2" style={{ color: 'var(--spore-purple)' }}>
                View on GitHub
                <ArrowRight className="w-4 h-4" />
              </h3>
              <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
                Browse the source code and contribute
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
