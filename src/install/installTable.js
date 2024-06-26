import fromCamelCase from '../utils/fromCamelCase.js'
import editColumn from './editColumn.js'
import getLogger from '../i18n/databaseLogger.js'
const logger = getLogger()

export default async (trx, tableName, info) => {
  info = info || {}
  const property = {}
  const exists = await trx.schema.hasTable(tableName).transacting(trx)

  // 补全默认字段
  if (!info.rename && !info.deleted) {
    let hasKey = false
    for (const name in info.property) {
      if (info.property[name].key) {
        hasKey = true
      }
    }
    if (!hasKey) {
      property.id = { type: 'string', length: 32, key: true }
    }
    for (const i in info.property) {
      if (i === 'id' && !hasKey) {
        property[i] = info.property[i]
      } else if (['createdBy', 'createdTime', 'updatedBy', 'updatedTime'].indexOf(i) < 0) {
        property[i] = info.property[i]
      }
    }
    const timeDefine = { type: 'number', length: 13 }
    if (info.join) {
      for (const columnName in info.join) {
        property[`${fromCamelCase(columnName)}_id`] = {
          type: 'string',
          length: 32
        }
      }
    }
    property.createdBy = { name: '创建者', type: 'string', length: 32 }
    property.createdTime = { name: '创建时间', ...timeDefine }
    property.updatedBy = { name: '更新者', type: 'string', length: 32 }
    property.updatedTime = { name: '更新时间', ...timeDefine }
  }

  if (!exists) {
    if (!info.rename && !info.deleted) {
      await trx.schema
        .createTable(tableName, table => {
          for (const name in property) {
            const columnName = fromCamelCase(name)
            const propertyInfo = property[name]
            if (!propertyInfo.rename && !propertyInfo.deleted) {
              editColumn(table, columnName, propertyInfo)
            }
          }
        })
        .transacting(trx)
    }
  } else if (info.rename) {
    const renamedTableName = fromCamelCase(info.rename)
    await trx.schema.renameTable(tableName, renamedTableName)
  } else if (info.deleted) {
    await trx.schema.dropTable(tableName)
  } else {
    let info = await trx(tableName).columnInfo()
    await trx.schema
      .alterTable(tableName, table => {
        for (const name in property) {
          const columnName = fromCamelCase(name)
          const propertyInfo = property[name]
          if (info[columnName] && propertyInfo.rename) {
            const renameColumnName = fromCamelCase(propertyInfo.rename)
            table.renameColumn(columnName, renameColumnName)
          }
        }
      })
      .transacting(trx)
    info = await trx(tableName).columnInfo()
    await trx.schema.alterTable(tableName, table => {
      for (const name in property) {
        const columnName = fromCamelCase(name)
        const propertyInfo = property[name]
        if (!propertyInfo.rename) {
          if (!info[columnName]) {
            // 不存在该字段
            if (!propertyInfo.rename && !propertyInfo.deleted) {
              editColumn(table, columnName, propertyInfo)
            }
          } else {
            // 已存在该字段，更新字段内容
            if (!propertyInfo.deleted) {
              editColumn(table, columnName, propertyInfo, true)
            } else {
              table.dropColumn(columnName)
            }
          }
        }
      }
    })
  }

  let existsIndex = await trx.raw(`SHOW INDEX FROM ${tableName}`)
  existsIndex = existsIndex[0]

  // ensure primary key index exists
  const hasPrimaryKeyIndex = existsIndex.filter(o => {
    return o.Column_name === 'id' && o.Key_name === 'PRIMARY'
  })[0]
  if (!hasPrimaryKeyIndex) {
    logger.code('ADD_TABLE_INDEX', { column: 'id', table: tableName })
    await trx.raw('ALTER TABLE ?? ADD PRIMARY KEY (`id`)', [tableName])
  }

  // ensure index exists
  if (info.index) {
    for (const index of info.index) {
      const columnName = fromCamelCase(index)
      if (!existsIndex.filter(o => o.Key_name === columnName)[0]) {
        logger.code('ADD_TABLE_INDEX', {
          column: columnName,
          table: tableName
        })
        await trx.raw(`CREATE INDEX ${columnName} ON ${tableName} (${columnName})`)
      }
    }
  }
}
