# CLAUDEFLOW.md - learn.univrs.io Hive-Mind Tasks

## Project Initialization

```bash
# Clone the repo and set up workspace
cd ~/repos
git clone git@github.com:univrs/learn.git learn-univrs-io
cd learn-univrs-io
```

---

## PHASE 1: Project Foundation

### Task 1.1: Initialize React + Vite + Tailwind Project

```
Create a React + TypeScript + Vite project with Tailwind CSS:

1. Initialize Vite project:
   npm create vite@latest . -- --template react-ts
   
2. Install dependencies:
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npm install react-router-dom @types/react-router-dom
   npm install lucide-react
   npm install clsx tailwind-merge
   npm install -D @tailwindcss/typography
   
3. Initialize Tailwind:
   npx tailwindcss init -p
   
4. Configure tailwind.config.js with Univrs brand colors:
   - Primary: Deep purple/violet tones
   - Secondary: Teal/cyan accents
   - Background: Dark mode default
   - Match univrs.io color scheme
   
5. Set up src/styles/globals.css with Tailwind directives

6. Create src/lib/utils.ts with cn() helper for class merging

7. Verify dev server runs: npm run dev

DELIVERABLES: Working React app with Tailwind styling
```

### Task 1.2: Fetch Univrs.io Styling Reference

```
Analyze univrs.io for design system extraction:

1. Visit https://univrs.io and document:
   - Color palette (exact hex values)
   - Typography (fonts, sizes, weights)
   - Spacing scale
   - Border radius patterns
   - Shadow styles
   - Animation patterns
   
2. Visit univrs-network dashboard (if accessible) for component patterns

3. Create src/styles/theme.ts with:
   - Color constants
   - Typography scale
   - Spacing tokens
   - Component variants
   
4. Update tailwind.config.js with extracted theme

DELIVERABLES: Theme configuration matching Univrs brand
```

### Task 1.3: Create Base Layout Components

```
Build the core layout structure:

1. src/components/layout/Header.tsx
   - Logo (Univrs Learn)
   - Navigation: DOL | LLVM | Skills | About
   - GitHub link
   - Mobile responsive hamburger menu
   
2. src/components/layout/Footer.tsx
   - Links to univrs.io
   - GitHub repos
   - Copyright
   
3. src/components/layout/Sidebar.tsx
   - Collapsible navigation
   - Section headers
   - Active state highlighting
   
4. src/components/layout/DocLayout.tsx
   - Sidebar + Content + TOC layout
   - Responsive (sidebar collapses on mobile)
   - Breadcrumb navigation
   
5. src/components/layout/PageLayout.tsx
   - Header + Content + Footer wrapper
   
6. Set up React Router in src/App.tsx with routes

DELIVERABLES: Working layout with navigation between pages
```

---

## PHASE 2: UI Components

### Task 2.1: Core UI Components

```
Build reusable UI components:

1. src/components/ui/Button.tsx
   - Variants: primary, secondary, outline, ghost
   - Sizes: sm, md, lg
   - Icons support
   
2. src/components/ui/Card.tsx
   - Title, description, icon
   - Hover effects
   - Link variant
   
3. src/components/ui/Badge.tsx
   - Status indicators
   - Version badges
   
4. src/components/ui/Tabs.tsx
   - Tab navigation
   - Content panels
   
5. src/components/ui/Accordion.tsx
   - Expandable sections
   - FAQ style

All components should use Tailwind and match Univrs styling.

DELIVERABLES: Component library in src/components/ui/
```

### Task 2.2: Code Display Components

```
Build code-related components:

1. Install syntax highlighting:
   npm install shiki
   npm install @shikijs/transformers
   
2. src/components/code/CodeBlock.tsx
   - Syntax highlighting for: dol, rust, typescript, bash
   - Line numbers
   - Copy button
   - File name header
   - Line highlighting
   
3. src/components/code/InlineCode.tsx
   - Inline code styling
   
4. src/components/code/Terminal.tsx
   - Terminal-style output display
   - Command prefix
   
5. Create custom DOL language definition for Shiki
   - Keywords: system, gene, trait, constraint, exegesis
   - Highlighting rules

DELIVERABLES: Code components with DOL syntax support
```

### Task 2.3: Documentation Components

```
Build documentation-specific components:

1. src/components/docs/Callout.tsx
   - Types: info, warning, tip, danger
   - Icon + styled box
   
2. src/components/docs/ApiReference.tsx
   - Function signature display
   - Parameter table
   - Return type
   
3. src/components/docs/TableOfContents.tsx
   - Auto-generated from headings
   - Scroll spy highlighting
   - Sticky positioning
   
4. src/components/docs/PrevNext.tsx
   - Previous/Next navigation
   - Section context
   
5. src/components/docs/EditOnGitHub.tsx
   - Link to source file on GitHub

DELIVERABLES: Documentation components ready for content
```

---

## PHASE 3: Landing Page

