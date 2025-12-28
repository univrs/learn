# Learn Univrs

[![Deploy to GitHub Pages](https://github.com/univrs/learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/univrs/learn/actions/workflows/deploy.yml)

**Documentation and tutorials for the Univrs ecosystem.**

**Live Site**: [learn.univrs.io](https://learn.univrs.io)

---

## DOL v0.3.0

The Design Ontology Language (DOL) is a specification-first language for ontology-driven development.

[![GitHub Release](https://img.shields.io/github/v/release/univrs/dol)](https://github.com/univrs/dol/releases/tag/v0.3.0)
[![Crates.io](https://img.shields.io/crates/v/dol)](https://crates.io/crates/dol/0.3.0)

### Quick Example

```dol
gene hello.world {
  message has content
  message has sender
  message has timestamp
}

exegesis {
  The hello.world gene defines a message entity with three
  essential properties: content, sender, and timestamp.
}
```

### Install

```bash
cargo install dol
```

---

## Tutorial Tracks

### DOL Fundamentals (Beginner, 2-3 hours)
Learn DOL from first principles:
- Hello DOL - First specification
- Values and Types - Type system
- Functions - Methods and standalone functions
- Control Flow - Conditionals, loops, pattern matching
- Collections - Lists, Maps, functional operations
- Traits and Constraints - Behaviors and invariants
- Error Handling - Option, Result
- Modules and Imports - Code organization

### DOL v0.3.0 Syntax (Beginner, 2-3 hours)
Master the declarative syntax:
- Genes and Types
- Defining Traits
- System Modules
- Constraints and Rules (`forall`, `exists`)
- Version Evolution
- Exegesis Documentation
- v0.3.0 New Features (HIR, `type`, `extends`, `val`/`var`)

### Spirit Development (Intermediate, 2-3 hours)
Build secure WebAssembly programs for VUDO:
- VUDO Platform Architecture
- Spirit Manifests (TOML)
- Capability-Based Security (14 capability types)
- Runtime Modules

### VUDO CLI (Beginner, 1.5 hours)
Master the command-line interface:
- Project Creation (`vudo new`)
- Build and Run
- Signing Spirits (Ed25519)
- Registry Operations (Imaginarium)

### Capstone: Lion & Swan (Advanced, 6-8 hours)
Build a complete Spirit from DOL to deployment:
- Define the Ontology
- Create Spirit Project
- Image Generation (AI APIs)
- Narrative Engine
- Credit Integration (Mycelial economics)
- Testing and Quality
- Sign and Publish

---

## DOL Language Features

| Feature | Description |
|---------|-------------|
| **Genes** | Define properties and data structures |
| **Traits** | Define behaviors and capabilities |
| **Constraints** | Enforce invariants with `forall`/`exists` |
| **Systems** | Compose genes, traits, and constraints |
| **Evolution** | Version and migrate specifications |
| **SEX** | Side Effect System for controlled mutability |
| **Generics** | Type parameters with bounds |
| **Pattern Matching** | Destructure and match data |
| **Pipes** | Function composition with `\|>` and `>>` |

### v0.3.0 Highlights

- **HIR** - High-level Intermediate Representation (22 canonical node types)
- **`val`/`var`** - Clear immutable vs mutable bindings
- **`type`** - Standard type declarations (alongside `gene`)
- **`extends`** - Replaces `derives from`
- **`forall`** - Unified quantifier (replaces `each`, `all`)

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Links

- **DOL Repository**: [github.com/univrs/dol](https://github.com/univrs/dol)
- **DOL on Crates.io**: [crates.io/crates/dol](https://crates.io/crates/dol)
- **API Documentation**: [docs.rs/dol](https://docs.rs/dol)
- **This Site**: [learn.univrs.io](https://learn.univrs.io)

---

## License

MIT
