'use strict'

const Meeting = use('App/Models/Meeting')
const Room = use('App/Models/Room')
const MeetingType = use('App/Models/MeetingType')

class MeetingController {
  async store ({ request, response }) {
    try {
      const data = request.only(['user_id', 'room_id', 'start_time', 'end_time', 'meeting_type_id'])
      const { start_time, end_time, user_id, room_id, meeting_type_id } = data

      if (!meeting_type_id) {
        return response.send({
          message: { error: 'Not found this meeting type' }
        })
      }

      const roomExist = Room.findBy('id', room_id)
      if(!roomExist) {
        return response.send({
          message: { error: 'Room not found!' }
        })
      }

      const meetingExist = await Meeting
        .query()
        .checkMeetingExist(start_time, end_time, room_id)
        .count()

      if(meetingExist[0]['count(*)']) {
        return response.send({
          message: { error: 'Room will be used during that time.' }
        })
      }

      const meeting = await Meeting.create({start_time, end_time, room_id, meeting_type_id})
      await meeting.users().attach(user_id, (row) => {
        if (row.user_id == user_id) {
          row.is_created_user = true
        }
      })
      return meeting

    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  async update ({request, response}) {
    const data = request.only(['id', 'room_id', 'start_time', 'end_time', 'meeting_type_id'])
    const { id, start_time, end_time, room_id, meeting_type_id } = data

    const meetingTypeExist = await MeetingType.find(meeting_type_id)
    const roomExist = await Room.find(room_id)
    const meeting = await Meeting.find(id)
    if (!meeting || !meetingTypeExist || !roomExist) {
      return response.status(500).send('Error! Can\'t update this meeting.')
    }

    const meetingTimeExist = await Meeting
      .query()
      .checkMeetingExist(start_time, end_time, room_id)
      .whereNot('id', id)
      .count()
      
    if (meetingTimeExist[0]['count(*)']) {
      return response.send({
        message: 'Edit failed: Room will be used during that time.'
      })
    }

    meeting.merge({
      room_id: room_id,
      meeting_type_id: meeting_type_id,
      start_time: start_time,
      end_time: end_time
    })

    return await meeting.save()
  }

  async index ({request, response}) {
    const meeting_id = request.input('meeting_id')
    const meeting = await Meeting
      .query()
      .where('id', meeting_id)
      .with('room')
      .first()
    if (meeting) {
      return meeting
    }
    return response.send({
      message: 'Error: not found this meeting_id'
    })
  }
}

module.exports = MeetingController
