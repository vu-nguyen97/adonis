'use strict'

class UserMeeting {
  get rules () {
    return {
      // Refs: https://forum.adonisjs.com/t/custom-validation/1074
      'data.*.user_id': 'required | userExists : users, id',
      'data.*.meeting_id': 'required | meetingExists : meeting, id',
      'data.*': 'userMeetingExists'
    }
  }
}

module.exports = UserMeeting
