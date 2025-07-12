function baseConversion(value: number, base: number) {
  let result: string = "";
  while (value) {
    result += "" + (value % base);
    value = Math.floor(value / base);
  }
  return result;
}
