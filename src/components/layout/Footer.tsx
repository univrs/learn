import { Github, ExternalLink } from 'lucide-react'

const footerLinks = {
  documentation: [
    { name: 'DOL', href: '/dol' },
    { name: 'LLVM Tools', href: '/llvm' },
    { name: 'Skills Framework', href: '/skills' },
  ],
  ecosystem: [
    { name: 'univrs.io', href: 'https://univrs.io', external: true },
    { name: 'metadol', href: 'https://github.com/univrs/metadol', external: true },
    { name: 'llvm-translation-mcp', href: 'https://github.com/univrs/llvm-translation-mcp', external: true },
  ],
  community: [
    { name: 'GitHub', href: 'https://github.com/univrs', external: true },
    { name: 'Contributing', href: '/about#contributing' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/icon.jpg"
                alt="Univrs"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span
                className="text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Univrs Learn
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: 'var(--soft-gray)' }}
            >
              Creating tools of self-aware systems.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Documentation
            </h3>
            <ul className="space-y-2">
              {footerLinks.documentation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--soft-gray)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-gray)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Ecosystem
            </h3>
            <ul className="space-y-2">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm transition-colors inline-flex items-center gap-1"
                    style={{ color: 'var(--soft-gray)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-gray)'}
                  >
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Community
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm transition-colors inline-flex items-center gap-1"
                    style={{ color: 'var(--soft-gray)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-gray)'}
                  >
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--soft-gray)' }}
          >
            &copy; {new Date().getFullYear()} Univrs.io Contributors. MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/univrs"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--soft-gray)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-gray)'}
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
