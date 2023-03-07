class _Promise {
  constructor() {}
  static all(arr) {
    return new Promise((resolve, reject) => {
      const l = arr.length
      const result_arr = []
      let compute_num = 0
      for (let [i, p] of Array.from(arr).entries()) {
        p.then((res) => {
          result_arr[i] = new Promise((r, j) => r(res))
          compute_num++
          if (compute_num === l) {
            resolve(result_arr)
          }
        }).catch((e) => {
          reject(e)
        })
      }
    })
  }
}

export default _Promise
