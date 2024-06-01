import Logger from '@sumor/logger'

// original code is en
const code = {
  trace: {
    OPERATOR_CHANGED: 'Operator changed to {user}',
    SQL_EXECUTED: 'SQL executed: {sql}',
    SELECT_EXECUTED:
      'SELECT action executed for {table}, condition: {condition}, options: {options}',
    MODIFY_EXECUTED: 'MODIFY action executed for {table}, check: {check}, data: {data}',
    ENSURE_EXECUTED: 'ENSURE action executed for {table}, check: {check}, data: {data}'
  },
  debug: {},
  info: {},
  warn: {
    TOO_MANY_CONNECTIONS:
      'Too many connections, please check if there are uncommitted transactions, current connections: {count}'
  },
  error: {}
}

// languages: zh, es, ar, fr, ru, de, pt, ja, ko
const i18n = {
  zh: {
    OPERATOR_CHANGED: '操作员变更为{user}',
    TOO_MANY_CONNECTIONS: '连接过多，请检查是否有未提交的事务，当前连接数：{count}'
  }
}
export default (level, language) =>
  new Logger({
    scope: 'DATABASE',
    level,
    language,
    code,
    i18n
  })
