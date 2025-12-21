# MetaLearn Tools Inventory

## Current Assets Across Repos

This document maps existing tools to their role in the MetaLearn ecosystem.

---

## 1. llvm-translation-mcp

**Location**: `~/repos/llvm-translation-mcp`

**Purpose**: MCP server for LLVM-powered code translation and analysis

**Role in MetaLearn**: The compilation/translation layer

```
llvm-translation-mcp/
├── CLAUDE.md              # AI integration instructions
├── CLAUDE-COMMANDS.md     # Command reference for Claude
├── CLAUDEFLOW.md          # Multi-agent orchestration docs
├── COMPARISON.md          # Comparison with alternatives
├── QUICKSTART.md          # Getting started guide
│
├── src/                   # Core Rust implementation
├── crates/                # Modular functionality
├── claude-flow/           # Multi-agent coordination
├── coordination/          # Task coordination
├── memory/                # Persistent memory
│
├── examples/              # Usage examples
├── tests/                 # Test suite
├── docs/                  # Documentation
│
├── demo_client.py         # Python demo client
├── Cargo.toml             # Rust dependencies
└── package.json           # Node dependencies (for MCP)
```

### Key Capabilities

| Capability | Description | MetaLearn Role |
|------------|-------------|----------------|
| Code Translation | Convert between languages via LLVM IR | llvm.metalearn.org core |
| Static Analysis | Understand code structure | AI-assisted comprehension |
| MCP Server | Model Context Protocol interface | AI tool integration |
| Claude Flow | Multi-agent orchestration | Complex task coordination |

### Integration Points

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   LLVM-TRANSLATION-MCP ARCHITECTURE                     │
│                                                                         │
│  ┌─────────────────┐                                                   │
│  │   Claude/AI     │                                                   │
│  │   (Consumer)    │                                                   │
│  └────────┬────────┘                                                   │
│           │ MCP Protocol                                               │
│           ▼                                                             │
│  ┌─────────────────┐      ┌─────────────────┐                          │
│  │   MCP Server    │──────│  Claude Flow    │                          │
│  │   (Interface)   │      │  (Orchestrator) │                          │
│  └────────┬────────┘      └─────────────────┘                          │
│           │                                                             │
│           ▼                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    LLVM TOOLCHAIN                                │   │
│  │                                                                  │   │
│  │   Source → Frontend → IR → Optimizer → Backend → Target         │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### For llvm.metalearn.org

This repo becomes the foundation for:
- Interactive LLVM tutorials
- Translation service API
- AI-assisted code analysis
- Cross-language transformation examples

---

## 2. MyceliaNetwork/Skills

**Location**: `~/repos/MyceliaNetwork/Skills`

**Purpose**: Composable capability modules for AI agents and systems

**Role in MetaLearn**: The skills/capabilities layer

```
Skills/
├── CLAUDE.md                      # How Claude discovers/uses skills
│
├── CrossPlatformBridge/           # Platform abstraction skill
│   ├── SKILL.md                   # Skill specification
│   ├── src/                       # Implementation
│   └── ...
│
├── MathEngineIntegration/         # Numerical computation skill
│   ├── SKILL.md
│   └── ...
│
└── MyceliaNetworkNodeDeployer/    # P2P deployment skill
    ├── SKILL.md
    └── ...
```

### Skill Pattern

Each skill follows a consistent structure:

```
SkillName/
├── SKILL.md           # Contract: What this skill does
│                      # - Description
│                      # - Capabilities provided
│                      # - Dependencies required
│                      # - Usage examples
│
├── src/               # Implementation
│   └── ...
│
├── tests/             # Validation
│   └── ...
│
└── examples/          # How to use
    └── ...
```

### Existing Skills Analysis

#### CrossPlatformBridge
```
Purpose: Abstract platform differences (Windows, macOS, Linux)

Provides:
- Unified file system access
- Platform-agnostic paths
- Environment detection
- Native command execution

DOL Equivalent:
  system skill.cross_platform @ 0.1.0 {
    provides file_system.abstraction
    provides environment.detection
    provides command.execution
    
    supports platform.windows
    supports platform.macos
    supports platform.linux
  }
```

#### MathEngineIntegration
```
Purpose: Numerical computation capabilities

Provides:
- Matrix operations
- Statistical functions
- Linear algebra
- Scientific computing

DOL Equivalent:
  system skill.math_engine @ 0.1.0 {
    provides computation.matrix
    provides computation.statistics
    provides computation.linear_algebra
    
    requires hardware.fpu
  }
```

#### MyceliaNetworkNodeDeployer
```
Purpose: Deploy and manage P2P network nodes

Provides:
- Node initialization
- Network joining
- Peer discovery
- Health monitoring

DOL Equivalent:
  system skill.node_deployer @ 0.1.0 {
    requires skill.cross_platform
    requires network.p2p
    
    provides node.lifecycle
    provides network.membership
    provides health.monitoring
  }
```

