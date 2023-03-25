// 节流是一种限制函数调用频率的技术，它可以确保在一段时间内只执行一次函数。
// 简单来说，就是把一个高频率触发的事件（比如鼠标滚动、窗口大小改变等）
// 变成低频率的事件，从而减少函数的调用次数，提高性能。

function throttle(func, delay) {
  let triggered = false
  return function (...args) {
    const that = this
    if (!triggered) {
      triggered = true
      func.apply(that, args)
      setTimeout(() => {
        triggered = false
      }, delay)
    }
  }
}

export default throttle
