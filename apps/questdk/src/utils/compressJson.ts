/**
 * Compresses a JSON object by removing undefined values and converting bigints to strings.
 * @param {object} json - The JSON object to compress.
 * @return {object} The compressed JSON object.
 */
export const compressJson = (json: object) => {
  return JSON.parse(
    JSON.stringify(json, (_, value) => {
      if (typeof value === "bigint") return value.toString();
      if (value !== undefined) return value;
    }),
  );
};
