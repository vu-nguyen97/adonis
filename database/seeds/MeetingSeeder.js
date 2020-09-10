'use strict'

/*
|--------------------------------------------------------------------------
| MeetingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Room = use('App/Models/Room')

class MeetingSeeder {
  static async run () {
    const meeting = await Factory
      .model('App/Models/Meeting')
      // .create()
      .make()
    
    const activedRoom = await Room.first()
    await activedRoom.meeting().save(meeting)
  }
}

module.exports = MeetingSeeder
