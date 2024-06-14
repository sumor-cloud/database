import { describe, expect, it } from '@jest/globals'
import database from '../src/index.js'
import { load } from '@sumor/config'
import getKnex from '../src/connect/index.js'

describe('main', () => {
  it('init', async () => {
    expect(database.install).toBeDefined()

    const config = await load(`${process.cwd()}/test/config`, 'DB')
    expect(config).toBeDefined()
    expect(config.type).toBeDefined()
  })
  it(
    `install`,
    async () => {
      const installDBId = `db_test_inst_${Date.now()}`
      console.log('installDBId: ', installDBId)
      const config = await load(`${process.cwd()}/test/config`, 'DB')
      config.database = installDBId

      const objects = {
        entity: {
          Car: {
            property: {
              model: {
                type: 'string',
                length: 100
              }
            },
            index: ['model']
          }
        },
        view: {}
      }
      await database.install(config, objects)
      await database.install(config, objects)
      const knex = await getKnex(config)
      const existsTable = await knex.schema.hasTable('car')
      expect(existsTable).toBe(true)

      // check primary key 'id' index exists in mysql
      let result = await knex.raw('SHOW INDEX FROM car')
      result = result[0]
      const hasPrimaryKey = result.filter(o => {
        return o.Column_name === 'id' && o.Key_name === 'PRIMARY'
      })[0]
      expect(hasPrimaryKey).toBeDefined()

      const hasIndex = result.filter(o => {
        return o.Column_name === 'model'
      })[0]
      expect(hasIndex).toBeDefined()

      // destroy test
      await knex.destroy()

      const globalKnex = await getKnex(config, true)
      const databases = await globalKnex.databases()
      expect(databases.includes(installDBId)).toBe(true)

      await globalKnex.dropDatabase(installDBId)

      // clean up legacy test data
      // for(let database of databases){
      //   if(database.startsWith('db_test_inst_')){
      //     await globalKnex.dropDatabase(database)
      //   }
      // }

      // destroy test
      await globalKnex.destroy()

      // avoid destroy not complete jest warning
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    30 * 1000
  )

  it(
    'load from files',
    async () => {
      const installDBId = `db_test_inst_${Date.now()}`
      console.log('installDBId: ', installDBId)
      const config = await load(`${process.cwd()}/test/config`, 'DB')
      config.database = installDBId
      await database.install(config, `${process.cwd()}/test/demo`)

      const knex = await getKnex(config)

      let error
      try {
        await knex('user').insert({
          name: 'tester',
          mobile_prefix: '86',
          mobile: '13800138000'
        })
        const result = await knex.raw('SELECT * FROM v_user')
        expect(result[0][0]).toEqual({
          name: 'tester',
          mobile: '86-13800138000'
        })
      } catch (e) {
        error = e
      }

      // destroy test
      await knex.destroy()

      const globalKnex = await getKnex(config, true)
      const databases = await globalKnex.databases()
      expect(databases.includes(installDBId)).toBe(true)

      await globalKnex.dropDatabase(installDBId)

      // destroy test
      await globalKnex.destroy()

      // avoid destroy not complete jest warning
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

      if (error) {
        throw error
      }
    },
    60 * 1000
  )
})
