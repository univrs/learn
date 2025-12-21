import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FileText, ChevronRight, Layers } from 'lucide-react'

export default function SkillsSpec() {
  return (
    <>
      <Helmet>
        <title>SKILL.md Specification | Univrs Learn</title>
        <meta name="description" content="Complete SKILL.md specification reference." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Specification</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10" style={{ color: 'var(--spore-purple)' }} />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              SKILL.md Specification
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Complete reference for the Claude Code Skills format.
          </p>
        </div>
      </section>

      {/* Progressive Disclosure */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-6 h-6" style={{ color: 'var(--spore-purple)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Progressive Disclosure</h2>
          </div>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Claude Code uses a 3-level system to scale to 100+ skills without context penalty:
          </p>
          <div className="space-y-4">
            <div className="card" style={{ borderLeft: '4px solid var(--glow-cyan)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--glow-cyan)' }}>Level 1: Metadata</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--glow-cyan-dim)', color: 'var(--glow-cyan)' }}>
                  ~200 chars/skill
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Name + Description loaded at startup. Enables autonomous skill matching.
              </p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--glow-gold)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--glow-gold)' }}>Level 2: Quick Start</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--glow-gold-dim)', color: 'var(--glow-gold)' }}>
                  ~2KB/skill
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                What + Prerequisites + Quick Start. Loaded when skill is selected.
              </p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--spore-purple)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color: 'var(--spore-purple)' }}>Level 3: Full Content</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(176, 136, 249, 0.2)', color: 'var(--spore-purple)' }}>
                  Unlimited
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Complete specification, examples, API reference. Loaded on demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Fields */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Required Fields</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Field</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Type</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Max Length</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-3 px-4"><code style={{ color: 'var(--spore-purple)' }}>name</code></td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>String</td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>64 chars</td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>Display name in UI</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-3 px-4"><code style={{ color: 'var(--spore-purple)' }}>description</code></td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>String</td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>1024 chars</td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>What + When for matching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Content Structure */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Recommended Content Structure</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`---
name: "Skill Name"
description: "What and when."
---

# Skill Name

## What This Skill Does
Brief overview.

## Prerequisites
- Requirement 1
- Requirement 2

## Quick Start
Basic usage example.

## Complete Specification
Detailed documentation.

## Examples
Real-world usage.

## Troubleshooting
Common issues.`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Best Practices</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Front-load keywords', desc: 'Put key trigger words at the start of description' },
              { title: 'Be specific about triggers', desc: 'Describe exactly when Claude should use this skill' },
              { title: 'Use progressive disclosure', desc: "Don't overwhelm with details upfront" },
              { title: 'Include examples', desc: 'Show real-world usage patterns' },
              { title: 'Keep it focused', desc: 'One skill, one purpose' },
              { title: 'Test discovery', desc: 'Verify Claude finds your skill when expected' },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--spore-purple)' }}>{item.title}</h4>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Complete Example</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`---
name: "API Documentation Generator"
description: "Generate OpenAPI 3.0 documentation from Express.js routes. Use when creating API docs, documenting endpoints, or building API specifications."
---

# API Documentation Generator

## What This Skill Does
Analyzes Express.js route files and generates OpenAPI 3.0 compliant documentation.

## Prerequisites
- Express.js project
- Route files using standard patterns

## Quick Start
\`\`\`bash
# In your Express.js project
claude "Generate API docs for routes/"
\`\`\`

## Supported Patterns
- app.get(), app.post(), etc.
- Router middleware
- Parameter validation

## Output Format
Generates openapi.yaml with paths, schemas, and examples.`}
            </pre>
          </div>
        </div>
      </section>
    </>
  )
}
