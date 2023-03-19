function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

function getType(obj) {
  let type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

// 1.只考虑普通 数组和对象 两种复杂数据结构
// 2.考虑循环引用的情况
function clone(value, map = new WeakMap()) {
  if (!isObject(value)) {
    return value
  }

  if (map.has(value)) {
    return map.get(value)
  }

  let result
  let tag = getType(value)

  if (tag === 'Array') {
    result = new Array(value.length)
    map.set(value, result)
    for (const [i, v] of value.entries()) {
      if (isObject(v)) {
        result[i] = clone(v, map)
      } else {
        result[i] = v
      }
    }
  } else if (tag === 'Object') {
    result = {}
    map.set(value, result)
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const v = value[key]
        if (isObject(v)) {
          result[key] = clone(v, map)
        } else {
          result[key] = v
        }
      }
    }
  }

  return result
}

export default clone
