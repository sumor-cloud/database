import { describe, expect, it } from '@jest/globals'
import { load } from '@sumor/config'

import getKnex from '../../src/connect/index.js'

describe('Connect', () => {
  it(
    'knex instance',
    async () => {
      const config = await load(`${process.cwd()}/test/config`, 'DB')
      const knex = await getKnex({
        type: config.type,
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        charset: config.charset
      })
      expect(knex).toBeDefined()

      const result = await knex.raw('select 1+1 as result')
      expect(result[0][0].result).toBe(2)

      // destroy test
      await knex.destroy()

      // avoid destroy not complete jest warning
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

      let error
      try {
        await knex.raw('show databases')
      } catch (e) {
        error = e
      }
      expect(error).toBeDefined()
    },
    20 * 1000
  )
  it(
    'operate database',
    async () => {
      const config = await load(`${process.cwd()}/test/config`, 'DB')
      const config1 = {
        type: config.type,
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        charset: config.charset
      }
      const knex1 = await getKnex(config1)

      console.log('databases: ', await knex1.databases())

      const id = `db_test_conn_${Date.now()}`
      await knex1.ensureDatabase(id)
      await knex1.ensureDatabase(id) // just confirm no error when already exists

      let databases = await knex1.databases()
      expect(databases.includes(id.toLowerCase())).toBe(true)

      await knex1.dropDatabase(id)
      databases = await knex1.databases()
      expect(databases.includes(id.toLowerCase())).toBe(false)

      // clean up legacy test data
      // for(let database of databases){
      //   if(database.startsWith('db_test_conn_')){
      //     await knex1.dropDatabase(database)
      //   }
      // }

      console.log('databases: ', await knex1.databases())

      await knex1.destroy()

      // avoid destroy not complete jest warning
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    20 * 1000
  )
})
