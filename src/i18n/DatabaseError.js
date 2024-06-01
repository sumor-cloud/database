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
    es: {
      NOT_SUPPORT_DATABASE_TYPE: 'Tipo de base de datos no compatible {type}',
      DATA_ENTRY_ID_NOT_FOUND:
        'ID de entrada de datos no encontrado, no se puede actualizar los datos'
    },
    ar: {
      NOT_SUPPORT_DATABASE_TYPE: 'نوع قاعدة بيانات غير مدعوم {type}',
      DATA_ENTRY_ID_NOT_FOUND: 'لم يتم العثور على معرف إدخال البيانات ، لا يمكن تحديث البيانات'
    },
    fr: {
      NOT_SUPPORT_DATABASE_TYPE: 'Type de base de données non pris en charge {type}',
      DATA_ENTRY_ID_NOT_FOUND:
        "ID d'entrée de données non trouvé, impossible de mettre à jour les données"
    },
    ru: {
      NOT_SUPPORT_DATABASE_TYPE: 'Тип базы данных не поддерживается {type}',
      DATA_ENTRY_ID_NOT_FOUND: 'Идентификатор записи данных не найден, невозможно обновить данные'
    },
    de: {
      NOT_SUPPORT_DATABASE_TYPE: 'Datenbanktyp {type} wird nicht unterstützt',
      DATA_ENTRY_ID_NOT_FOUND:
        'Dateneingabe-ID nicht gefunden, Daten können nicht aktualisiert werden'
    },
    pt: {
      NOT_SUPPORT_DATABASE_TYPE: 'Tipo de banco de dados não suportado {type}',
      DATA_ENTRY_ID_NOT_FOUND:
        'ID de entrada de dados não encontrado, não é possível atualizar os dados'
    },
    ja: {
      NOT_SUPPORT_DATABASE_TYPE: 'サポートされていないデータベースタイプ {type}',
      DATA_ENTRY_ID_NOT_FOUND: 'データエントリIDが見つかりません、データを更新できません'
    },
    ko: {
      NOT_SUPPORT_DATABASE_TYPE: '지원되지 않는 데이터베이스 유형 {type}',
      DATA_ENTRY_ID_NOT_FOUND: '데이터 항목 ID를 찾을 수 없어 데이터를 업데이트할 수 없습니다'
    }
  }
})

export default DatabaseError
