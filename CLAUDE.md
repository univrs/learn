# CLAUDE.md - learn.univrs.io

## Project Overview

**learn.univrs.io** is the documentation and tools portal for the Univrs meta-tools ecosystem.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         learn.univrs.io                                 │
│                                                                         │
│              "Tools that build tools that build systems"                │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │                 │  │                 │  │                 │         │
│  │  /dol           │  │  /llvm          │  │  /skills        │         │
│  │                 │  │                 │  │                 │         │
│  │  Design         │  │  Compilation    │  │  Composable     │         │
│  │  Ontology       │  │  & Translation  │  │  Capabilities   │         │
│  │  Language       │  │  Tools          │  │                 │         │
│  │                 │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Design Requirements

### Visual Identity
- **Must match**: univrs.io and univrs-network dashboard aesthetics
- **Framework**: React + Tailwind CSS
- **Style**: Modern, clean, developer-focused
- **Colors**: Follow Univrs brand palette
- **Typography**: Consistent with ecosystem

### Architecture
- **Static Site**: Built for GitHub Pages / static hosting
- **Build Tool**: Vite or Next.js static export
- **Content**: MDX for documentation with code examples
- **Navigation**: Three main sections (DOL, LLVM, Skills)

## Site Structure

```
learn.univrs.io/
├── /                     # Landing page - What are Univrs Meta-Tools?
├── /dol/                 # Design Ontology Language
│   ├── /                 # DOL overview
│   ├── /learn/           # Interactive tutorials
│   ├── /reference/       # Language specification
│   ├── /stdlib/          # Standard library docs
│   ├── /examples/        # Real-world examples
│   └── /playground/      # Try DOL in browser (future)
│
├── /llvm/                # LLVM Translation Tools
│   ├── /                 # LLVM tools overview
│   ├── /learn/           # Tutorials
│   ├── /tools/           # Tool documentation
│   └── /examples/        # Translation examples
│
├── /skills/              # Skills Framework
│   ├── /                 # Skills overview
│   ├── /catalog/         # Browse available skills
│   ├── /create/          # How to create skills
│   └── /spec/            # SKILL.md specification
│
└── /about/               # About Univrs meta-tools
```

## Content Sources

### DOL Content
- Source: `~/repos/metadol/`
- stdlib: `metadol/stdlib/*.md`
- examples: `metadol/examples/*.dol`
- Language spec: `metadol/docs/`

### LLVM Content
- Source: `~/repos/llvm-translation-mcp/`
- Docs: `llvm-translation-mcp/docs/`
- Examples: `llvm-translation-mcp/examples/`

### Skills Content
- Source: `~/repos/univrs-skills/`
- Skill specs: `univrs-skills/*/SKILL.md`
- Framework: `univrs-skills/SKILL-SPEC.md`

## Component Library

### From univrs-network Dashboard
Reference these components for consistent styling:
- Navigation (header, sidebar)
- Cards and panels
- Code blocks with syntax highlighting
- Buttons and interactive elements
- Typography scales
- Color palette

### Required Components
1. **Hero Section**: Landing page hero with tagline
2. **Feature Cards**: Three pillars (DOL, LLVM, Skills)
3. **Documentation Layout**: Sidebar nav + content + TOC
4. **Code Blocks**: Syntax highlighting for DOL, Rust, TypeScript
5. **Interactive Examples**: Runnable code snippets
6. **Search**: Documentation search (Algolia or local)

## Technical Stack

```
Framework:     React 18+ with TypeScript
Styling:       Tailwind CSS (matching univrs.io)
Build:         Vite (static build)
Content:       MDX for rich documentation
Syntax:        Shiki or Prism for code highlighting
Icons:         Lucide React (matching dashboard)
Deployment:    GitHub Pages (static)
```

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## File Organization

