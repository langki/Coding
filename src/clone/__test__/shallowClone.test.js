import { test, expect } from 'vitest'
import clone from '../shallowClone'

test('shallowClone 浅拷贝', () => {
  let obj = {
    a: 1,
    b: {
      c: 2,
    },
  }
  let c = clone(obj)
  expect(c).toStrictEqual(obj)
  obj.b.c = 3
  expect(c.b.c).toBe(3)

  let arr = [{ a: 1 }, 2, 3, 'abc']
  let d = clone(arr)
  expect(d).toStrictEqual(arr)
  d[0].a = 2
  expect(arr[0].a).toBe(2)
})
