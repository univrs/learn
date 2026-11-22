# Learn Univrs

[![Deploy to GitHub Pages](https://github.com/univrs/learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/univrs/learn/actions/workflows/deploy.yml)

**Documentation and tutorials for the Univrs ecosystem.**

**Live Site**: [learn.univrs.io](https://learn.univrs.io)

---

## DOL v0.8.2

The Design Ontology Language (DOL) is a specification-first language for ontology-driven development.

[![GitHub Release](https://img.shields.io/github/v/release/univrs/dol)](https://github.com/univrs/dol/releases/tag/v0.8.2)
[![Crates.io](https://img.shields.io/crates/v/dol)](https://crates.io/crates/dol/0.8.2)

### Quick Example

```dol
gen hello.world {
  message has content
  message has sender
  message has timestamp
}

docs {
  The hello.world gen defines a message entity with three
  essential properties: content, sender, and timestamp.
}
```

### Install

```bash
cargo install dol --features cli
```

### Status (v0.8.2)

- **Works:** parsing and validation of the v0.8 syntax (`gen`, `rule`, `evo`, `docs`); code generation to Rust, TypeScript and JSON Schema (quality varies); WASM compilation for a subset of the language, linking against the VUDO VM host ABI; LLVM native backend (beta, not in CI, manual LLVM 18 setup).
- **Not yet:** type enforcement, self-hosting, a language server (LSP), a formal language specification.
- **Known limitation:** `dol-parse` and `dol-check` only read the first declaration in a file.

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

### DOL Syntax (Beginner, 2-3 hours)
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
| **Rules** | Declare invariants with `rule` (formerly `constraint`) |
| **Systems** | Compose genes, traits, and rules |
| **Evolution** | Version and migrate specifications |
| **SEX** | Side Effect System for controlled mutability |
| **Generics** | Type parameters on `gen`/`trait` (parsed, not yet checked) |
| **Pattern Matching** | Destructure and match data |
| **Pipes** | Function composition with `\|>` and `>>` |

### v0.8.2 Highlights

- **VUDO VM host ABI** - bodiless `sex fun host_*` declarations import from module `vudo` with the VM linker's exact signatures (15 host functions)
- **Host call checking** - a `sex fun` the VM does not provide is a compile error
- **Real WASM output** - `compile_source` and the Spirit pipeline emit real WASM instead of a placeholder module
- **Strings to host functions** - string literals and `string` parameters lower to `(ptr, len)`
- **Tests** - 2,512 passing (`cli,serde,wasm`, including doctests) (root crate)

### Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| v0.5.0 | MLIR Dialect, HIR → MLIR, WASM Emission | ⚠️ MLIR experimental (stubs, not in CI) |
| v0.7.0 | Live Compiler, Browser Editor, Execution Simulation | ✅ Complete |
| v0.8.0 | MVS (gen, rule, Vec, docs), REPL Tutorials | ✅ Complete |
| v0.8.2 | VUDO VM host ABI (Spirit Hosting H0) | ✅ Current |
| v0.9.0 | Legacy syntax removal, Full Bootstrap | 🎯 Planned |

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
