# learn.univrs.io Site Map & Content Plan

## Vision

> **"Tools that build tools that build self-aware systems"**

learn.univrs.io is the unified learning and documentation portal for the Univrs meta-tools ecosystem. It serves developers who want to build specification-driven, self-healing systems.

---

## Site Architecture

```
learn.univrs.io/
│
├── /                           ← LANDING PAGE
│   ├── Hero Section            "Univrs Learn - Meta-Tools for Self-Aware Systems"
│   ├── Three Pillars           DOL | LLVM | Skills
│   ├── Philosophy              "Specification-First Development"
│   ├── Ecosystem               Connected tools visualization
│   └── Get Started             Quick start guide
│
├── /dol/                       ← DESIGN ONTOLOGY LANGUAGE
│   ├── index                   What is DOL?
│   ├── /learn/                 Tutorials
│   │   ├── introduction        What is DOL?
│   │   ├── genes               Defining properties
│   │   ├── traits              Defining behaviors
│   │   ├── constraints         Defining rules
│   │   └── systems             Composing everything
│   ├── /reference/             Language specification
│   │   ├── syntax              Grammar
│   │   ├── keywords            Reserved words
│   │   └── types               Type system
│   ├── /stdlib/                Standard library
│   │   ├── physics             Physical laws
│   │   ├── primitives          Type primitives
│   │   ├── transformations     State transitions
│   │   └── information         Information theory
│   └── /examples/              Real-world examples
│       ├── orchestrator        RustOrchestration ontology
│       └── p2p                 Mycelial network ontology
│
├── /llvm/                      ← LLVM TRANSLATION TOOLS
│   ├── index                   What are LLVM tools?
│   ├── /learn/                 Tutorials
│   │   ├── ir                  Understanding LLVM IR
│   │   ├── translation         Language-to-language
│   │   └── optimization        Performance tuning
│   ├── /tools/                 Tool documentation
│   │   ├── mcp-server          MCP server
│   │   └── claude-flow         Multi-agent orchestration
│   └── /examples/              Translation examples
│
├── /skills/                    ← SKILLS FRAMEWORK
│   ├── index                   What are Skills?
│   ├── /catalog/               Browse skills
│   │   ├── cross-platform      CrossPlatformBridge
│   │   ├── math-engine         MathEngineIntegration
│   │   └── node-deployer       MyceliaNetworkNodeDeployer
│   ├── /create/                Creating skills
│   │   ├── structure           Directory structure
│   │   ├── skill-md            Writing SKILL.md
│   │   ├── testing             Testing skills
│   │   └── publishing          Sharing skills
│   └── /spec/                  SKILL.md specification
│
└── /about/                     ← ABOUT
    ├── philosophy              Why we build this way
    ├── roadmap                 What's coming
    └── contributing            How to contribute
```

---

## Content Sources

### DOL Content
| Page | Source |
|------|--------|
| Philosophy | `metadol/stdlib/philosophy.md` |
| Primitives | `metadol/stdlib/primitives.md` |
| Transformations | `metadol/stdlib/transformations.md` |
| Information | `metadol/stdlib/information.md` |
| Examples | `metadol/examples/**/*.dol` |
| RustOrch Examples | `RustOrchestration/ontology/**/*.dol` |
| P2P Examples | `univrs-network/ontology/**/*.dol` |

### LLVM Content
| Page | Source |
|------|--------|
| Overview | `llvm-translation-mcp/README.md` |
| MCP Server | `llvm-translation-mcp/docs/` |
| Claude Flow | `llvm-translation-mcp/CLAUDEFLOW.md` |
| Examples | `llvm-translation-mcp/examples/` |

### Skills Content
| Page | Source |
|------|--------|
| Specification | `univrs-skills/SKILL-SPEC.md` |
| CrossPlatform | `univrs-skills/CrossPlatformBridge/SKILL.md` |
| MathEngine | `univrs-skills/MathEngineIntegration/SKILL.md` |
| NodeDeployer | `univrs-skills/MyceliaNetworkNodeDeployer/SKILL.md` |

---

## Design Tokens

### Colors (from Univrs brand)
```css
/* Primary - Purple/Violet */
--primary-500: #8b5cf6;
--primary-600: #7c3aed;
--primary-700: #6d28d9;

/* Secondary - Teal/Cyan */
--secondary-400: #22d3ee;
--secondary-500: #06b6d4;
--secondary-600: #0891b2;

/* Backgrounds (dark mode) */
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-elevated: #22222e;

/* Text */
--text-primary: #f8fafc;
--text-secondary: #94a3b8;
```

### Typography
```css
/* Headings */
font-family: 'Inter', sans-serif;

/* Code */
font-family: 'JetBrains Mono', monospace;

/* Scale */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

---

## Key Pages

### Landing Page
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Univrs Learn                    DOL  LLVM  Skills  GitHub     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              Tools that build tools that                                │
│              build self-aware systems                                   │
│                                                                         │
│        The Univrs meta-tools ecosystem provides the                     │
│        foundation for specification-driven development.                 │
│                                                                         │
│              [Get Started]  [View on GitHub]                            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │
│   │     DOL     │    │    LLVM     │    │   Skills    │                │
│   │             │    │             │    │             │                │
│   │ Design      │    │ Translation │    │ Composable  │                │
│   │ Ontology    │    │ Tools       │    │ Capabilities│                │
│   │ Language    │    │             │    │             │                │
│   └─────────────┘    └─────────────┘    └─────────────┘                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                     Specification-First Development                     │
│   Write specs → Generate tests → Implement with confidence              │
├─────────────────────────────────────────────────────────────────────────┤
│                           The Ecosystem                                 │
│   metadol → RustOrchestration → univrs-network → univrs-skills         │
└─────────────────────────────────────────────────────────────────────────┘
```

### DOL Section Overview
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [←]  DOL                               Learn  Reference  Stdlib       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Design Ontology Language                                               │
│                                                                         │
│  A specification language for systems that know what they should be.   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  system scheduler @ 0.1.0 {                                             │
│    requires resources >= 0.1.0                                          │
│    requires filtering >= 0.1.0                                          │
│                                                                         │
│    provides workload_scheduling                                         │
│    provides node_selection                                              │
│  }                                                                      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Key Concepts                                                           │
│                                                                         │
│  ● Genes      Properties that define what something IS                 │
│  ● Traits     Behaviors that define what something DOES                │
│  ● Constraints Rules that must always hold                             │
│  ● Systems    Compositions of genes, traits, constraints               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## GitHub Integration

### Repository Links
- DOL Tools: github.com/univrs/metadol
- LLVM Tools: github.com/univrs/llvm-translation-mcp
- Skills: github.com/univrs/skills
- Network: github.com/univrs/network

### Edit on GitHub
Every documentation page should have "Edit on GitHub" link pointing to source.

---

## Deployment

### GitHub Pages
- Repository: github.com/univrs/learn
- Branch: gh-pages (built artifacts)
- Domain: learn.univrs.io (CNAME)

### Build Process
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Success Criteria

1. ✅ Visual consistency with univrs.io
2. ✅ All three sections (DOL, LLVM, Skills) populated
3. ✅ Working code examples with syntax highlighting
4. ✅ Mobile responsive design
5. ✅ Fast loading (< 3s first paint)
6. ✅ SEO optimized
7. ✅ Accessible (WCAG 2.1 AA)
8. ✅ Search functionality
9. ✅ Easy to maintain and update
