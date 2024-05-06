import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/index.ts', // Your source entry point
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs', // CommonJS output
        sourcemap: true,
      },
      {
        dir: 'dist/esm',
        format: 'esm', // ESM output
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(), // Resolves node modules
      commonjs(), // Converts CommonJS modules to ES6
      terser(), // Minify the output (optional),
      json(), // Support JSON imports
    ],
  },
]
