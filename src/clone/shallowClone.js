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

function shallowClone(value) {
  if (!isObject(value)) {
    return value
  }

  let result
  let tag = getType(value)
  if (tag === 'Array') {
    result = new Array(value.length)

    for (const [i, v] of value.entries()) {
      result[i] = v
    }
  }
  if (tag === 'Object') {
    result = new value.constructor()

    for (const key in value) {
      result[key] = value[key]
    }
  }

  return result
}

export default shallowClone
