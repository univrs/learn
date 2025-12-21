import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Grid, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'

const skills = [
  { name: 'Skill Builder', category: 'Core', description: 'Create new Claude Code Skills' },
  { name: 'Pair Programming', category: 'Collaboration', description: 'AI-assisted pair programming modes' },
  { name: 'GitHub Code Review', category: 'GitHub', description: 'Automated code review with agents' },
  { name: 'GitHub Workflow', category: 'GitHub', description: 'Workflow orchestration' },
  { name: 'GitHub Release', category: 'GitHub', description: 'Release automation' },
  { name: 'Swarm Orchestration', category: 'Advanced', description: 'Multi-agent coordination' },
  { name: 'Performance Analysis', category: 'Analysis', description: 'Performance profiling tools' },
  { name: 'AgentDB Vector Search', category: 'Database', description: 'Vector search capabilities' },
  { name: 'AgentDB Memory', category: 'Database', description: 'Memory management patterns' },
  { name: 'Flow Nexus', category: 'Advanced', description: 'Neural network integration' },
  { name: 'Stream Chain', category: 'Data', description: 'Data stream processing' },
  { name: 'Hooks Automation', category: 'Core', description: 'Automation hooks' },
]

const categories = ['All', 'Core', 'GitHub', 'Database', 'Advanced', 'Collaboration', 'Analysis', 'Data']

export default function SkillsCatalog() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = skills.filter(skill => {
    const matchesCategory = filter === 'All' || skill.category === filter
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase()) ||
                          skill.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Skills Catalog | Univrs Learn</title>
        <meta name="description" content="Browse available Claude Code Skills." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Catalog</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Grid className="w-10 h-10" style={{ color: 'var(--spore-purple)' }} />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Skills Catalog
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Browse and discover available skills.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft-gray)' }} />
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: filter === cat ? 'var(--spore-purple)' : 'var(--bg-tertiary)',
                    color: filter === cat ? 'white' : 'var(--soft-gray)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((skill) => (
              <div key={skill.name} className="card group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold group-hover:text-purple-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {skill.name}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: 'rgba(176, 136, 249, 0.2)', color: 'var(--spore-purple)' }}
                  >
                    {skill.category}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-12" style={{ color: 'var(--soft-gray)' }}>
              No skills match your search.
            </p>
          )}
        </div>
      </section>

      {/* Skill Count */}
      <section className="py-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: 'var(--soft-gray)' }}>
            Showing {filtered.length} of {skills.length} skills
          </p>
        </div>
      </section>
    </>
  )
}
