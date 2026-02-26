/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Text colors
        'text-main': '#424242',
        'text-subtle': '#616161',
        'text-subtlest': '#9e9e9e',
        'text-white': '#ffffff',
        'text-inverse': '#ffffff',
        
        // Icon colors
        'icon-main': '#424242',
        'icon-subtle': '#616161',
        
        // Surface colors
        'surface-general': '#fafafa',
        'surface-strong': '#000000',
        'status-bar-main': '#fafafa',
        'card-container': '#ffffff',
        'search-bar-container': '#eeeeee',
        
        // Avatar colors
        'avatar-container': '#bdbdbd',
        
        // Badge colors
        'badge-common': 'rgba(0, 0, 0, 0.08)',
        
        // Chips colors
        'chips-default': '#000000',
        'chips-selected': '#ffffff',
        'chips-stroke-default': '#eeeeee',
        'chips-stroke-selected': '#424242',
        
        // Button colors
        'button-inverse-subtle': '#eeeeee',
      },
      fontFamily: {
        'noto-sans': ['"Noto Sans TC"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      spacing: {
        '0': '0px',
        '100': '8px',
        '150': '12px',
        '200': '16px',
      },
      borderRadius: {
        'input-l': '24px',
        'card-m': '20px',
        'badge-capsule': '20px',
        'avatar': '120px',
        'chips': '24px',
      },
      boxShadow: {
        'card': '0px 0px 4px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
