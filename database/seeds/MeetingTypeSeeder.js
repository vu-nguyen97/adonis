'use strict'

/*
|--------------------------------------------------------------------------
| MeetingTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class MeetingTypeSeeder {
  static async run () {
    await Factory
      .model('App/Models/MeetingType')
      .createMany(5)
  }
}

module.exports = MeetingTypeSeeder
