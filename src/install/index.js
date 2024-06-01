import getKnex from '../connect/index.js'
import installTable from './installTable.js'
import sortView from './sortView/index.js'
import fromCamelCase from '../utils/fromCamelCase.js'

export default async ({ config, entity, view }) => {
  const logger = {
    debug: console.log,
    trace: console.log
  }
  const globalKnex = await getKnex(config, true)
  await globalKnex.ensureDatabase(config.database)
  await globalKnex.destroy()

  const knex = await getKnex(config)

  const trx = await knex.transaction()
  let error
  try {
    for (const i in entity) {
      const objName = fromCamelCase(i)
      logger.debug(`正在安装实体${i}为${objName}`)
      await installTable(trx, objName, entity[i])
      logger.debug(`正在安装实体${i}完成`)
    }
    for (const i in view) {
      const objName = fromCamelCase(i)
      await trx.schema.dropViewIfExists(objName)
    }
    const sortedView = sortView(view)
    for (const i in sortedView) {
      const objName = fromCamelCase(i)
      logger.debug(`正在安装视图${i}为${objName}`)
      await trx.schema.createViewOrReplace(objName, view => {
        view.as(sortedView[i].sql)
      })
      logger.debug(`正在安装视图${i}完成`)
    }
    await trx.commit()
  } catch (e) {
    error = e
    await trx.rollback()
  }

  await knex.destroy()

  if (error) {
    throw error
  }
}
