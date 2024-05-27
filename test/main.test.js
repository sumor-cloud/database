import { describe, expect, it } from '@jest/globals'
import database from '../src/index.js'

describe('main', () => {
  it('init', () => {
    expect(database.install).toBeDefined()
  })
})