```
learn/
├── public/
│   ├── favicon.ico
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DocLayout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── ...
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       └── ...
│   │
│   ├── pages/
│   │   ├── index.tsx           # Landing
│   │   ├── dol/
│   │   ├── llvm/
│   │   └── skills/
│   │
│   ├── content/
│   │   ├── dol/                # MDX content
│   │   ├── llvm/
│   │   └── skills/
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── lib/
│       └── utils.ts
│
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Implemented Design System (Matching univrs.io)

### CSS Variables - Theme System
The site uses CSS variables that automatically switch between dark and light modes via `data-theme` attribute on `<html>`.

```css
/* Dark Theme (default) - Forest Depths Palette */
:root {
  --void: #0a0d0b;           /* Deepest background */
  --deep-earth: #0f1411;     /* Secondary background */
  --forest-floor: #141a16;   /* Card backgrounds */
  --moss: #1a221d;           /* Elevated surfaces */
  --bark: #232d27;           /* Borders, scrollbar */

  /* Bioluminescent Accents */
  --glow-cyan: #00ffd5;      /* Primary accent */
  --glow-cyan-dim: #00ffd540;
  --glow-gold: #ffd700;      /* Secondary accent */
  --spore-purple: #b088f9;   /* Tertiary accent */
  --mycelium-white: #e8f4ec; /* Primary text */
  --soft-gray: #8a9a8f;      /* Muted text */

  /* Semantic */
  --text-primary: var(--mycelium-white);
  --text-secondary: var(--soft-gray);
  --bg-primary: var(--void);
  --bg-secondary: var(--deep-earth);
  --bg-card: var(--forest-floor);
  --border-subtle: #2a3a30;
}

/* Light Theme - Inverted */
[data-theme="light"] {
  --void: #f8faf9;
  --deep-earth: #f0f4f2;
  --forest-floor: #e8eeeb;
  --glow-cyan: #008b75;      /* Darker cyan for light bg */
  --mycelium-white: #1a221d; /* Dark text on light */
  --border-subtle: #c8d4cd;
}
```

### Animated Backgrounds
1. **body::before** - Pulsing gradient overlay with cyan, gold, purple radial gradients
2. **MyceliumCanvas** - React component (`src/components/ui/MyceliumCanvas.tsx`) that renders animated network nodes connecting like mycelium

### Component Classes
```css
.card          /* Card with hover glow effect */
.btn-primary   /* Cyan gradient button with glow */
.btn-secondary /* Outline button */
.gradient-text /* Cyan-gold-purple text gradient */
```

### Theme Toggle
- Uses `data-theme="dark"` or `data-theme="light"` on `<html>`
- Emoji toggle button (☀️/🌙) in header
- Persisted to localStorage
- System preference detection on first load

## Key Messages

### Landing Page
> **Univrs Learn**
> Creating tools of self-aware systems.
>
> The Univrs meta-tools ecosystem provides the foundation for
> specification-driven development, intelligent compilation,
> and composable capabilities.

### DOL Section
> **Design Ontology Language**
> A specification language for systems that know what they should be.
>
> Write specs first. Generate tests. Implement with confidence.

### LLVM Section
> **LLVM Translation Tools**
> Bridge high-level intent to low-level execution.
>
> Analyze, translate, and optimize code across languages and platforms.

### Skills Section
> **Skills Framework**
> Composable capabilities for AI agents and systems.
>
> Discover, use, and create modular capability modules.

## Integration Points

### With univrs.io
- Link back to main site
- Consistent header/footer
- Shared brand assets

### With univrs-network
- Dashboard styling reference
- Component patterns
- Color palette

### With GitHub Repos
- Link to source code
- "Edit on GitHub" buttons
- Version badges

## Success Metrics

1. **Visual Consistency**: Matches univrs.io look and feel
2. **Content Complete**: All three sections populated
3. **Developer Experience**: Easy to navigate, find info
4. **Mobile Responsive**: Works on all devices
5. **Fast Loading**: Static, optimized assets
6. **Maintainable**: Easy to add/update content

## Notes for Claude

- Always check univrs.io for current styling before making decisions
- Use the univrs-network dashboard components as reference
- Keep documentation focused and practical
- Include working code examples
- Make navigation intuitive for developers
- Optimize for both learning and reference use cases
