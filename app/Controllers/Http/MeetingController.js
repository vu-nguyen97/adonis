'use strict'

const Meeting = use('App/Models/Meeting')
const Room = use('App/Models/Room')

class MeetingController {
  async store ({ request, response }) {
    try {
      const data = request.only(['room_id', 'start_time', 'end_time'])

      const roomExist = Room.findBy('id', data.room_id)
      if(!roomExist) {
        return response.status(400).send({
          message: { error: 'Room not found!' }
        })
      }

      const meetingExist = await Meeting
        .query()
        .where(function(){
          this
            .where('start_time', '<=', data.start_time).andWhere('end_time', '>=', data.end_time)
        })
        .orWhere(function(){
          this
            .where('start_time', '<=', data.start_time).andWhere('end_time', '>', data.start_time)
        })
        .orWhere(function(){
          this
            .where('start_time', '>=', data.start_time).andWhere('start_time', '<', data.end_time)
        })
        .count()

      if(meetingExist[0]['count(*)']) {
        return response.status(400).send({
          message: { error: 'Room will be used during that time.' }
        })
      }

      const meeting = Meeting.create(data)
      return meeting

    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = MeetingController
