class _Promise {
  constructor(cb) {
    this.status = 'pending'

    this.resolve_value = undefined // 正常 返回值
    this.then_fun = [] // 存放回调函数then

    this.reject_value = undefined // 异常 返回值
    this.catch_fun = undefined // 存放回调函数catch

    this.finally_fun = [] // 最终处理函数finally

    this.then = (fun) => {
      if (this.status === 'fulfilled') {
        fun(this.resolve_value)
      } else {
        this.then_fun.push(fun)
      }
      return this
    }
    this.catch = (fun) => {
      if (this.status === 'rejected') {
        fun(this.reject_value)
      } else {
        if (!this.catch_fun) {
          this.catch_fun = fun
        }
      }
      return this
    }
    this.finally = (fun) => {
      if (this.status !== 'pending') {
        fun()
      } else {
        this.finally_fun.push(fun)
      }
      return this
    }

    let fulfilled = () => {
      this.status = 'fulfilled'
      while (this.then_fun.length) {
        this.resolve_value = this.then_fun.shift()(this.resolve_value)
      }
      while (this.finally_fun.length) {
        this.finally_fun.shift()()
      }
    }
    let rejected = () => {
      this.status = 'rejected'
      this.catch_fun(this.reject_value)
      this.catch_fun = undefined

      while (this.finally_fun.length) {
        this.finally_fun.shift()()
      }
    }

    let resolve = (res) => {
      this.resolve_value = res
      // 模拟微任务Promise.resolve()的效果
      setTimeout(() => {
        fulfilled()
      }, 50)
    }
    let reject = (e) => {
      this.reject_value = e
      setTimeout(() => {
        rejected()
      }, 50)
    }

    cb(resolve, reject)

    return this
  }

  static all(p_arr) {
    return new Promise((resolve, reject) => {
      const len = p_arr.length
      const result_arr = []
      let resolved_count = 0
      for (let [i, p] of Array.from(p_arr).entries()) {
        p.then((res) => {
          result_arr[i] = res
          resolved_count++
          if (resolved_count === len) {
            resolve(result_arr)
          }
        }).catch((e) => {
          reject(e)
        })
      }
    })
  }

  static race(p_arr) {
    return new Promise((resolve, reject) => {
      for (let p of Array.from(p_arr).values()) {
        p.then((res) => {
          resolve(res)
        }).catch((e) => {
          console.log(e)
          reject(e)
        })
      }
    })
  }

  static resolve(p) {
    if (p instanceof Promise) {
      return p
    } else {
      return Promise.resolve(p)
    }
  }

  static reject(e) {
    return Promise.reject(e)
  }
}

export default _Promise
