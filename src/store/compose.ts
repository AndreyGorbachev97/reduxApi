export const compose = <R>(...funcs: any[]): ((arg: R) => R) => {
  if (funcs.length === 0) {
    // Если функций нет, просто вернуть исходный аргумент.
    return (arg: R) => arg;
  }
  if (funcs.length === 1) {
    // Если только одна функция, вернуть её.
    return funcs[0];
  }
  // Используем функцию reduce для композиции функций в цепочку вызовов.
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
};