### Task 3.1: Hero Section

```
Build the landing page hero:

1. src/components/sections/Hero.tsx
   - Main headline: "Univrs Learn"
   - Tagline: "Tools that build tools that build self-aware systems"
   - Subtext explaining meta-tools
   - CTA buttons: Get Started, View on GitHub
   - Animated background (subtle, matches univrs.io style)
   
2. Responsive design:
   - Desktop: Full-width hero
   - Mobile: Stacked layout
   
3. Add to src/pages/index.tsx

DELIVERABLES: Landing page hero section
```

### Task 3.2: Three Pillars Section

```
Build the feature cards for DOL, LLVM, Skills:

1. src/components/sections/Pillars.tsx
   - Three feature cards in grid
   - Each card has:
     - Icon (from Lucide)
     - Title
     - Description
     - Link to section
     
2. DOL Card:
   - Icon: FileCode or Braces
   - Title: "Design Ontology Language"
   - Description: "A specification language for systems that know what they should be"
   - Link: /dol
   
3. LLVM Card:
   - Icon: Cpu or Layers
   - Title: "LLVM Translation Tools"
   - Description: "Bridge high-level intent to low-level execution"
   - Link: /llvm
   
4. Skills Card:
   - Icon: Puzzle or Boxes
   - Title: "Skills Framework"
   - Description: "Composable capabilities for AI agents and systems"
   - Link: /skills

DELIVERABLES: Three pillars section on landing page
```

### Task 3.3: Additional Landing Sections

```
Build remaining landing page sections:

1. src/components/sections/Philosophy.tsx
   - "Specification-First Development"
   - Explain the meta-tools philosophy
   - Visual diagram of flow
   
2. src/components/sections/Ecosystem.tsx
   - Show how tools connect
   - Links to repos:
     - metadol
     - llvm-translation-mcp
     - univrs-skills
     - univrs-network
     - RustOrchestration
     
3. src/components/sections/GetStarted.tsx
   - Quick start steps
   - Installation commands
   - Links to tutorials
   
4. Assemble in src/pages/index.tsx

DELIVERABLES: Complete landing page
```

---

## PHASE 4: DOL Section

### Task 4.1: DOL Overview Page

```
Build the DOL section landing:

1. src/pages/dol/index.tsx
   - Hero: What is DOL?
   - Key concepts: Genes, Traits, Constraints, Systems
   - Quick example code block
   - Links to subsections
   
2. Content from ~/repos/metadol/stdlib/philosophy.md
   - Adapt for web
   - Add interactive elements

DELIVERABLES: /dol page complete
```

### Task 4.2: DOL Learn Section

```
Build interactive DOL tutorials:

1. src/pages/dol/learn/index.tsx
   - Tutorial overview
   - Progressive learning path
   
2. Tutorials (src/pages/dol/learn/):
   - 01-introduction.tsx: What is DOL?
   - 02-genes.tsx: Defining properties
   - 03-traits.tsx: Defining behaviors
   - 04-constraints.tsx: Defining rules
   - 05-systems.tsx: Composing everything
   
3. Each tutorial has:
   - Explanation text
   - Code examples
   - "Try it" exercises

DELIVERABLES: /dol/learn section with tutorials
```

### Task 4.3: DOL Reference Section

```
Build DOL language reference:

1. src/pages/dol/reference/index.tsx
   - Language overview
   - Links to subsections
   
2. Reference pages:
   - syntax.tsx: Grammar and syntax
   - keywords.tsx: Reserved words
   - types.tsx: Type system
   - operators.tsx: Operators
   
3. Content from metadol/docs/SPEC.md

DELIVERABLES: /dol/reference section
```

### Task 4.4: DOL Stdlib Section

```
Document the DOL standard library:

1. src/pages/dol/stdlib/index.tsx
   - Stdlib overview
   - Module listing
   
2. Pages for each stdlib module:
   - physics.tsx: Physical laws and constraints
   - primitives.tsx: Type primitives
   - transformations.tsx: State transitions
   - information.tsx: Information theory
   
3. Content from ~/repos/metadol/stdlib/*.md

DELIVERABLES: /dol/stdlib section
```

---

## PHASE 5: LLVM Section

### Task 5.1: LLVM Overview Page

```
Build the LLVM section landing:

1. src/pages/llvm/index.tsx
   - Hero: LLVM Translation Tools
   - What problems it solves
   - Key capabilities
   - Quick example
   
2. Links to:
   - Tutorials
   - Tool documentation
   - Examples

DELIVERABLES: /llvm page complete
```

### Task 5.2: LLVM Tools Documentation

```
Document the LLVM tools:

1. src/pages/llvm/tools/index.tsx
   - Tool overview
   
2. Tool pages:
   - mcp-server.tsx: MCP server documentation
   - claude-flow.tsx: Multi-agent orchestration
   - translation.tsx: Language translation
   
3. Content from ~/repos/llvm-translation-mcp/docs/

DELIVERABLES: /llvm/tools section
```

