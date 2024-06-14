import { describe, expect, it } from '@jest/globals'
import database from '../src/index.js'
import { load } from '@sumor/config'
import getKnex from '../src/connect/index.js'

describe('Operator', () => {
  it(
    'crud',
    async () => {
      const config = await load(`${process.cwd()}/test/config`, 'DB')
      const opDBId = `db_test_op_${Date.now()}`
      console.log('opDBId: ', opDBId)
      config.database = opDBId
      await database.install(config, {
        entity: {
          Car: {
            property: {
              model: {
                type: 'string',
                length: 100
              },
              brand: {
                type: 'string',
                length: 100
              }
            }
          }
        },
        view: {}
      })

      const client = await database.client(config)
      const db = await client.connect()
      try {
        await db.insert('Car', { model: 'test', brand: 'bz' })
        await db.insert('Car', { model: 'demo' })

        const count = await db.count('Car')
        const result = await db.select('Car')
        expect(count).toBe(2)
        expect(result.length).toBe(2)

        const count1 = await db.count(
          'Car',
          {},
          {
            term: 'es',
            termRange: ['model']
          }
        )
        const result1 = await db.select(
          'Car',
          {},
          {
            term: 'es',
            termRange: ['model']
          }
        )
        expect(count1).toBe(1)
        expect(result1.length).toBe(1)
        expect(result1[0].model).toBe('test')
        expect(result1[0].brand).toBe('bz')
        expect(result1[0].createdBy).toBe('')

        db.setUser('tester')
        await db.update('Car', { id: result1[0].id, brand: 'audi' })

        const result2 = await db.single('Car', { model: 'test' })
        expect(result2.id).toBe(result1[0].id)
        expect(result2.model).toBe('test')
        expect(result2.brand).toBe('audi')
        expect(result2.updatedBy).toBe('tester')

        await db.delete('Car', { id: result2.id })
        const count2 = await db.count('Car')
        expect(count2).toBe(1)

        const ensureId = await db.ensure('Car', ['model'], {
          model: 'fast',
          brand: 'bz'
        })
        const ensureId2 = await db.ensure('Car', ['model'], {
          model: 'fast',
          brand: 'bmw'
        })
        expect(ensureId).toBe(ensureId2)

        const result3 = await db.single('Car', { model: 'fast' })
        expect(result3.model).toBe('fast')
        expect(result3.brand).toBe('bz')

        const modifyId = await db.modify('Car', ['model'], {
          model: 'quz',
          brand: 'bz'
        })
        const result4 = await db.single('Car', { model: 'quz' })
        expect(result4.model).toBe('quz')
        expect(result4.brand).toBe('bz')
        await db.commit()
        const modifyId2 = await db.modify('Car', ['model'], {
          model: 'quz',
          brand: 'bmw'
        })
        expect(modifyId).toBe(modifyId2)
        const result5 = await db.single('Car', { model: 'quz' })
        expect(result5.model).toBe('quz')
        expect(result5.brand).toBe('bmw')

        await db.rollback()
        const result6 = await db.single('Car', { model: 'quz' })
        expect(result6.model).toBe('quz')
        expect(result6.brand).toBe('bz')

        await db.release()
        await client.destroy()
      } catch (e) {
        await db.release()
        await client.destroy()
        throw e
      }

      const globalKnex = await getKnex(config, true)
      const databases = await globalKnex.databases()
      expect(databases.includes(opDBId)).toBe(true)

      await globalKnex.dropDatabase(opDBId)

      // clean up legacy test data
      // for(let database of databases){
      //   if(database.startsWith('db_test_op_')){
      //     await globalKnex.dropDatabase(database)
      //   }
      // }

      await globalKnex.destroy()

      // avoid destroy not complete jest warning
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    60 * 1000
  )
})
