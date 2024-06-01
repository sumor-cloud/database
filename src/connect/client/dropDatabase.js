import parseType from '../config/parseType.js'
import getKnex from './getKnex.js'
import destroyKnex from './destroyKnex.js'
import fse from 'fs-extra'

export default async (config, database) => {
  const { category } = parseType(config.type)
  const knex = getKnex(config, true)

  switch (category) {
    case 'sqlite':
      await fse.remove(config.connection.filename)
      break
    case 'mysql':
      await knex.raw(`DROP DATABASE IF EXISTS ${config.database}`)
      break
  }

  await destroyKnex(knex)
}
