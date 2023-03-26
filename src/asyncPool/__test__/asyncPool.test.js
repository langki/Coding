import { test, expect } from 'vitest'
import asyncPool from '../index'

let arr = []
async function sleep(n, name = 'test') {
  return new Promise((resolve) => {
    console.log(n, name, 'start', '=====')
    setTimeout(() => {
      console.log(n, name, 'end', '=====')
      arr.push(name)
      resolve(name)
    }, n * 100)
  })
}

test('asyncPool', async () => {
  await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, '吃饭'),
      () => sleep(3, '睡觉'),
      () => sleep(5, '打游戏'),
      () => sleep(3.5, '学习算法'),
      () => sleep(4, '学习vue和react'),
    ],
  })
  // 观察打印顺序
  expect(arr).toEqual(['吃饭', '睡觉', '打游戏', '学习算法', '学习vue和react'])
})
