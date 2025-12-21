import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Code2, ChevronRight } from 'lucide-react'

export default function LLVMExamples() {
  return (
    <>
      <Helmet>
        <title>LLVM Examples | Univrs Learn</title>
        <meta name="description" content="Real-world code translation examples: Julia to Zig and Rust." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--soft-gray)' }}>
            <Link to="/llvm" className="hover:text-univrs-secondary-400 transition-colors">LLVM</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--text-primary)' }}>Examples</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-10 h-10" style={{ color: 'var(--glow-gold)' }} />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Translation Examples
            </h1>
          </div>
          <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            See LLVM translation in action with a momentum optimizer.
          </p>
        </div>
      </section>

      {/* Julia Source */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Julia Source</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>optimizer.jl</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--spore-purple)' }}>
{`mutable struct MomentumOptimizer
    learning_rate::Float64
    momentum::Float64
    velocity::Vector{Float64}
end

function update!(opt::MomentumOptimizer, params, grads)
    for i in eachindex(params)
        opt.velocity[i] = opt.momentum * opt.velocity[i] -
                          opt.learning_rate * grads[i]
        params[i] += opt.velocity[i]
    end
end`}
            </pre>
          </div>
        </div>
      </section>

      {/* Zig Translation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Zig Translation</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>optimizer.zig</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-gold)' }}>
{`const std = @import("std");

pub const MomentumOptimizer = struct {
    learning_rate: f64,
    momentum: f64,
    velocity: []f64,

    pub fn update(self: *MomentumOptimizer, params: []f64, grads: []const f64) void {
        for (params, grads, self.velocity) |*p, g, *v| {
            v.* = self.momentum * v.* - self.learning_rate * g;
            p.* += v.*;
        }
    }
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Rust Translation */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Rust Translation</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <div className="px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--soft-gray)' }}>optimizer.rs</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto" style={{ color: 'var(--glow-cyan)' }}>
{`pub struct MomentumOptimizer {
    learning_rate: f64,
    momentum: f64,
    velocity: Vec<f64>,
}

impl MomentumOptimizer {
    pub fn update(&mut self, params: &mut [f64], grads: &[f64]) {
        for i in 0..params.len() {
            self.velocity[i] = self.momentum * self.velocity[i]
                             - self.learning_rate * grads[i];
            params[i] += self.velocity[i];
        }
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Mappings */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Type Mappings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Julia</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Zig</th>
                  <th className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>Rust</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Float64', 'f64', 'f64'],
                  ['Vector{Float64}', '[]f64', 'Vec<f64>'],
                  ['mutable struct', 'struct', 'struct (pub mut)'],
                  ['function!', 'fn', 'fn mut self'],
                ].map(([julia, zig, rust]) => (
                  <tr key={julia} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="py-3 px-4"><code style={{ color: 'var(--spore-purple)' }}>{julia}</code></td>
                    <td className="py-3 px-4"><code style={{ color: 'var(--glow-gold)' }}>{zig}</code></td>
                    <td className="py-3 px-4"><code style={{ color: 'var(--glow-cyan)' }}>{rust}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
