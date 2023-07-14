export const compressJson = (json: object) => {
  return JSON.parse(
    JSON.stringify(json, (_, value) => {
      if (typeof value === 'bigint') return value.toString()
      if (value !== undefined) return value
    }),
  )
}
