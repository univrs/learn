import { Routes, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Puzzle, Grid, Plus, FileText, ArrowRight } from 'lucide-react'
import SkillsCatalog from './Catalog'
import SkillsCreate from './Create'
import SkillsSpec from './Spec'

const sections = [
  {
    name: 'Skills Catalog',
    description: 'Browse and discover available skills',
    href: '/skills/catalog',
    icon: Grid,
  },
  {
    name: 'Create Skills',
    description: 'Learn how to create your own skills',
    href: '/skills/create',
    icon: Plus,
  },
  {
    name: 'SKILL.md Spec',
    description: 'Complete specification reference',
    href: '/skills/spec',
    icon: FileText,
  },
]

function SkillsOverview() {
  return (
    <>
      <Helmet>
        <title>Skills Framework | Univrs Learn</title>
        <meta name="description" content="Learn the Skills Framework - composable capabilities for AI agents and systems." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--spore-purple), rgba(176, 136, 249, 0.3))' }}
              >
                <Puzzle className="w-6 h-6" style={{ color: 'white' }} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
                Skills Framework
              </h1>
            </div>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Composable capabilities for AI agents and systems.
            </p>
          </div>
        </div>
      </section>

      {/* What are Skills */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>What are Skills?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Composable', desc: 'Combine skills to create complex capabilities' },
              { name: 'Self-Describing', desc: 'SKILL.md provides complete documentation' },
              { name: 'AI-Ready', desc: 'Designed for use by AI agents and LLMs' },
              { name: 'Portable', desc: 'Works across different platforms' },
            ].map((feature) => (
              <div key={feature.name} className="card">
                <h3 className="text-lg font-normal mb-2" style={{ color: 'var(--spore-purple)' }}>{feature.name}</h3>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example SKILL.md */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>Example SKILL.md</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>SKILL.md</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`---
name: "Code Analysis"
description: "Analyze code for quality and performance."
---

# Code Analysis

## What This Skill Does
Static analysis and metrics for your codebase.

## Quick Start
\`\`\`bash
claude "Analyze the src/ directory"
\`\`\``}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>Explore Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.href}
                className="card group"
              >
                <section.icon className="w-8 h-8 mb-4" style={{ color: 'var(--spore-purple)' }} />
                <h3 className="text-lg font-normal mb-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {section.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--soft-gray)' }}>{section.description}</p>
                <div className="flex items-center text-sm" style={{ color: 'var(--spore-purple)' }}>
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

export default function SkillsIndex() {
  return (
    <Routes>
      <Route index element={<SkillsOverview />} />
      <Route path="catalog" element={<SkillsCatalog />} />
      <Route path="create" element={<SkillsCreate />} />
      <Route path="spec" element={<SkillsSpec />} />
    </Routes>
  )
}
