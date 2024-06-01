import parseType from '../config/parseType.js'
import getKnex from './getKnex.js'
import destroyKnex from './destroyKnex.js'
import fse from 'fs-extra'

export default async config => {
  const { category } = parseType(config.type)
  const knex = getKnex(config)

  let schemaResult, existSchema

  switch (category) {
    case 'sqlite':
      await fse.ensureFile(config.connection.filename)
      break
    case 'mysql':
      schemaResult = await knex.raw('show databases')
      existSchema = !!schemaResult[0].filter(obj => obj.Database === config.database)[0]
      if (!existSchema) {
        await knex.raw(
          `CREATE DATABASE IF NOT EXISTS ${config.database} default charset utf8mb4 COLLATE utf8mb4_general_ci`
        )
      }
      break
  }

  await destroyKnex(knex)
}
