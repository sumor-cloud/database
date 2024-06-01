import knex from 'knex'
import fse from 'fs-extra'
import parseType from './config/parseType.js'
import parseConfig from './config/parseKnexConfig.js'

export default async (config, excludeDatabase) => {
  const { category } = parseType(config.type)
  const knexConfig = parseConfig(config, excludeDatabase)
  const instance = knex(knexConfig)

  if (category === 'sqlite') {
    await fse.ensureFile(config.connection.filename)
  }

  instance.databases = async () => {
    let databaseResult
    switch (category) {
      case 'mysql':
        databaseResult = await instance.raw('show databases')
        return databaseResult[0].map(obj => obj.Database)
    }
  }

  instance.existsDatabase = async database => {
    database = database.toLowerCase()
    const databases = await instance.databases()
    return databases.includes(database)
  }

  instance.createDatabase = async database => {
    database = database.toLowerCase()
    switch (category) {
      case 'mysql':
        await instance.raw(
          `CREATE DATABASE IF NOT EXISTS ${database} default charset utf8mb4 COLLATE utf8mb4_general_ci`
        )
        break
    }
  }

  instance.ensureDatabase = async database => {
    if (!(await instance.existsDatabase(database))) {
      await instance.createDatabase(database)
    }
  }

  instance.dropDatabase = async database => {
    database = database.toLowerCase()
    switch (category) {
      case 'mysql':
        await instance.raw(`DROP DATABASE IF EXISTS ${database}`)
        break
    }
  }

  return instance
}
