'use strict'

const UserMeeting = use('App/Models/UserMeeting')

class UserMeetingController {
  async store ({request, response}) {
    try {
      const data = request.input('data')
      return UserMeeting.createMany(data)
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = UserMeetingController
