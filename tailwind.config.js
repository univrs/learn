/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Univrs Brand Colors - Match univrs.io
        univrs: {
          // Primary purple/violet spectrum
          primary: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065',
          },
          // Secondary teal/cyan spectrum
          secondary: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
            950: '#083344',
          },
          // Background colors (dark mode default)
          bg: {
            primary: '#0a0a0f',
            secondary: '#12121a',
            tertiary: '#1a1a24',
            elevated: '#22222e',
          },
          // Text colors
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
            muted: '#64748b',
          },
          // Accent colors
          accent: {
            success: '#22c55e',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.univrs.text.primary'),
            a: {
              color: theme('colors.univrs.primary.400'),
              '&:hover': {
                color: theme('colors.univrs.primary.300'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.univrs.text.primary'),
            },
            code: {
              color: theme('colors.univrs.secondary.400'),
              backgroundColor: theme('colors.univrs.bg.tertiary'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.univrs.bg.secondary'),
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            blockquote: {
              borderLeftColor: theme('colors.univrs.primary.500'),
              color: theme('colors.univrs.text.secondary'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.univrs.text.primary'),
          },
        },
      }),
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'univrs-gradient': 'linear-gradient(135deg, #6d28d9 0%, #0891b2 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
