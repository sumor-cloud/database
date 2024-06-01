import DatabaseError from '../../i18n/DatabaseError.js'
import parseType from './parseType.js'
export default (config, excludeDatabase) => {
  config = config || {}
  const knexConfig = {}

  const type = config.type || 'unknown'

  const typeInfo = parseType(type)
  if (typeInfo.dependence) {
    knexConfig.client = typeInfo.dependence
  } else {
    throw new DatabaseError('NOT_SUPPORT_DATABASE_TYPE', { type })
  }

  switch (typeInfo.category) {
    case 'sqlite':
      knexConfig.connection = {
        filename: config.path || `${process.cwd()}/main.sqlite`
      }
      knexConfig.useNullAsDefault = true
      break
    case 'mysql':
      knexConfig.connection = {
        host: config.host,
        port: config.port || 3306,
        user: config.user,
        password: config.password,
        database: excludeDatabase ? undefined : config.database,
        charset: config.charset || 'utf8mb4'
      }
      break
  }
  knexConfig.pool = config.pool || { min: 0, max: 7 }
  return knexConfig
}
