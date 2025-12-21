import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Puzzle, Grid, Plus, FileText, ArrowRight } from 'lucide-react'

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

export default function SkillsIndex() {
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Puzzle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-univrs-text-primary">
                Skills Framework
              </h1>
            </div>
            <p className="text-xl text-univrs-text-secondary mb-8">
              Composable capabilities for AI agents and systems.
              Discover, use, and create modular capability modules.
            </p>
          </div>
        </div>
      </section>

      {/* What are Skills */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">What are Skills?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Composable', desc: 'Combine skills to create complex capabilities' },
              { name: 'Self-Describing', desc: 'SKILL.md provides complete documentation' },
              { name: 'AI-Ready', desc: 'Designed for use by AI agents and LLMs' },
              { name: 'Portable', desc: 'Works across different platforms and contexts' },
            ].map((feature) => (
              <div key={feature.name} className="card">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">{feature.name}</h3>
                <p className="text-sm text-univrs-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example SKILL.md */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Example SKILL.md</h2>
          <div className="bg-univrs-bg-secondary rounded-xl border border-white/5 overflow-hidden">
            <div className="px-4 py-2 bg-univrs-bg-tertiary border-b border-white/5 flex items-center gap-2">
              <span className="text-xs text-univrs-text-muted font-mono">SKILL.md</span>
            </div>
            <pre className="p-6 text-sm font-mono text-univrs-secondary-400 overflow-x-auto">
{`# Code Analysis Skill

## Metadata
- name: code-analysis
- version: 1.0.0
- author: univrs

## Capabilities
- static-analysis
- dependency-tracking
- complexity-metrics

## Requirements
- node >= 18.0.0
- llvm >= 15.0.0

## Usage
\`\`\`bash
skill invoke code-analysis --target ./src
\`\`\`

## API
### analyze(path: string): AnalysisReport
Analyzes the code at the given path and returns a report.`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="py-16 bg-univrs-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-univrs-text-primary mb-8">Explore Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.href}
                className="card group"
              >
                <section.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-univrs-text-primary mb-2 group-hover:text-purple-400 transition-colors">
                  {section.name}
                </h3>
                <p className="text-sm text-univrs-text-muted mb-4">{section.description}</p>
                <div className="flex items-center text-sm text-purple-400">
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
