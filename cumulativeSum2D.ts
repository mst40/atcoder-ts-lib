/**
 * A class to manage and calculate 2D cumulative sums (prefix sums).
 * It allows for O(1) time complexity queries for the sum of any rectangular area
 * after an O(H * W) preprocessing step.
 */
class CumulativeSum2D {
  private cumulativeSum: number[][];
  private height: number;
  private width: number;

  /**
   * Initializes the instance and computes the cumulative sum array.
   * @param array The 2D array of numbers to be processed.
   */
  constructor(array: number[][]) {
    this.height = array.length;
    this.width = array[0]?.length ?? 0;

    this.cumulativeSum = Array.from({ length: this.height }, () => new Array(this.width).fill(0));

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const value = array[i][j];
        const up = i > 0 ? this.cumulativeSum[i - 1][j] : 0;
        const left = j > 0 ? this.cumulativeSum[i][j - 1] : 0;
        const upperLeft = i > 0 && j > 0 ? this.cumulativeSum[i - 1][j - 1] : 0;

        this.cumulativeSum[i][j] = value + up + left - upperLeft;
      }
    }
  }

  /**
   * Returns the sum of the elements within a specified rectangle.
   * The range is inclusive from (y1, x1) to (y2, x2).
   * @param y1 The starting row index (0-indexed).
   * @param x1 The starting column index (0-indexed).
   * @param y2 The ending row index (0-indexed).
   * @param x2 The ending column index (0-indexed).
   * @returns The sum of the elements in the defined range.
   */
  public getRangeSum(y1: number, x1: number, y2: number, x2: number): number {
    return (
      this.getCumulativeSum(y2, x2) -
      this.getCumulativeSum(y2, x1 - 1) -
      this.getCumulativeSum(y1 - 1, x2) +
      this.getCumulativeSum(y1 - 1, x1 - 1)
    );
  }

  /**
   * Internal helper to get the cumulative sum from (0, 0) up to (row, col).
   * Handles out-of-bounds indices by returning 0 for negative values
   * and the maximum sum for indices exceeding the array dimensions.
   * @param row Row index.
   * @param col Column index.
   * @returns The cumulative sum at the specified coordinate.
   */
  private getCumulativeSum(y: number, x: number): number {
    if (y < 0 || x < 0) {
      return 0;
    }
    const r = Math.min(y, this.height - 1);
    const c = Math.min(x, this.width - 1);

    return this.cumulativeSum[r][c];
  }
}
