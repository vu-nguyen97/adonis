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
const MeetingType = use('App/Models/MeetingType')

class MeetingSeeder {
  static async run () {
    const meeting = await Factory
      .model('App/Models/Meeting')
      // .create()
      .make()
    
    const activedRoom = await Room.first()
    const activedMeetingType = await MeetingType.first()
    await activedMeetingType.meetings().save(meeting)
    await activedRoom.meetings().save(meeting)
  }
}

module.exports = MeetingSeeder
