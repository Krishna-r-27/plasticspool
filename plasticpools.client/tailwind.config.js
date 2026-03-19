// @type {import('tailwindcss').Config} 
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "1.25rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "2rem",
                "2xl": "2rem",
            },
        },
        extend: {
            // FIX: fontFamily ke andar seedha keys likhein
            fontFamily: {
                unbounded: ["Unbounded", "sans-serif"],
                dmsans: ["DM Sans", "sans-serif"],
            },
            spacing: {
                30: "var(--space-30)",
                50: "var(--space-50)",
                70: "var(--space-70)",
                100: "var(--space-100)",
                200: "var(--space-200)",
            },
            fontSize: {
                xxs: ['0.625rem', '1rem'],
                xs: ['0.75rem', '1.125rem'],
                sm: ['0.875rem', '1.5rem'],
                base: ['1rem', '1.5rem'],
                lg: ['1.125rem', '1.75rem'],
                xl: ['1.25rem', '2rem'],
                '1xl': ['1.375rem', '2rem'],
                '2xl': ['1.5rem', '2.125rem'],
                '3xl': ['2rem', '2.75rem'],
                '3.5xl': ['2.25rem', '3rem'],
                '4xl': ['2.5rem', '3.5rem'],
                '5xl': ['3rem', '4.125rem'],
                '6xl': ['3.5rem', '4.75rem'],
                '7xl': ['4rem', '5rem'],
                '8xl': ['4.5rem', '6.125rem'],
                '9xl': ['5rem', '6.625rem'],
            },
            colors: {
                // Aapke requested colors
                primary: "#FDF14A", // Yellow
                navy: "#002147",    // Dark Blue
                brandWhite: "#FFFFFF", // Pure White
                grayText: "#444444", // Current link color
                'green': '#298E01',
            },
            backgroundImage: {
                // Defines the top-to-bottom transparent -> mid-gray -> transparent gradient
                'gradient-separator': 'linear-gradient(to bottom, transparent, #D1D5DB 50%, transparent)',
            },
        },
    },
    plugins: [],
}