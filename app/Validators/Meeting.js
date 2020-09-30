'use strict'

class Meeting {
  get rules () {
    return {
      room_id: 'required | roomExists',
      meeting_type_id: 'required | meetingTypeExists'
    }
  }
}

module.exports = Meeting
