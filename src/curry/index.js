// 柯里化是一种将接受多个参数的函数转化成一系列只接受单一参数的函数的技术，也称为“部分应用”。
// 通过柯里化，可以将一个接受多个参数的函数转换成接受单个参数的函数，
// 这样就能更方便地进行函数复用和函数组合。

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

export default curry
