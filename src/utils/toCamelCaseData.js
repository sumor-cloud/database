import toCamelCase from './toCamelCase.js'

export default (data, spliter, lower) => {
  const result = {}
  for (const i in data) {
    const fieldName = toCamelCase(i, spliter, lower)
    result[fieldName] = data[i]
  }
  return result
}