### Task 5.3: LLVM Examples

```
Build LLVM examples section:

1. src/pages/llvm/examples/index.tsx
   - Examples gallery
   
2. Example pages with runnable code:
   - Basic translation
   - Cross-language analysis
   - Optimization pipelines
   
3. Content from ~/repos/llvm-translation-mcp/examples/

DELIVERABLES: /llvm/examples section
```

---

## PHASE 6: Skills Section

### Task 6.1: Skills Overview Page

```
Build the Skills section landing:

1. src/pages/skills/index.tsx
   - Hero: Skills Framework
   - What are skills?
   - Key benefits
   - Quick example SKILL.md
   
2. Links to:
   - Catalog
   - Creating skills
   - Specification

DELIVERABLES: /skills page complete
```

### Task 6.2: Skills Catalog

```
Build skills catalog/browser:

1. src/pages/skills/catalog/index.tsx
   - Grid of skill cards
   - Filter by capability
   - Search
   
2. Individual skill pages:
   - cross-platform-bridge.tsx
   - math-engine-integration.tsx
   - mycelia-network-deployer.tsx
   
3. Content from ~/repos/univrs-skills/*/SKILL.md

DELIVERABLES: /skills/catalog section
```

### Task 6.3: Skills Creation Guide

```
Build skill creation documentation:

1. src/pages/skills/create/index.tsx
   - How to create a skill
   
2. Guide pages:
   - structure.tsx: Directory structure
   - skill-md.tsx: Writing SKILL.md
   - testing.tsx: Testing skills
   - publishing.tsx: Sharing skills
   
3. Content from SKILL-SPEC.md

DELIVERABLES: /skills/create section
```

### Task 6.4: Skills Specification

```
Document the SKILL.md specification:

1. src/pages/skills/spec/index.tsx
   - Full SKILL.md spec
   - Required fields
   - Optional fields
   - Examples
   - Capability taxonomy

DELIVERABLES: /skills/spec section
```

---

## PHASE 7: Polish & Deploy

### Task 7.1: SEO & Meta Tags

```
Add SEO optimization:

1. Install react-helmet-async
   npm install react-helmet-async
   
2. Create src/components/SEO.tsx
   - Title templates
   - Meta descriptions
   - Open Graph tags
   - Twitter cards
   
3. Add to all pages

DELIVERABLES: SEO configured for all pages
```

### Task 7.2: Search Functionality

```
Add documentation search:

1. Install search library:
   npm install flexsearch
   
2. Create search index at build time
   - Index all page content
   - Index code examples
   
3. src/components/Search.tsx
   - Search modal (Cmd+K)
   - Result highlighting
   - Quick navigation
   
4. Add to Header

DELIVERABLES: Working search across all docs
```

### Task 7.3: Build & Deploy Configuration

```
Configure for GitHub Pages deployment:

1. Update vite.config.ts:
   - Set base path if needed
   - Configure build output
   
2. Create GitHub Actions workflow:
   .github/workflows/deploy.yml
   - Build on push to main
   - Deploy to GitHub Pages
   
3. Add deploy script to package.json

4. Test build:
   npm run build
   npm run preview

DELIVERABLES: Automated deployment pipeline
```

### Task 7.4: Final Testing & QA

```
Comprehensive testing:

1. Test all pages load correctly
2. Test all links work
3. Test responsive design on mobile
4. Test code highlighting
5. Test navigation
6. Lighthouse audit for performance
7. Accessibility check (a11y)

Fix any issues found.

DELIVERABLES: Production-ready site
```

---

## Execution Order

```
RECOMMENDED SEQUENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase 1: Foundation     (Tasks 1.1 → 1.3)    ~2 hours
Phase 2: Components     (Tasks 2.1 → 2.3)    ~2 hours
Phase 3: Landing        (Tasks 3.1 → 3.3)    ~1 hour
Phase 4: DOL           (Tasks 4.1 → 4.4)    ~3 hours
Phase 5: LLVM          (Tasks 5.1 → 5.3)    ~2 hours
Phase 6: Skills        (Tasks 6.1 → 6.4)    ~2 hours
Phase 7: Polish        (Tasks 7.1 → 7.4)    ~2 hours

TOTAL: ~14 hours of development time
```

---

## Hive-Mind Wizard Command

```bash
# Start hive-mind wizard for learn.univrs.io
cd ~/repos/learn-univrs-io

npx claude-flow@alpha hive-mind wizard \
  --project "learn.univrs.io" \
  --objectives "
    1. Build static React site matching univrs.io styling
    2. Create DOL documentation section with tutorials and reference
    3. Create LLVM tools documentation section
    4. Create Skills framework documentation and catalog
    5. Deploy to GitHub Pages at learn.univrs.io
  " \
  --context "CLAUDE.md" \
  --tasks "CLAUDEFLOW.md"
```
