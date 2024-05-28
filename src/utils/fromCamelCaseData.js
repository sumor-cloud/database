import fromCamelCase from './fromCamelCase.js'

export default (data, spliter) => {
  const result = {}
  for (const i in data) {
    const fieldName = fromCamelCase(i, spliter)
    result[fieldName] = data[i]
  }
  return result
}
