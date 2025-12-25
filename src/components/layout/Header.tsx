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
          ? (isDark ? 'rgba(10, 13, 11, 0.95)' : 'rgba(248, 250, 249, 0.95)')
          : 'transparent',
        borderBottom: scrolled
          ? `1px solid ${isDark ? '#2a3a30' : '#c8d4cd'}`
          : 'none',
      }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-[70px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00ffd5, #b088f9)',
                boxShadow: isDark ? '0 0 10px rgba(0, 255, 213, 0.3)' : 'none'
              }}
            >
              <img
                src="/icon.jpg"
                alt="Univrs"
                className="w-full h-full object-cover"
              />
            </span>
            <span
              className="text-xl font-normal"
              style={{ color: isDark ? '#e8f4ec' : '#1a221d' }}
            >
              Univrs.io
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
                      ? (isDark ? '#e8f4ec' : '#1a221d')
                      : (isDark ? '#8a9a8f' : '#5a6a5f'),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#e8f4ec' : '#1a221d'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#8a9a8f' : '#5a6a5f'
                    }
                  }}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: isDark ? '#00ffd5' : '#008b75' }}
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
                backgroundColor: isDark ? '#141a16' : '#e8eeeb',
                border: `1px solid ${isDark ? '#2a3a30' : '#c8d4cd'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDark ? '#00ffd5' : '#008b75'
                e.currentTarget.style.boxShadow = isDark ? '0 0 10px rgba(0, 255, 213, 0.3)' : '0 0 10px rgba(0, 139, 117, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? '#2a3a30' : '#c8d4cd'
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
              style={{ color: isDark ? '#8a9a8f' : '#5a6a5f' }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#e8f4ec' : '#1a221d'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#8a9a8f' : '#5a6a5f'}
            >
              univrs.io
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://github.com/univrs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ color: isDark ? '#8a9a8f' : '#5a6a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? '#e8f4ec' : '#1a221d'
                e.currentTarget.style.backgroundColor = isDark ? '#1a221d' : '#dce5e0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? '#8a9a8f' : '#5a6a5f'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isDark ? '#8a9a8f' : '#5a6a5f' }}
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
            style={{ borderTop: `1px solid ${isDark ? '#2a3a30' : '#c8d4cd'}` }}
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
                        ? (isDark ? '#00ffd5' : '#008b75')
                        : (isDark ? '#8a9a8f' : '#5a6a5f'),
                      backgroundColor: isActive
                        ? (isDark ? 'rgba(0, 255, 213, 0.1)' : 'rgba(0, 139, 117, 0.1)')
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
