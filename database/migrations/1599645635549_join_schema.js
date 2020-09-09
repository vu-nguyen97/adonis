'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JoinSchema extends Schema {
  up () {
    this.create('joins', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('meeting_id').unsigned().references('id').inTable('meetings')
      table.timestamps()
    })
  }

  down () {
    this.drop('joins')
  }
}

module.exports = JoinSchema
