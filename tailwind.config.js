/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			colors: {
				primary: {
					DEFAULT: "#000000", // Pure black
					light: "#333333", // Dark gray (lighter than black)
					dark: "#0f0f0f", // Nearly black (for hover states)
				},
				secondary: {
					DEFAULT: "#f5f5f4", // Light gray/off-white
					light: "#fafaf9",
					dark: "#e7e5e4",
				},
				accent: {
					DEFAULT: "#18181b", // Almost black
					light: "#27272a",
					dark: "#09090b",
				},
			},
		},
	},
	plugins: [],
};
