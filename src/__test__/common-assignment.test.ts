import { get_1_or_0, get_random } from "@/common-assignment";

describe("get_1_or_0", () => {
  it("should return either 0 or 1", () => {
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(get_1_or_0());
    }
    expect(results).toContain(0);
    expect(results).toContain(1);
    expect(results.size).toBe(2);
  });
});

describe("get_random", () => {
  it("should return values between 0 and n inclusive", () => {
    const n = 10;
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      const random = get_random(n);
      expect(random).toBeGreaterThanOrEqual(0);
      expect(random).toBeLessThanOrEqual(n);
      results.add(random);
    }

    for (let i = 0; i <= n; i++) {
      expect(results).toContain(i);
    }
  });

  it("should throw an error if n is negative", () => {
    expect(() => get_random(-1)).toThrow("n must be a non-negative integer.");
  });

  it("should handle edge case of n = 0", () => {
    for (let i = 0; i < 100; i++) {
      expect(get_random(0)).toBe(0);
    }
  });
});
