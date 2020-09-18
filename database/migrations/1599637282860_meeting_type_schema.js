'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingTypeSchema extends Schema {
  up () {
    this.create('meeting_types', (table) => {
      table.increments()
      table.string('type', 30).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('meeting_types')
  }
}

module.exports = MeetingTypeSchema
