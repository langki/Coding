import { expect, test } from 'vitest'
import _Promise from '../index.js'

let p1 = new Promise((rep, rej) => {
  setTimeout(() => rep(1), 100)
})
let p2 = new Promise((rep, rej) => {
  setTimeout(() => rep(2), 200)
})
let p3 = new Promise((rep, rej) => {
  setTimeout(() => rep(3), 300)
})

test('_Promise', async () => {
  const r = await _Promise.all([p1, p2, p3])
  expect(r).toHaveLength(3)
  expect(r[0]).resolves.toBe(1)
  expect(r[1]).resolves.toBe(2)
  expect(r[2]).resolves.toBe(3)
})
