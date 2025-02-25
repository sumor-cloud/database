# database

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/database)
A database connector for MySQL, etc. Based on entity.

[![CI](https://github.com/sumor-cloud/database/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/database/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/database/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/database/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/database/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/database/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/database/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/database/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/database --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 18.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

### installation database

You can use install method to install entity and view to database.

database.install(config, [resource path], [resource data])

case 1: install entity and view from resource path, it will load data/entity and data/view from project root path.

```js
import database from '@sumor/database'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
}

await database.install(config.database, process.cwd() + '/data')
```

case 2: install entity and view from resource data, it will load data/entity and data/view from data object.

```js
import database from '@sumor/database'

await database.install(config, {
  entity: {
    Car: {
      property: {
        brand: {
          type: 'string',
          length: 100
        },
        model: {
          type: 'string',
          length: 100
        }
      }
    }
  },
  view: {}
})
```

### General Usage

```js
import database from '@sumor/database'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
}

// get client with connection pool
const client = await database.client(config)

// get connection
const db = await client.connect()

// set operate user
db.setUser('tester')

// create record
const car1Id = await db.insert('Car', {
  brand: 'BMW',
  model: 'X5'
})
const car2Id = await db.insert('Car', {
  brand: 'BMW',
  model: 'X6'
})

// read record
const car = await db.single('Car', { id: carId })
// car = {id: car1Id, brand: 'BMW', model: 'X5'}

// query records
const cars = await db.query('Car', {
  brand: 'BMW'
})
// cars = [{id: car1Id, brand: 'BMW', model: 'X5'}, {id: car2Id, brand: 'BMW', model: 'X6'}]

// count records
const count = await db.count('Car', {
  brand: 'BMW'
})
// count = 2

// update record
await db.update(
  'Car',
  { id: car1Id },
  {
    brand: 'BMW',
    model: 'X5M'
  }
)

// ensure record
await db.ensure('Car', ['brand'], {
  brand: 'BMW',
  model: 'X5C'
})
// will not insert record if brand is 'BMW' already exists

// modify record
await db.modify('Car', ['brand'], {
  brand: 'BMW',
  model: 'X5C'
})
// will update record model if brand is 'BMW' already exists

// delete record
await db.delete('Car', { id: car1Id })

// close connection
await db.commit()

// rollback
await db.rollback()

// close connection
await db.release()

// destroy client when server should be shutdown
await client.destroy()
```

### Query Options

```js
// query records with options
const cars = await db.select(
  'Car',
  {
    brand: 'BMW'
  },
  {
    term: 'X5',
    termRange: ['model'],
    top: 10,
    skip: 0
  }
)
```

### Entity Definition Options

#### Index

you can add index array to entity definition to create index on table, by default, it will create index on `id` field.

#### Join

you can add join object to entity definition to create join on table.
like below example, it will create userId field in Car entity.

```js
import database from '@sumor/database'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
}

await database.install(config, {
  entity: {
    Car: {
      property: {
        brand: {
          type: 'string',
          length: 100
        },
        model: {
          type: 'string',
          length: 100
        }
      },
      index: ['userId'],
      join: {
        user: 'User'
      }
    }
  },
  view: {}
})
```
