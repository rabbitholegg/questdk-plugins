/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      external: [/@rabbitholegg/, /@lens-protocol/, 'alchemy-sdk'],
    },
    lib: {
      entry: 'src/index.ts',
      emptyOutDir: false,
      name: 'QuestdkPluginLens',
      fileName: (module, name) => {
        const outPath = `${module === 'es' ? 'esm' : 'cjs'}/${
          name.startsWith('index') ? 'index.js' : `${name}/index.js`
        }`
        return outPath
      },
    },
  },
}
