import typeAlias from './typeAlias.js'
export default type => {
  let category = null
  let dependence = null
  for (const currentCategory in typeAlias) {
    if (typeAlias[currentCategory].alias.includes(type)) {
      category = currentCategory
      dependence = typeAlias[currentCategory].dependence
    }
  }
  return {
    category,
    dependence
  }
}
