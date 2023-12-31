const toString = Object.prototype.toString;

export function isFunction(val: unknown): val is string{
    return toString.call(val) === '[Object function]'
}