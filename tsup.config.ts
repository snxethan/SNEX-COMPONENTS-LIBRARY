import { defineConfig } from 'tsup'

// CSS is handled by the Tailwind CLI (see the `build` script), which compiles
// src/styles.css against the components into a self-contained dist/index.css.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
})
