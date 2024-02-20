import { compressJson } from "./compressJson.js";
import { describe, expect, test } from "vitest";

describe("compressJson", () => {
  test("should remove undefined values", () => {
    const input = { a: 1, b: undefined };
    const output = compressJson(input);
    expect(output).to.deep.equal({ a: 1 });
  });

  test("should convert bigints to strings", () => {
    const input = { a: BigInt(1) };
    const output = compressJson(input);
    expect(output).to.deep.equal({ a: "1" });
  });
});
