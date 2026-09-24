// Tailwind only ever sees src/styles/admin.css (the one file with @tailwind directives).
// site.css has no directives, so it passes through untouched apart from autoprefixer.
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
