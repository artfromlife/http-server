
export function isObject (object:any): boolean {
  return Object.prototype.toString.call(object).slice(8,-1) === 'Object'
}

export function isArray (object:any): boolean {
  return Object.prototype.toString.call(object).slice(8,-1) === 'Array'
}

