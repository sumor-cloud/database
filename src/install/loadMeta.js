import { meta } from '@sumor/config'
export default async source => {
  if (!source) {
    source = process.cwd()
  }
  if (typeof source === 'string') {
    const result = {
      entity: {},
      view: {}
    }
    const entityPath = `${source}/entity`
    const entity = await meta(entityPath)
    for (const i in entity) {
      const path = i.replace(/\//g, '.')
      result.entity[path] = entity[i]
    }

    const viewPath = `${source}/view`
    const view = await meta(viewPath, ['sql'])
    for (const i in view) {
      const path = i.replace(/\//g, '.')
      result.view[path] = view[i]
    }
    return result
  } else {
    return source
  }
}
