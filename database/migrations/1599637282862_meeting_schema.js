'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingSchema extends Schema {
  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.integer('room_id').unsigned()
      table.datetime('start_time').notNullable()
      table.datetime('end_time').notNullable()
      table.foreign('room_id').references('id').inTable('rooms')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingSchema
