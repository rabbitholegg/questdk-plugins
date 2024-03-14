export default  {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/bundles/bundle.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: 'dist/bundles/bundle.umd.js',
      format: 'umd',
      name: 'myLibrary',
      sourcemap: true
    },
    {
      file: 'dist/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'myLibrary',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    resolve({ extensions }),
    babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'})
  ]
}