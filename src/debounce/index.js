// 防抖是一种技术，它可以确保在一个事件触发的一段时间内，只有最后一次事件会被执行。
// 比如，在一个输入框中实时搜索内容时，用户可能会连续输入多个字符，
// 而这些字符都会触发搜索事件，如果每次都去搜索，可能会对性能造成影响，
// 而使用防抖技术可以让搜索只在最后一次输入完成后执行一次。

function debounce(func, dealy) {
  let timerId = null
  return function (...args) {
    let that = this
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(that, args)
      timerId = null
    }, dealy)
  }
}

export default debounce
