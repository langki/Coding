// for of循环与异步巧妙结合

async function asyncPool({ limit, items }) {
  let promises = []
  let pool = new Set()
  const fn = async (item) => await item()
  for (const item of items) {
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)

    const clean = () => pool.delete(promise)
    promise.then(clean, clean)

    if (pool.size >= limit) {
      await Promise.race(pool)
    }
  }

  return Promise.all(promises)
}

export default asyncPool