### For skills.metalearn.org

This becomes the foundation for:
- Skill catalog
- Creation guidelines
- Composition patterns
- Discovery mechanism

---

## 3. metadol (DOL Language)

**Location**: `~/repos/metadol`

**Purpose**: Parser, validator, and tools for Design Ontology Language

**Role in MetaLearn**: The specification layer

```
metadol/
├── src/                   # Parser implementation
│   ├── lexer.rs           # Tokenization
│   ├── parser.rs          # AST construction
│   └── bin/               # CLI tools
│       ├── dol-parse.rs
│       ├── dol-check.rs
│       └── dol-test.rs
│
├── stdlib/                # Standard library (proposed)
│   ├── physics.dol
│   ├── primitives.dol
│   ├── transformations.dol
│   └── information.dol
│
├── examples/              # Learning examples
└── docs/                  # Language documentation
```

### For dol.metalearn.org

This becomes the foundation for:
- Language reference
- Interactive playground
- Standard library docs
- Tool installation

---

## 4. Integration Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    METALEARN TOOL INTEGRATION                           │
│                                                                         │
│                         ┌─────────────────┐                             │
│                         │   metalearn.org │                             │
│                         │   (Hub Site)    │                             │
│                         └────────┬────────┘                             │
│                                  │                                      │
│         ┌────────────────────────┼────────────────────────┐             │
│         │                        │                        │             │
│         ▼                        ▼                        ▼             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐       │
│  │    DOL      │         │    LLVM     │         │   Skills    │       │
│  │  metadol/   │         │ llvm-trans/ │         │ MyceliaNet/ │       │
│  └──────┬──────┘         └──────┬──────┘         └──────┬──────┘       │
│         │                       │                       │               │
│         │ "What it IS"          │ "How to compile"      │ "What it CAN" │
│         │                       │                       │               │
│         └───────────────────────┼───────────────────────┘               │
│                                 │                                       │
│                                 ▼                                       │
│                    ┌────────────────────────┐                           │
│                    │    UNIVRS PLATFORM     │                           │
│                    │                        │                           │
│                    │  RustOrchestration/    │                           │
│                    │  mycelial-dashboard/   │                           │
│                    │  univrs-identity/      │                           │
│                    │  univrs-state/         │                           │
│                    │                        │                           │
│                    └────────────────────────┘                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Cross-Tool Workflows

### Workflow A: Spec-Driven Development

```
1. Write DOL spec (metadol)
   ↓
2. Generate test stubs (dol-test)
   ↓
3. Implement in Rust
   ↓
4. Compile via LLVM (llvm-translation-mcp)
   ↓
5. Package as Skill (Skills framework)
   ↓
6. Deploy to Univrs
```

### Workflow B: AI-Assisted Translation

```
1. Existing code (any language)
   ↓
2. Analyze via MCP server (llvm-translation-mcp)
   ↓
3. Generate DOL spec from understanding (Claude + metadol)
   ↓
4. Translate to target language via LLVM
   ↓
5. Validate against DOL spec
```

### Workflow C: Skill Composition

```
1. Identify needed capability
   ↓
2. Search skill catalog (skills.metalearn.org)
   ↓
3. Compose existing skills
   ↓
4. Write integration DOL spec
   ↓
5. Implement glue code
   ↓
6. Test against combined spec
```

---

## 6. Repo Responsibility Matrix

| Repo | Creates | Consumes | Publishes To |
|------|---------|----------|--------------|
| metadol | DOL parser, stdlib | - | dol.metalearn.org |
| llvm-translation-mcp | Translation tools | DOL specs | llvm.metalearn.org |
| MyceliaNetwork/Skills | Skill definitions | DOL specs | skills.metalearn.org |
| RustOrchestration | Orchestrator | DOL, Skills | Univrs platform |
| mycelial-dashboard | P2P dashboard | DOL, Skills | Univrs platform |
| univrs-identity | Identity crate | DOL spec | All Univrs repos |
| univrs-state | Storage crate | DOL spec | All Univrs repos |

---

## 7. Action Items

### For dol.metalearn.org
- [ ] Extract stdlib from foundational docs
- [ ] Create example progression (01-hello through 05-systems)
- [ ] Document language grammar formally
- [ ] Plan browser playground

### For llvm.metalearn.org
- [ ] Document MCP server API
- [ ] Create translation tutorials
- [ ] Add more language examples
- [ ] Integration with DOL specs

### For skills.metalearn.org
- [ ] Formalize SKILL.md specification
- [ ] Create skill template generator
- [ ] Document composition patterns
- [ ] Build catalog infrastructure

### Cross-cutting
- [ ] Unified documentation style
- [ ] Cross-linking between sites
- [ ] Shared authentication (if needed)
- [ ] CI/CD for all sites
