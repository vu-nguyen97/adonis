'use strict'

const MeetingType = use('App/Models/MeetingType')

class MeetingTypeController {
  async getMeetingTypesInfo({}) {
    return MeetingType.all()
  }
}

module.exports = MeetingTypeController
