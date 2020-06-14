import Vue from 'vue'

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (obj: any, key: string) => {
  return hasOwnProperty.call(obj, key)
}

export function rafThrottle(fn: any) {
  let locked = false
  return function(...args: any) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(fn, args)
      locked = false
    })
  }
}
export const isString = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isObject = (arg: any) => {
  return arg !== null && arg !== undefined && typeof arg === 'object' && Array.isArray(arg) === false
}
export function isHtmlElement(node: any) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export const isFunction = (functionToCheck: any) => {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val: any) => {
  /* eslint-disable-next-line */
  return val === void 0
}

export const isDefined = (val: any) => {
  return val !== undefined && val !== null
}
export const isIE = () => {
  /* eslint-disable-next-line */
  return !Vue.prototype.$isServer && !isNaN(Number(document['documentMode']))
}

export const isEdge = () => {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = () => {
  return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
}

export const isValidURL = (url: string) => {
  // tslint:disable-next-line: max-line-length
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export const capitalize = (str: any) => {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const looseEqual = (a: any, b: any) => {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export const arrayEquals = (arrayA: any, arrayB: any) => {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}

export const isEqual = (value1: any, value2: any) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

export const isEmpty = (val: any) => {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}
/**
 *
 * @param node
 */
export const isVNode = (node: any) => {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

/** change **/
export const objToArray = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj
  }
  return isEmpty(obj) ? [] : [obj]
}

/** -------------------- **/
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

function extend(to: any, _from: any) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export const toObject = (arr: any[]) => {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = function(object: any, prop: any) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

export const getPropByPath = (obj: any, path: string, strict?: boolean) => {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export const generateId = function() {
  return Math.floor(Math.random() * 10000)
}

export const valueEquals = (a: any, b: any) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// TODO: use native Array.find, Array.findIndex when IE support is dropped
export const arrayFindIndex = (arr: any[], pred: any) => {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

export const arrayFind = (arr: any, pred: any) => {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : undefined
}

// coerce truthy value to array
export const coerceTruthyValueToArray = (val: any) => {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

export const autoprefixer = (style: any) => {
  if (typeof style !== 'object') return style
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach((rule) => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach((prefix) => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

export const kebabCase = (str: any) => {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}
/**
 *
 * @param num
 * @param type  , type?: string
 */
export const moneyFormat = (num: any) => {
  const num2Str = +num + ''
  return num2Str.replace(/^(\d*)\.?(\d*)$/, (match: any, p1: any, p2: any) => {
    if (p2 === '') {
      p2 = '00'
    } else if (p2.length > 2) {
      p2 = p2.substr(0, 3)
      p2 = Math.round(+p2 / 10) + ''
      if (p2.length < 2) {
        // 位数修正
        p2 = '0' + p2
      }
    }
    return '' + p1 + '.' + p2
  })
}

/**
 *
 * @param target
 */
export const merge = (target: any, ...args: any) => {
  for (let i = 0, j = args.length; i < j; i++) {
    const source = args[i] || {}
    for (const prop in source) {
      /* eslint-disable-next-line */
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

/**
 * isDef
 * @param val
 */
export const isDef = (val: string) => {
  return val !== undefined && val !== null
}
/**
 * isKorean
 * @param text
 */
export const isKorean = (text: string) => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}

// ------------------------------------

/**
 * @param obj
 * @param fn
 */
function forEach(obj: any, fn: any) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      /* eslint-disable-next-line */
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        /* eslint-disable-next-line */
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}
//  TODO --marge--
export const merge2 = (...args: any) => {
  const result: any = {}
  const assignValue = (val: any, key: any) => {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge2(result[key], val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    forEach(args[i], assignValue)
  }
  return result
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export const deepMerge = (...args: any) => {
  const result: any = {}
  const assignValue = (val: any, key: any) => {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val)
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    forEach(args[i], assignValue)
  }
  return result
}
