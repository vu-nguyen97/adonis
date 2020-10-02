'use strict'

class Meeting {
  get rules () {
    return {
      room_id: 'required | roomExists',
      meeting_type_id: 'required | meetingTypeExists',
      start_time: 'required | checkAvailableTime',
      end_time: 'required'
    }
  }
}

module.exports = Meeting
