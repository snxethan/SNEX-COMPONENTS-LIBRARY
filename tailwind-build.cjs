/**
 * Build-time only. Compiles the utilities the library's own components use
 * into a self-contained dist/index.css so consumers need no Tailwind setup.
 */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: {
    // Never reset the host application's styles.
    preflight: false,
  },
  theme: { extend: {} },
  plugins: [],
}
