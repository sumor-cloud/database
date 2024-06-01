import getKnex from '../connect/index.js'
import getMethods from './methods.js'
import getLogger from '../i18n/databaseLogger.js'

export default async config => {
  const databaseLogger = getLogger()
  // const globalLogger = {
  //   debug: console.log,
  //   trace: console.log
  // }
  const report = {
    workingConnections: 0,
    alertConnections: 20
  }

  const timer = setInterval(() => {
    if (report.workingConnections > report.alertConnections) {
      databaseLogger.code('TOO_MANY_CONNECTIONS', { count: report.workingConnections })
    }
  }, 1000)

  const knex = await getKnex(config)

  const cache = {
    info: {}
  }

  const connect = async (logger, user) => getMethods(report, knex, cache, databaseLogger, user)
  const destroy = async () => {
    await knex.destroy()
    clearInterval(timer)
  }

  return {
    connect,
    destroy
  }
}
