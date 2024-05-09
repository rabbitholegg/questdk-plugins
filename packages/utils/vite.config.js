/** @type {import('vite').UserConfig} */
export default {
  build: {
    lib: {
      entry: 'src/index.ts',
      emptyOutDir: false,
      name: 'QuestdkUtils',
      fileName: (module, name) => {
        const outPath = `${module === 'es' ? 'esm' : 'cjs'}/${
          name.startsWith('index') ? 'index.js' : name + '/index.js'
        }`
        return outPath
      },
    },
  },
}
