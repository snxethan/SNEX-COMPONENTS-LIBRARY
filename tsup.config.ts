import { defineConfig } from 'tsup'

export default defineConfig([
  // JavaScript/TypeScript build
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'tailwindcss',
      'next','next/image','next/link',
      'postcss',
      'autoprefixer'
    ]
  },
  // CSS build - rename to index.css for better UX
  {
    entry: { index: 'styles.css' },
    format: ['esm'],
    dts: false,
    sourcemap: true,
    clean: false
  }
])
