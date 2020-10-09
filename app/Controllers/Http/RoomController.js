'use strict'

const moment = require('moment')
const Room = use('App/Models/Room')
const Meeting = use('App/Models/Meeting')
const MeetingType = use('App/Models/MeetingType')

class RoomController {
  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'address'])
      const room = await Room.create(data)
      return room

    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  async index ({ params, request, response }) {
    const activedDate = request.input('date')
    if (activedDate) {
      const startTime = moment(activedDate).format('YYYY-MM-DD 00:00:00')
      const endTime = moment(startTime).add(1, 'days').format('YYYY-MM-DD 00:00:00')

      const rooms = await Room
        .query()
        .with('meetings', (builder) => {
          builder.where('meetings.start_time', '>=', startTime).andWhere('end_time', '<', endTime )
        })
        .fetch()
      return rooms
    }

    const { meeting_id } = params
    let responseData = {}
    if (meeting_id != null) {
      const meetingExists = await Meeting.find(meeting_id)
      if (!meetingExists) {
        return response.status(400).send({
          message: 'Error: not found this meeting_id'
        })
      }
      const meeting = await Meeting
        .query()
        .where('id', meeting_id)
        .with('room')
        .first()
      responseData = Object.assign({}, responseData, {
        'meeting': meeting.toJSON()
      })
    }
    const rooms = await Room.all()
    const meetingTypes = await MeetingType.all()

    responseData = Object.assign({}, responseData, {
      'rooms': rooms.toJSON()
    })
    responseData = Object.assign({}, responseData, {
      'meetingTypes': meetingTypes.toJSON()
    })
    return responseData
  }

  async getRoomsInfo({}) {
    return Room.all()
  }
}

module.exports = RoomController
