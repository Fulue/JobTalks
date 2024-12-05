const { nextui } = require("@nextui-org/theme");
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./database/factories/ProfessionFactory.php",
        "./database/factories/TagFactory.php",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "text-blue-600",
        "text-green-600",
        "text-purple-600",
        "text-yellow-500",
        "dark:text-yellow-600",
        "text-blue-500",
        "text-indigo-600",
        "text-teal-500",
        "text-sky-500",
        "text-red-500",
        "text-green-500",
        "text-green-400",
        "text-red-700",
        "text-orange-500",
        "text-red-600",
        "text-brown-600",
        "text-blue-700",
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: ["Mulish", "sans-serif"]
    		},
    		animation: {
    			rainbow: 'rainbow var(--speed, 2s) infinite linear'
    		},
    		keyframes: {
    			rainbow: {
    				'0%': {
    					'background-position': '0%'
    				},
    				'100%': {
    					'background-position': '200%'
    				}
    			}
    		},
    		extend: {
    			letterSpacing: {
    				tighter: '-0.05em',
    				tight: '-0.025em',
    				normal: '0em',
    				wide: '0.025em',
    				wider: '0.05em',
    				widest: '0.1em',
    				custom: '0.15em'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {}
    	}
    },
    plugins: [require("tailwindcss-animate"), nextui({})],
};
