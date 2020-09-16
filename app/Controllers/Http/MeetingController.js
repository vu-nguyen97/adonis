'use strict'

const Meeting = use('App/Models/Meeting')
const Room = use('App/Models/Room')

class MeetingController {
  async store ({ request, response }) {
    try {
      const data = request.only(['user_id', 'room_id', 'start_time', 'end_time', 'type'])
      const { start_time, end_time, user_id, room_id, type } = data

      const roomExist = Room.findBy('id', room_id)
      if(!roomExist) {
        return response.status(400).send({
          message: { error: 'Room not found!' }
        })
      }

      const meetingExist = await Meeting
        .query()
        .where('room_id', room_id)
        .andWhere(function() {
          this
            .where(function(){
              this
                .where('start_time', '<=', start_time).andWhere('end_time', '>=', end_time)
            })
            .orWhere(function(){
              this
                .where('start_time', '<=', start_time).andWhere('end_time', '>', start_time)
            })
            .orWhere(function(){
              this
                .where('start_time', '>=', start_time).andWhere('start_time', '<', end_time)
            })
        })
        .count()

      if(meetingExist[0]['count(*)']) {
        return response.status(400).send({
          message: { error: 'Room will be used during that time.' }
        })
      }

      const meeting = await Meeting.create({start_time, end_time, room_id, type})
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
}

module.exports = MeetingController
