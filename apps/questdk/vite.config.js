/** @type {import('vite').UserConfig} */
export default {
  build: {
    lib: {
      entry: {
        'index': 'src/index.ts',
        'actions': 'src/actions/index.ts',
        'filter': 'src/filter/index.ts',
        'utils': 'src/utils/index.ts',
        'constants': 'src/constants.ts',
      },
      emptyOutDir: false,
      fileName: (module, name) => {
        const outPath = `${module === 'es' ? 'esm' : 'cjs'}/${name.startsWith('index') ? 'index.js' : name + '/index.js'}`
        return outPath
      },
    },
  },
}
