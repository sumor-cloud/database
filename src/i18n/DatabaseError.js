import defineError from '@sumor/error'

const DatabaseError = defineError({
  code: {
    NOT_SUPPORT_DATABASE_TYPE: 'Not support database type {type}',
    DATA_ENTRY_ID_NOT_FOUND: 'Data entry id not found, can not update data'
  },
  // languages: en, zh, es, ar, fr, ru, de, pt, ja, ko
  i18n: {
    en: {
      NOT_SUPPORT_DATABASE_TYPE: 'Not support database type {type}',
      DATA_ENTRY_ID_NOT_FOUND: 'Data entry id not found, can not update data'
    },
    zh: {
      NOT_SUPPORT_DATABASE_TYPE: '不支持的数据库类型 {type}',
      DATA_ENTRY_ID_NOT_FOUND: '数据实体ID未找到，无法更新数据'
    },
    es: {},
    ar: {},
    fr: {},
    ru: {},
    de: {},
    pt: {},
    ja: {},
    ko: {}
  }
})

export default DatabaseError
