import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
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
      typescript({ tsconfig: './tsconfig.build.json' }), // TypeScript compilation
      // Trader Joe SDK isn't correctly distributing their module so we need to use the main field
      resolve({
        // Target only the specific package
        only: ['@traderjoe-xyz/sdk-v2'],
        mainFields: ['main'], // Prioritize the "main" field for this package
      }),
      resolve({debug: true}), // Resolves node modules
      commonjs(), // Converts CommonJS modules to ES6
      terser(), // Minify the output (optional),
      json(), // Support JSON imports
    ]
  }
];
