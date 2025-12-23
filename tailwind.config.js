/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Univrs Brand Colors - Now using CSS variables for theme switching
                univrs: {
                    // Primary (cyan/teal)
                    primary: {
                        300: "var(--glow-cyan)",
                        400: "var(--glow-cyan)",
                        500: "var(--glow-cyan)",
                    },
                    // Secondary (purple)
                    secondary: {
                        400: "var(--spore-purple)",
                        500: "var(--spore-purple)",
                    },
                    // Background colors
                    bg: {
                        primary: "var(--bg-primary)",
                        secondary: "var(--bg-secondary)",
                        tertiary: "var(--forest-floor)",
                        elevated: "var(--moss)",
                    },
                    // Text colors
                    text: {
                        primary: "var(--text-primary)",
                        secondary: "var(--text-secondary)",
                        muted: "var(--soft-gray)",
                    },
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
                display: ["Space Grotesk", "sans-serif"],
            },
            typography: () => ({
                DEFAULT: {
                    css: {
                        color: "var(--text-primary)",
                        a: {
                            color: "var(--glow-cyan)",
                            "&:hover": {
                                color: "var(--glow-cyan)",
                                textShadow: "var(--glow-sm)",
                            },
                        },
                        "h1, h2, h3, h4": {
                            color: "var(--text-primary)",
                        },
                        code: {
                            color: "var(--spore-purple)",
                            backgroundColor: "var(--forest-floor)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.25rem",
                            fontWeight: "400",
                        },
                        "code::before": {
                            content: '""',
                        },
                        "code::after": {
                            content: '""',
                        },
                        pre: {
                            backgroundColor: "var(--bg-secondary)",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-subtle)",
                        },
                        blockquote: {
                            borderLeftColor: "var(--glow-cyan)",
                            color: "var(--text-secondary)",
                        },
                    },
                },
            }),
            animation: {
                gradient: "gradient 8s ease infinite",
                float: "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "fade-up": "fade-up 1s ease-out",
            },
            keyframes: {
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(40px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
                "univrs-gradient":
                    "linear-gradient(135deg, var(--glow-cyan) 0%, var(--spore-purple) 100%)",
            },
            borderColor: {
                "white/5": "var(--border-subtle)",
                "white/10": "var(--border-subtle)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
