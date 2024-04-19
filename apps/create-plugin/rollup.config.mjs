import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from "@rollup/plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
;
import json from '@rollup/plugin-json';

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
      }
    ],
    plugins: [
      resolve(), // Resolves node modules
      commonjs(), // Converts CommonJS modules to ES6
      terser(), // Minify the output (optional),
      json(), // Support JSON imports
    ]
  }
];
