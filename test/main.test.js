import { describe, expect, it } from '@jest/globals'
import database from '../src/index.js'
import { load } from '@sumor/config'

describe('main', () => {
  it('init', async () => {
    expect(database.install).toBeDefined()

    const config = await load(`${process.cwd()}/test/config`, 'DB')
    expect(config).toBeDefined()
    expect(config.type).toBeDefined()
  })
  it('install', async () => {
    const config = await load(`${process.cwd()}/test/config`, 'DB')
    await database.install({
      config,
      entity: {},
      view: {}
    })
  })
})
