'use strict'

/*
|--------------------------------------------------------------------------
| UserMeetingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Meeting = use('App/Models/Meeting')
const User = use('App/Models/User')

class UserMeetingSeeder {
  static async run () {
    // await Factory
    //   .model('App/Models/UserMeeting')
    //   .create()
    
    const activedUser = await User.first()
    const activedMeeting = await Meeting.first()
    await activedUser.meeting().attach(activedMeeting.id, (row) => {
      row.is_created_user = true
    })
  }
}

module.exports = UserMeetingSeeder
