import { describe, expect, it } from '@jest/globals'
import { load } from '@sumor/config'

import getKnex from '../../src/connect/client/getKnex.js'
import destroyKnex from '../../src/connect/client/destroyKnex.js'
// import ensureDatabase from '../../src/connect/client/ensureDatabase.js'
// import dropDatabase from '../../src/connect/client/dropDatabase.js'

describe('Connect', () => {
  it('knex instance', async () => {
    const config = await load(`${process.cwd()}/test/config`, 'DB')
    const knex = getKnex({
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

    await destroyKnex(knex)

    let error
    try {
      await knex.raw('show databases')
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined()
  })
  // it('operate database', async () => {
  //   const config = await load(`${process.cwd()}/test/config`, 'DB')
  //   const config1 = {
  //     type: config.type,
  //     host: config.host,
  //     port: config.port,
  //     user: config.user,
  //     password: config.password,
  //     charset: config.charset
  //   }
  // })
})
