import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
darkMode: ["class", ".dark"],
content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
    extend: {
    colors: {
        // Cores do Briefo - Paleta Creative Confidence
        primary: {
        DEFAULT: '#6366F1',
        50: '#F5F7FF',
        100: '#EBF0FF',
        200: '#D7E0FF',
        300: '#B4C6FF',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
        },
        secondary: {
        DEFAULT: '#F97316',
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
        },
        success: {
        DEFAULT: '#10B981',
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
        },
    },
    fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },
    },
},
plugins: [tailwindcssAnimate],
};

export default config;