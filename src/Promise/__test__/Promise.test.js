const _Promise = require('../index')

test('_Promise', () => {
  let p1 = new Promise((rep, rej) => {
    setTimeout(() => rep(1), 1000)
  })
  let p2 = new Promise((rep, rej) => {
    setTimeout(() => rep(2), 2000)
  })
  let p3 = new Promise((rep, rej) => {
    setTimeout(() => rej(3), 2000)
  })

  let P = new _Promise()
  // let res = P.all([p1, p2, p3])
  return P.all([p1, p2, p3]).then((r) => {
    expect(r).toHaveLength(3)
  })
})
