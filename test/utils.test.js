import { describe, expect, it } from '@jest/globals'
import uuid from '../src/utils/uuid.js'
import type from '../src/utils/type.js'
import toCamelCase from '../src/utils/toCamelCase.js'
import fromCamelCase from '../src/utils/fromCamelCase.js'
import toCamelCaseData from '../src/utils/toCamelCaseData.js'
import fromCamelCaseData from '../src/utils/fromCamelCaseData.js'

describe('Utils', () => {
  it('uuid', () => {
    const id = uuid()
    expect(id.length).toBe(32)

    // verify format
    for (let i = 0; i < 10000; i++) {
      const id = uuid()
      const reg = /^[0-9a-f]{32}$/
      expect(reg.test(id)).toBeTruthy()
    }
  })
  it('type', () => {
    expect(type(1)).toBe('number')
    expect(type('1')).toBe('string')
    expect(type({})).toBe('object')
    expect(type([])).toBe('array')
    expect(type(null)).toBe('null')
    expect(type(undefined)).toBe('undefined')
    expect(type(/-/)).toBe('regexp')
  })
  it('toCamelCase', () => {
    // spliter is '_', upper case
    expect(toCamelCase('a_b_c')).toBe('aBC')
    expect(toCamelCase('a_bc')).toBe('aBc')
    expect(toCamelCase('a_b_c_d')).toBe('aBCD')
    expect(toCamelCase('a_bc_d')).toBe('aBcD')

    // spliter is '-', upper case
    expect(toCamelCase('a-b-c', '-', false)).toBe('ABC')
    expect(toCamelCase('a-bc', '-', false)).toBe('ABc')
    expect(toCamelCase('a-b-c-d', '-', false)).toBe('ABCD')
    expect(toCamelCase('a-bc-d', '-', false)).toBe('ABcD')

    // spliter is '-', lower case
    expect(toCamelCase('a-b-c', '-', true)).toBe('aBC')
    expect(toCamelCase('a-bc', '-', true)).toBe('aBc')
    expect(toCamelCase('a-b-c-d', '-', true)).toBe('aBCD')
    expect(toCamelCase('a-bc-d', '-', true)).toBe('aBcD')
  })
  it('fromCamelCase', () => {
    // spliter is '-'
    expect(fromCamelCase('aBC')).toBe('a_b_c')
    expect(fromCamelCase('aBc')).toBe('a_bc')
    expect(fromCamelCase('aBCD')).toBe('a_b_c_d')
    expect(fromCamelCase('aBcD')).toBe('a_bc_d')

    // spliter is '_'
    expect(fromCamelCase('ABC', '-')).toBe('a-b-c')
    expect(fromCamelCase('ABc', '-')).toBe('a-bc')
    expect(fromCamelCase('ABCD', '-')).toBe('a-b-c-d')
    expect(fromCamelCase('ABcD', '-')).toBe('a-bc-d')
  })
  it('toCamelCaseData', () => {
    expect(toCamelCaseData({ a_b_c: 1 })).toEqual({ aBC: 1 })
    expect(toCamelCaseData({ a_bc: 1 })).toEqual({ aBc: 1 })
    expect(toCamelCaseData({ a_b_c_d: 1 })).toEqual({ aBCD: 1 })
    expect(toCamelCaseData({ a_bc_d: 1 })).toEqual({ aBcD: 1 })
  })
  it('fromCamelCaseData', () => {
    expect(fromCamelCaseData({ aBC: 1 })).toEqual({ a_b_c: 1 })
    expect(fromCamelCaseData({ aBc: 1 })).toEqual({ a_bc: 1 })
    expect(fromCamelCaseData({ aBCD: 1 })).toEqual({ a_b_c_d: 1 })
    expect(fromCamelCaseData({ aBcD: 1 })).toEqual({ a_bc_d: 1 })
  })
})
