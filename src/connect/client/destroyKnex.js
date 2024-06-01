export default async knex => {
  await new Promise(resolve => {
    knex.destroy(() => {
      resolve()
    })
  })
}
