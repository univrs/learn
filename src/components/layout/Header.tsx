import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, ExternalLink, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'DOL', href: '/dol' },
  { name: 'LLVM', href: '/llvm' },
  { name: 'Skills', href: '/skills' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const location = useLocation()

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = prefersDark ? 'dark' : 'light'
      setTheme(defaultTheme)
      document.documentElement.setAttribute('data-theme', defaultTheme)
      document.documentElement.classList.toggle('dark', defaultTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-univrs-bg-primary/80 backdrop-blur-xl border-b border-white/5 dark:bg-univrs-bg-primary/80 dark:border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/icon.jpg"
                alt="Univrs"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-semibold text-univrs-text-primary">
                Univrs <span className="text-univrs-primary-400">Learn</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  location.pathname.startsWith(item.href)
                    ? 'text-univrs-primary-400'
                    : 'text-univrs-text-secondary hover:text-univrs-text-primary'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-univrs-text-secondary hover:text-univrs-text-primary hover:bg-univrs-bg-tertiary transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="https://univrs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sm text-univrs-text-secondary hover:text-univrs-text-primary transition-colors px-2"
            >
              univrs.io
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/univrs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-univrs-text-secondary hover:text-univrs-text-primary hover:bg-univrs-bg-tertiary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-univrs-text-secondary hover:text-univrs-text-primary hover:bg-univrs-bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    location.pathname.startsWith(item.href)
                      ? 'text-univrs-primary-400 bg-univrs-primary-500/10'
                      : 'text-univrs-text-secondary hover:text-univrs-text-primary hover:bg-univrs-bg-tertiary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
