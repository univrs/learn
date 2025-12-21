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
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = prefersDark ? 'dark' : 'light'
      setTheme(defaultTheme)
      document.documentElement.setAttribute('data-theme', defaultTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-color)]"
          : "bg-transparent"
      )}
      style={{
        '--nav-bg': theme === 'dark' ? 'rgba(10, 13, 11, 0.95)' : 'rgba(248, 250, 249, 0.95)',
        '--border-color': theme === 'dark' ? 'rgba(42, 58, 48, 0.5)' : 'rgba(200, 212, 205, 0.5)',
      } as React.CSSProperties}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/icon.jpg"
                alt="Univrs"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={cn(
                "text-xl font-semibold transition-colors",
                theme === 'dark' ? 'text-[#e8f4ec]' : 'text-[#1a221d]'
              )}>
                Univrs <span className={theme === 'dark' ? 'text-[#00ffd5]' : 'text-[#008b75]'}>Learn</span>
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
                  'text-sm font-medium transition-colors relative',
                  location.pathname.startsWith(item.href)
                    ? theme === 'dark' ? 'text-[#e8f4ec]' : 'text-[#1a221d]'
                    : theme === 'dark' ? 'text-[#8a9a8f] hover:text-[#e8f4ec]' : 'text-[#5a6a5f] hover:text-[#1a221d]'
                )}
              >
                {item.name}
                {location.pathname.startsWith(item.href) && (
                  <span className={cn(
                    "absolute -bottom-1 left-0 right-0 h-0.5",
                    theme === 'dark' ? 'bg-[#00ffd5]' : 'bg-[#008b75]'
                  )} />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all border",
                theme === 'dark'
                  ? 'bg-[#141a16] border-[#2a3a30] text-[#8a9a8f] hover:text-[#e8f4ec] hover:border-[#00ffd5]'
                  : 'bg-[#e8eeeb] border-[#c8d4cd] text-[#5a6a5f] hover:text-[#1a221d] hover:border-[#008b75]'
              )}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <a
              href="https://univrs.io"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex items-center gap-1 text-sm transition-colors px-2",
                theme === 'dark' ? 'text-[#8a9a8f] hover:text-[#e8f4ec]' : 'text-[#5a6a5f] hover:text-[#1a221d]'
              )}
            >
              univrs.io
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/univrs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                theme === 'dark'
                  ? 'text-[#8a9a8f] hover:text-[#e8f4ec] hover:bg-[#1a221d]'
                  : 'text-[#5a6a5f] hover:text-[#1a221d] hover:bg-[#dce5e0]'
              )}
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                theme === 'dark'
                  ? 'text-[#8a9a8f] hover:text-[#e8f4ec] hover:bg-[#1a221d]'
                  : 'text-[#5a6a5f] hover:text-[#1a221d] hover:bg-[#dce5e0]'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden py-4 border-t",
            theme === 'dark' ? 'border-[#2a3a30]' : 'border-[#c8d4cd]'
          )}>
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    location.pathname.startsWith(item.href)
                      ? theme === 'dark'
                        ? 'text-[#00ffd5] bg-[#00ffd510]'
                        : 'text-[#008b75] bg-[#008b7510]'
                      : theme === 'dark'
                        ? 'text-[#8a9a8f] hover:text-[#e8f4ec] hover:bg-[#1a221d]'
                        : 'text-[#5a6a5f] hover:text-[#1a221d] hover:bg-[#dce5e0]'
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
