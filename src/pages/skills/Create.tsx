import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Plus, ChevronRight, FolderOpen, CheckCircle } from 'lucide-react'

export default function SkillsCreate() {
  return (
    <>
      <Helmet>
        <title>Create Skills | Univrs Learn</title>
        <meta name="description" content="Learn how to create your own Claude Code Skills." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Create</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-10 h-10" style={{ color: 'var(--spore-purple)' }} />
            <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
              Create Skills
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Build custom skills for Claude Code.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Quick Start</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`# Create skill directory
mkdir -p ~/.claude/skills/my-skill

# Create SKILL.md
cat > ~/.claude/skills/my-skill/SKILL.md << 'EOF'
---
name: "My Skill"
description: "What this skill does and when to use it."
---

# My Skill

## What This Skill Does
[Your instructions here]
EOF`}
            </pre>
          </div>
        </div>
      </section>

      {/* Directory Structure */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Directory Structure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5" style={{ color: 'var(--spore-purple)' }} />
                <h3 className="font-normal" style={{ color: 'var(--text-primary)' }}>Minimal (Required)</h3>
              </div>
              <pre className="text-sm font-mono" style={{ color: 'var(--soft-gray)' }}>
{`~/.claude/skills/
└── my-skill/
    └── SKILL.md`}
              </pre>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5" style={{ color: 'var(--glow-cyan)' }} />
                <h3 className="font-normal" style={{ color: 'var(--text-primary)' }}>Full-Featured</h3>
              </div>
              <pre className="text-sm font-mono" style={{ color: 'var(--soft-gray)' }}>
{`~/.claude/skills/
└── my-skill/
    ├── SKILL.md
    ├── scripts/
    ├── resources/
    └── docs/`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* YAML Frontmatter */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>YAML Frontmatter</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Every SKILL.md must start with YAML frontmatter:
          </p>
          <div className="rounded-xl overflow-hidden mb-6" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`---
name: "Skill Name"         # Required, max 64 chars
description: "What this    # Required, max 1024 chars
skill does and when        # Include both WHAT and WHEN
Claude should use it."
---`}
            </pre>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-normal mb-2" style={{ color: 'var(--glow-cyan)' }}>name</h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>Max 64 characters</li>
                <li>Human-friendly display name</li>
                <li>Use Title Case</li>
              </ul>
            </div>
            <div className="card">
              <h4 className="font-normal mb-2" style={{ color: 'var(--glow-gold)' }}>description</h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--soft-gray)' }}>
                <li>Max 1024 characters</li>
                <li>Include WHAT it does</li>
                <li>Include WHEN to use it</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Skill Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card" style={{ borderLeft: '4px solid var(--spore-purple)' }}>
              <h3 className="font-normal mb-3" style={{ color: 'var(--spore-purple)' }}>Personal Skills</h3>
              <code className="text-sm block mb-3" style={{ color: 'var(--soft-gray)' }}>~/.claude/skills/</code>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>Available in all projects</li>
                <li>Not version controlled</li>
              </ul>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--glow-cyan)' }}>
              <h3 className="font-normal mb-3" style={{ color: 'var(--glow-cyan)' }}>Project Skills</h3>
              <code className="text-sm block mb-3" style={{ color: 'var(--soft-gray)' }}>.claude/skills/</code>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>Available only in this project</li>
                <li>Should be committed to git</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Validation Checklist</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'SKILL.md exists at top level',
              'YAML frontmatter is valid',
              'name is under 64 characters',
              'description includes what AND when',
              'Directory is not nested',
              'Content provides clear instructions',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--glow-cyan)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
