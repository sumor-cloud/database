import getKnex from '../connect/index.js'
import getMethods from './methods.js'
import getLogger from '../i18n/databaseLogger.js'

export default async config => {
  const logger = getLogger()
  const report = {
    workingConnections: 0,
    alertConnections: 20
  }

  const timer = setInterval(() => {
    if (report.workingConnections > report.alertConnections) {
      logger.code('TOO_MANY_CONNECTIONS', { count: report.workingConnections })
    }
  }, 1000)

  const knex = await getKnex(config)

  const cache = {
    info: {}
  }

  const connect = async (user, index) => getMethods(report, knex, cache, user, index)
  const destroy = async () => {
    await knex.destroy()
    clearInterval(timer)
  }

  return {
    connect,
    destroy
  }
}
