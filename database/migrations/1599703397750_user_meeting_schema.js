'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMeetingSchema extends Schema {
  up () {
    this.create('user_meetings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('meeting_id').unsigned().references('id').inTable('meetings')
      table.boolean('is_created_user').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_meetings')
  }
}

module.exports = UserMeetingSchema
