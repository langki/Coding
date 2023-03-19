import { test, expect } from 'vitest'
import clone from '../clone'

test('clone 普通拷贝', () => {
  let obj = {
    a: 1,
  }
  let c = clone(obj)
  expect(c).toStrictEqual(obj).not.toBe(obj)
  obj.a = 2
  c.a = 3
  expect(c.a).toBe(3)

  let arr = [1, 2, 3, 'abc']
  expect(clone(arr)).toStrictEqual(arr).not.toBe(arr)
})

test('clone 拷贝存在循环引用的对象', () => {
  let obj1 = {
    a: 1,
    b: 'sss',
  }
  let obj2 = {
    a: 2,
    b: 'ppp',
  }
  let obj3 = {
    a: 3,
    b: 'kkk',
  }
  obj1.ref = obj2
  obj2.ref = obj3
  obj3.ref = obj1
  let obj = {
    obj1,
    obj2,
    obj3,
  }

  let c = clone(obj)

  expect(c).toStrictEqual(obj).not.toBe(obj)

  obj.obj1.a = 4
  expect(c.obj1.a).toBe(1)
  c.obj1.a = 5
  expect(c.obj1.a).toBe(5)
  expect(c.obj3.ref.a).toBe(5)
  expect(c.obj2).toBe(c.obj1.ref)
})
