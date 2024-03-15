import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.ts' ];

export default  {
  input: 'src/index.ts',
  output: [
    {
      inlineDynamicImports: true,
      file: 'dist/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      inlineDynamicImports: true,
      file: 'dist/bundles/bundle.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },
    {
      inlineDynamicImports: true, 
      file: 'dist/bundles/bundle.umd.js',
      format: 'umd',
      name: 'myLibrary',
      sourcemap: true
    },
    {
      inlineDynamicImports: true,
      file: 'dist/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'myLibrary',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    resolve({ extensions,  preferBuiltins: true }),
    commonjs(),
    babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'})
  ]
}
