import knex from 'knex'
import parseConfig from '../config/parseKnexConfig.js'

export default (config, excludeDatabase) => {
  const knexConfig = parseConfig(config, excludeDatabase)
  return knex(knexConfig)
}
