import { test, expect } from 'vitest'
import curry from '../index'

function add(a, b) {
  return a + b
}

function add3(a, b, c) {
  return a + b + c
}

test('curry', () => {
  expect(curry(add)(2)(3)).toBe(5)
  expect(curry(add3)(2)(3)(4)).toBe(9)
})
