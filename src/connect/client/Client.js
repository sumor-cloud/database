import fse from 'fs-extra'
import knex from 'knex'
import parseConfig from '../config/parseKnexConfig.js'

export default class Client {
  constructor(config, logger) {
    this.config = config
    this._config = parseConfig(config)
    this._logger = logger || {
      debug: console.log,
      trace: console.log
    }
  }

  async ensure() {
    const config = parseConfig(this.config, true)
    let database
    let mysqlChecker
    let schemaResult
    let existSchema
    switch (config.client) {
      case 'better-sqlite3':
        await fse.ensureFile(config.connection.filename)
        break
      case 'mysql2':
        mysqlChecker = knex(config)
        schemaResult = await mysqlChecker.raw('show databases')
        existSchema = !!schemaResult[0].filter(obj => obj.Database === database)[0]
        if (!existSchema) {
          this._logger.trace('数据库不存在，正在创建')
          await mysqlChecker.raw(
            `CREATE DATABASE IF NOT EXISTS ${database} default charset utf8mb4 COLLATE utf8mb4_general_ci`
          )
          this._logger.trace('数据库创建完成')
        }
        await new Promise(resolve => {
          mysqlChecker.destroy(() => {
            resolve()
          })
        })
        break
      default:
        this._logger.trace(`暂不支持${config.client}类型数据库创建，请自行确认数据库存在`)
        break
    }
  }

  async connect() {
    if (!this.knex) {
      this.knex = knex(this._config)
    }
  }

  async destroy() {
    if (this.knex) {
      await new Promise(resolve => {
        this.knex.destroy(() => {
          resolve()
        })
      })
      delete this.knex
    }
  }
}
