import { get_1_or_0 } from "./get-one-or-zero";

export function get_random(n: number): number {
  if (n < 0) throw new Error("n must be a non-negative integer.");
  let random = 0;
  for (let i = 0; i < 31; i++) {
    if (get_1_or_0() === 1) {
      random |= 1 << i;
    }
  }
  // random &= 0x7fffffff;
  return random % (n + 1);
}
