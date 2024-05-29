/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      external: [/@rabbitholegg/, /@zoralabs/],
    },
    lib: {
      entry: 'src/index.ts',
      emptyOutDir: false,
      name: 'QuestdkPluginZora',
      fileName: (module, name) => {
        const outPath = `${module === 'es' ? 'esm' : 'cjs'}/${
          name.startsWith('index') ? 'index.js' : name + '/index.js'
        }`
        return outPath
      },
    },
  },
}
