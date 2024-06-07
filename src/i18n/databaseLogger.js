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
  info: {
    INSTALLING_ENTITY: 'Installing entity {name} as {table}',
    INSTALL_ENTITY_SUCCESS: 'Entity {name} installed successfully',
    INSTALLING_VIEW: 'Installing view {name} as {view}',
    INSTALL_VIEW_SUCCESS: 'View {name} installed successfully',
    ADD_TABLE_INDEX: 'Add index for column {column} to table {table}'
  },
  warn: {
    TOO_MANY_CONNECTIONS:
      'Too many connections, please check if there are uncommitted transactions, current connections: {count}'
  },
  error: {}
}

// languages: zh, es, ar, fr, ru, de, pt, ja, ko
const i18n = {
  zh: {
    OPERATOR_CHANGED: '操作员已更改为{user}',
    SQL_EXECUTED: '已执行SQL：{sql}',
    SELECT_EXECUTED: '已执行SELECT操作：{table}，条件：{condition}，选项：{options}',
    MODIFY_EXECUTED: '已执行MODIFY操作：{table}，检查：{check}，数据：{data}',
    ENSURE_EXECUTED: '已执行ENSURE操作：{table}，检查：{check}，数据：{data}',
    TOO_MANY_CONNECTIONS: '连接过多，请检查是否有未提交的事务，当前连接数：{count}',
    INSTALLING_ENTITY: '正在安装实体{name}为{table}',
    INSTALL_ENTITY_SUCCESS: '实体{name}安装成功',
    INSTALLING_VIEW: '正在安装视图{name}为{view}',
    INSTALL_VIEW_SUCCESS: '视图{name}安装成功',
    ADD_TABLE_INDEX: '为表{table}的列{column}添加索引'
  },
  es: {
    OPERATOR_CHANGED: 'Operador cambiado a {user}',
    SQL_EXECUTED: 'SQL ejecutado: {sql}',
    SELECT_EXECUTED:
      'Acción SELECT ejecutada para {table}, condición: {condition}, opciones: {options}',
    MODIFY_EXECUTED: 'Acción MODIFY ejecutada para {table}, comprobar: {check}, datos: {data}',
    ENSURE_EXECUTED: 'Acción ENSURE ejecutada para {table}, comprobar: {check}, datos: {data}',
    TOO_MANY_CONNECTIONS:
      'Demasiadas conexiones, por favor verifique si hay transacciones no confirmadas, conexiones actuales: {count}',
    INSTALLING_ENTITY: 'Instalando entidad {name} como {table}',
    INSTALL_ENTITY_SUCCESS: 'Entidad {name} instalada con éxito',
    INSTALLING_VIEW: 'Instalando vista {name} como {view}',
    INSTALL_VIEW_SUCCESS: 'Vista {name} instalada con éxito',
    ADD_TABLE_INDEX: 'Agregar índice para columna {column} a tabla {table}'
  },
  ar: {
    OPERATOR_CHANGED: 'تم تغيير المشغل إلى {user}',
    SQL_EXECUTED: 'SQL تم تنفيذه: {sql}',
    SELECT_EXECUTED: 'تم تنفيذ إجراء SELECT لـ {table}، الشرط: {condition}، الخيارات: {options}',
    MODIFY_EXECUTED: 'تم تنفيذ إجراء MODIFY لـ {table}، التحقق: {check}، البيانات: {data}',
    ENSURE_EXECUTED: 'تم تنفيذ إجراء ENSURE لـ {table}، التحقق: {check}، البيانات: {data}',
    TOO_MANY_CONNECTIONS:
      'الاتصالات كثيرة جدًا، يرجى التحقق مما إذا كانت هناك معاملات غير مؤكدة، عدد الاتصالات الحالية: {count}',
    INSTALLING_ENTITY: 'تثبيت الكيان {name} كـ {table}',
    INSTALL_ENTITY_SUCCESS: 'تم تثبيت الكيان {name} بنجاح',
    INSTALLING_VIEW: 'تثبيت العرض {name} كـ {view}',
    INSTALL_VIEW_SUCCESS: 'تم تثبيت العرض {name} بنجاح',
    ADD_TABLE_INDEX: 'إضافة فهرس للعمود {column} إلى الجدول {table}'
  },
  fr: {
    OPERATOR_CHANGED: 'Opérateur changé en {user}',
    SQL_EXECUTED: 'SQL exécuté : {sql}',
    SELECT_EXECUTED:
      'Action SELECT exécutée pour {table}, condition : {condition}, options : {options}',
    MODIFY_EXECUTED:
      'Action MODIFY exécutée pour {table}, vérification : {check}, données : {data}',
    ENSURE_EXECUTED:
      'Action ENSURE exécutée pour {table}, vérification : {check}, données : {data}',
    TOO_MANY_CONNECTIONS:
      "Trop de connexions, veuillez vérifier s'il existe des transactions non validées, connexions actuelles : {count}",
    INSTALLING_ENTITY: "Installation de l'entité {name} en tant que {table}",
    INSTALL_ENTITY_SUCCESS: 'Entité {name} installée avec succès',
    INSTALLING_VIEW: 'Installation de la vue {name} en tant que {view}',
    INSTALL_VIEW_SUCCESS: 'Vue {name} installée avec succès',
    ADD_TABLE_INDEX: 'Ajouter un index pour la colonne {column} à la table {table}'
  },
  ru: {
    OPERATOR_CHANGED: 'Оператор изменен на {user}',
    SQL_EXECUTED: 'SQL выполнено: {sql}',
    SELECT_EXECUTED:
      'Действие SELECT выполнено для {table}, условие: {condition}, опции: {options}',
    MODIFY_EXECUTED: 'Действие MODIFY выполнено для {table}, проверка: {check}, данные: {data}',
    ENSURE_EXECUTED: 'Действие ENSURE выполнено для {table}, проверка: {check}, данные: {data}',
    TOO_MANY_CONNECTIONS:
      'Слишком много соединений, пожалуйста, проверьте, есть ли незафиксированные транзакции, текущее количество соединений: {count}',
    INSTALLING_ENTITY: 'Установка сущности {name} как {table}',
    INSTALL_ENTITY_SUCCESS: 'Сущность {name} успешно установлена',
    INSTALLING_VIEW: 'Установка представления {name} как {view}',
    INSTALL_VIEW_SUCCESS: 'Представление {name} успешно установлено',
    ADD_TABLE_INDEX: 'Добавить индекс для столбца {column} в таблицу {table}'
  },
  de: {
    OPERATOR_CHANGED: 'Operator geändert auf {user}',
    SQL_EXECUTED: 'SQL ausgeführt: {sql}',
    SELECT_EXECUTED:
      'SELECT-Aktion ausgeführt für {table}, Bedingung: {condition}, Optionen: {options}',
    MODIFY_EXECUTED: 'MODIFY-Aktion ausgeführt für {table}, Prüfung: {check}, Daten: {data}',
    ENSURE_EXECUTED: 'ENSURE-Aktion ausgeführt für {table}, Prüfung: {check}, Daten: {data}',
    TOO_MANY_CONNECTIONS:
      'Zu viele Verbindungen, bitte überprüfen Sie, ob es nicht bestätigte Transaktionen gibt, aktuelle Verbindungen: {count}',
    INSTALLING_ENTITY: 'Entität {name} als {table} installieren',
    INSTALL_ENTITY_SUCCESS: 'Entität {name} erfolgreich installiert',
    INSTALLING_VIEW: 'Ansicht {name} als {view} installieren',
    INSTALL_VIEW_SUCCESS: 'Ansicht {name} erfolgreich installiert',
    ADD_TABLE_INDEX: 'Index für Spalte {column} zur Tabelle {table} hinzufügen'
  },
  pt: {
    OPERATOR_CHANGED: 'Operador alterado para {user}',
    SQL_EXECUTED: 'SQL executado: {sql}',
    SELECT_EXECUTED: 'Ação SELECT executada para {table}, condição: {condition}, opções: {options}',
    MODIFY_EXECUTED: 'Ação MODIFY executada para {table}, verificar: {check}, dados: {data}',
    ENSURE_EXECUTED: 'Ação ENSURE executada para {table}, verificar: {check}, dados: {data}',
    TOO_MANY_CONNECTIONS:
      'Muitas conexões, por favor, verifique se existem transações não confirmadas, conexões atuais: {count}',
    INSTALLING_ENTITY: 'Instalando entidade {name} como {table}',
    INSTALL_ENTITY_SUCCESS: 'Entidade {name} instalada com sucesso',
    INSTALLING_VIEW: 'Instalando visualização {name} como {view}',
    INSTALL_VIEW_SUCCESS: 'Visualização {name} instalada com sucesso',
    ADD_TABLE_INDEX: 'Adicionar índice para coluna {column} à tabela {table}'
  },
  ja: {
    OPERATOR_CHANGED: 'オペレーターが{user}に変更されました',
    SQL_EXECUTED: 'SQLが実行されました：{sql}',
    SELECT_EXECUTED:
      '{table}に対してSELECTアクションが実行されました、条件：{condition}、オプション：{options}',
    MODIFY_EXECUTED:
      '{table}に対してMODIFYアクションが実行されました、チェック：{check}、データ：{data}',
    ENSURE_EXECUTED:
      '{table}に対してENSUREアクションが実行されました、チェック：{check}、データ：{data}',
    TOO_MANY_CONNECTIONS:
      '接続が多すぎます。未確認のトランザクションがあるかどうかを確認してください。現在の接続数：{count}',
    INSTALLING_ENTITY: '{name}を{table}としてインストール中',
    INSTALL_ENTITY_SUCCESS: '{name}エンティティが正常にインストールされました',
    INSTALLING_VIEW: '{name}を{view}としてインストール中',
    INSTALL_VIEW_SUCCESS: '{name}ビューが正常にインストールされました',
    ADD_TABLE_INDEX: '列{column}のインデックスをテーブル{table}に追加'
  },
  ko: {
    OPERATOR_CHANGED: '작업자가 {user}로 변경되었습니다',
    SQL_EXECUTED: 'SQL 실행됨: {sql}',
    SELECT_EXECUTED:
      '{table}에 대한 SELECT 작업이 수행되었습니다, 조건: {condition}, 옵션: {options}',
    MODIFY_EXECUTED: '{table}에 대한 MODIFY 작업이 수행되었습니다, 확인: {check}, 데이터: {data}',
    ENSURE_EXECUTED: '{table}에 대한 ENSURE 작업이 수행되었습니다, 확인: {check}, 데이터: {data}',
    TOO_MANY_CONNECTIONS:
      '너무 많은 연결이 있습니다. 확인되지 않은 트랜잭션이 있는지 확인하십시오. 현재 연결 수: {count}',
    INSTALLING_ENTITY: '{name}을 {table}로 설치 중',
    INSTALL_ENTITY_SUCCESS: '{name} 엔티티가 성공적으로 설치되었습니다',
    INSTALLING_VIEW: '{name}을 {view}로 설치 중',
    INSTALL_VIEW_SUCCESS: '{name} 뷰가 성공적으로 설치되었습니다',
    ADD_TABLE_INDEX: '테이블 {table}의 열 {column}에 인덱스 추가'
  }
}
export default id =>
  new Logger({
    scope: 'DATABASE',
    code,
    i18n,
    id
  })
