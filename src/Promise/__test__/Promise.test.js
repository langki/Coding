import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import _Promise from '../index.js'

describe('Promise的构造函数', () => {
  test('测试promise实例的then方法', async () => {
    new _Promise((rep, rej) => {
      setTimeout(() => {
        rep(1)
      }, 100)
    })
      .then((res) => {
        expect(res).toBe(1)
        return 2
      })
      .then((res) => {
        expect(res).toBe(2)
      })
  })
  test('测试promise实例的catch方法', async () => {
    new _Promise((rep, rej) => {
      setTimeout(() => {
        rej(1)
      }, 100)
    })
      .then((res) => {})
      .catch((e) => {
        expect(e).toBe(1)
      })
  })
  test('测试promise实例的finally方法', async () => {
    new _Promise((rep, rej) => {
      setTimeout(() => {
        rep()
      }, 100)
    })
      .then((res) => {})
      .catch((e) => {})
      .finally((e) => {
        expect(e).toBe(undefined)
      })
      .finally((e) => {
        expect(e).toBe(undefined)
      })
    new _Promise((rep, rej) => {
      setTimeout(() => {
        rej()
      }, 100)
    })
      .then((res) => {})
      .catch((e) => {})
      .finally((e) => {
        expect(e).toBe(undefined)
      })
      .finally((e) => {
        expect(e).toBe(undefined)
      })
  })
})

describe('Promise的静态方法', () => {
  let p1, p2, p3
  beforeEach(() => {
    p1 = new Promise((rep, rej) => {
      setTimeout(() => rep(1), 100)
    })
    p2 = new Promise((rep, rej) => {
      setTimeout(() => rep(2), 200)
    })
    p3 = new Promise((rep, rej) => {
      setTimeout(() => rep(3), 300)
    })
  })
  afterEach(() => {
    p1 = p2 = p3 = null
  })
  test('Promise.all', async () => {
    const r = await _Promise.all([p1, p2, p3])
    expect(r).toHaveLength(3).toEqual([1, 2, 3])

    try {
      let p4 = new Promise((rep, rej) => {
        setTimeout(() => rej(4), 50)
      })
      await _Promise.all([p1, p2, p4])
    } catch (e) {
      expect(e).toBe(4)
    }
  })

  test('Promise.race', async () => {
    await expect(_Promise.race([p1, p2, p3])).resolves.toBe(1)

    let p4 = new Promise((rep, rej) => {
      setTimeout(() => rej(4), 50)
    })
    try {
      await _Promise.race([p1, p2, p4])
    } catch (e) {
      expect(e).toBe(4)
    }
  })
})
