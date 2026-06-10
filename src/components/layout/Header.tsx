import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'DOL', href: '/dol' },
  { name: 'LLVM', href: '/llvm' },
  { name: 'Skills', href: '/skills' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Read initial theme from document
    if (typeof document !== 'undefined') {
      return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'
    }
    return 'dark'
  })
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync theme state with document attribute
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'
    if (currentTheme) {
      setTheme(currentTheme)
    }
  }, [])

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme')
    const newTheme = current === 'dark' ? 'light' : 'dark'

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const isDark = theme === 'dark'

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && "backdrop-blur-xl"
      )}
      style={{
        backgroundColor: scrolled
          ? (isDark ? 'rgba(8, 8, 8, 0.95)' : 'rgba(250, 248, 240, 0.95)')
          : 'transparent',
        borderBottom: scrolled
          ? `1px solid ${isDark ? 'rgba(232, 194, 90, 0.22)' : 'rgba(122, 106, 50, 0.3)'}`
          : 'none',
      }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-[70px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/sunlion-medallion.webp"
              alt="Univrs"
              className="w-8 h-8 logo-medallion"
            />
            <span
              className="text-xl font-normal font-display"
              style={{ color: isDark ? '#f3ecd8' : '#221d12' }}
            >
              Univrs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-sm font-medium transition-colors"
                  style={{
                    color: isActive
                      ? (isDark ? '#f3ecd8' : '#221d12')
                      : (isDark ? '#9a907a' : '#6b6353'),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#f3ecd8' : '#221d12'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#9a907a' : '#6b6353'
                    }
                  }}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: isDark ? '#e8c25a' : '#7a6a32' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - matching univrs.io style */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all"
              style={{
                backgroundColor: isDark ? '#0c0c0a' : '#f4efe2',
                border: `1px solid ${isDark ? 'rgba(232, 194, 90, 0.22)' : 'rgba(122, 106, 50, 0.3)'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDark ? '#e8c25a' : '#7a6a32'
                e.currentTarget.style.boxShadow = isDark ? '0 0 10px rgba(232, 194, 90, 0.35)' : '0 0 10px rgba(122, 106, 50, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(232, 194, 90, 0.22)' : 'rgba(122, 106, 50, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <a
              href="https://univrs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sm transition-colors"
              style={{ color: isDark ? '#9a907a' : '#6b6353' }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#f3ecd8' : '#221d12'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#9a907a' : '#6b6353'}
            >
              univrs.io
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://github.com/univrs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ color: isDark ? '#9a907a' : '#6b6353' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? '#f3ecd8' : '#221d12'
                e.currentTarget.style.backgroundColor = isDark ? '#221d12' : '#e7dec6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? '#9a907a' : '#6b6353'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isDark ? '#9a907a' : '#6b6353' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-4"
            style={{ borderTop: `1px solid ${isDark ? 'rgba(232, 194, 90, 0.22)' : 'rgba(122, 106, 50, 0.3)'}` }}
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{
                      color: isActive
                        ? (isDark ? '#e8c25a' : '#7a6a32')
                        : (isDark ? '#9a907a' : '#6b6353'),
                      backgroundColor: isActive
                        ? (isDark ? 'rgba(232, 194, 90, 0.12)' : 'rgba(122, 106, 50, 0.12)')
                        : 'transparent',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
