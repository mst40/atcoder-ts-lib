type Func = (str: string) => void;
const run = (func: Func) => {
  func(require("fs").readFileSync("/dev/stdin", "utf8"));
};
export default run;
