// 在Node.js中，有一个内置的 util 模块，其中包括一个名为 promisify 的函数。
// promisify 函数可以将一个遵循“错误优先”（error-first）回调风格的函数转换为返回一个 Promise 的函数。

// promisify 函数接受一个回调函数作为参数，然后返回一个新的函数。
// 这个新函数会返回一个 Promise 对象，并在 Promise 对象的回调函数中调用原始回调函数。

export default (fn) => {
  return (...arg) => {
    return new Promise((reslolve, reject) => {
      fn.apply(this, [
        ...arg,
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            reslolve(res)
          }
        },
      ])
    })
  }
}
