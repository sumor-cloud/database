import { describe, expect, it } from '@jest/globals'
import parseType from '../../src/connect/config/parseType.js'
import parseKnexConfig from '../../src/connect/config/parseKnexConfig.js'

describe('connect config', () => {
  it('get dependence', async () => {
    const result1 = parseType('mysql')
    expect(result1.dependence).toBe('mysql2')
    expect(result1.category).toBe('mysql')

    const result2 = parseType('mysql2')
    expect(result2.dependence).toBe('mysql2')
    expect(result2.category).toBe('mysql')

    const result3 = parseType('sqlite')
    expect(result3.dependence).toBe('better-sqlite3')
    expect(result3.category).toBe('sqlite')

    const result4 = parseType('sqlite3')
    expect(result4.dependence).toBe('better-sqlite3')
    expect(result4.category).toBe('sqlite')

    const result5 = parseType('better-sqlite3')
    expect(result5.dependence).toBe('better-sqlite3')
    expect(result5.category).toBe('sqlite')

    const result6 = parseType('unknown')
    expect(result6.dependence).toBe(null)
    expect(result6.category).toBe(null)
  })
  it('get knex config', async () => {
    const result1 = parseKnexConfig({ type: 'mysql' })
    expect(result1.client).toBe('mysql2')
    expect(result1.connection.host).toBe(undefined)
    expect(result1.connection.port).toBe(3306)
    expect(result1.connection.user).toBe(undefined)
    expect(result1.connection.password).toBe(undefined)
    expect(result1.connection.database).toBe(undefined)
    expect(result1.connection.charset).toBe('utf8mb4')
    expect(result1.pool.min).toBe(2)
    expect(result1.pool.max).toBe(10)
    const result2 = parseKnexConfig({ type: 'sqlite' })
    expect(result2.client).toBe('better-sqlite3')
    expect(result2.connection.filename).toBe(`${process.cwd()}/main.sqlite`)
    expect(result2.useNullAsDefault).toBe(true)
  })
  it('get knex config error', async () => {
    let error1
    try {
      parseKnexConfig()
    } catch (e) {
      error1 = e
    }
    expect(error1.message).toBe('Not support database type unknown')
    let error2
    try {
      parseKnexConfig({ type: 'unknown' })
    } catch (e) {
      error2 = e
    }
    expect(error2.message).toBe('Not support database type unknown')
  })
})
