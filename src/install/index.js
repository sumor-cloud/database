import getKnex from '../connect/index.js'
import installTable from './installTable.js'
import sortView from './sortView/index.js'
import fromCamelCase from '../utils/fromCamelCase.js'
import getLogger from '../i18n/databaseLogger.js'
import loadMeta from './loadMeta.js'

export default async (config, source) => {
  const logger = getLogger()

  const { entity, view } = await loadMeta(source)

  const globalKnex = await getKnex(config, true)
  await globalKnex.ensureDatabase(config.database)
  await globalKnex.destroy()

  const knex = await getKnex(config)

  const trx = await knex.transaction()
  let error
  try {
    for (const i in entity) {
      const objName = fromCamelCase(i)
      logger.code('INSTALLING_ENTITY', { name: i, table: objName })
      logger.debug(entity[i])
      await installTable(trx, objName, entity[i])
      logger.code('INSTALL_ENTITY_SUCCESS', { name: i })
    }
    for (const i in view) {
      const objName = fromCamelCase(i)
      await trx.schema.dropViewIfExists(objName)
    }
    const sortedView = sortView(view)
    for (const i in sortedView) {
      const objName = fromCamelCase(i)
      logger.code('INSTALLING_VIEW', { name: i, view: objName })
      logger.debug(sortedView[i].sql)
      await trx.schema.createViewOrReplace(objName, view => {
        view.as(sortedView[i].sql)
      })
      logger.code('INSTALL_VIEW_SUCCESS', { name: i })
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
