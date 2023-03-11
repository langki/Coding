import fs from 'fs'
import path from 'path'
import promisify from '../index.js'

const readFile = promisify(fs.readFile)

test('promisify', async () => {
  const data = await readFile(path.join(__dirname, './test.text'))
  expect(data.toString()).toBe('这是用来测试的文本数据')
})
