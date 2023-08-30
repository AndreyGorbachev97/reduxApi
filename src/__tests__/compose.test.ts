import { compose } from "../store";

describe("compose", () => {
  it("returns the original argument when no functions are provided", () => {
    const originalValue = "Hello, world!";
    const result = compose()(originalValue);

    expect(result).toBe(originalValue);
  });

  it("returns the only function's result when only one function is provided", () => {
    const addExclamation = (str: string) => str + "!";
    const result = compose(addExclamation)("Hello");

    expect(result).toBe("Hello!");
  });

  it("composes multiple functions in the correct order", () => {
    const addExclamation = (str: string) => str + "!";
    const makeUpperCase = (str: string) => str.toUpperCase();
    const result = compose(addExclamation, makeUpperCase)("hello");

    expect(result).toBe("HELLO!");
  });

  it("composes multiple functions with varying arguments", () => {
    const addSuffix = (str: string, suffix: string) => str + suffix;
    const repeatString = (str: string, times: number) => str.repeat(times);
    const result = compose(addSuffix, repeatString)("Hello", 3, "!!!");

    expect(result).toBe("Hello!!!Hello!!!Hello!!!");
  });
});