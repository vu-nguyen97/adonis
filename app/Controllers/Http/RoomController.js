'use strict'

const moment = require('moment')
const Room = use('App/Models/Room')

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

  async index ({request}) {
    const currentDate = new Date()
    const requestDate = request.input('date', currentDate)

    const startTime = moment(requestDate).format('YYYY-MM-DD 00:00:00')
    const endTime = moment(startTime).add(1, 'days').format('YYYY-MM-DD 00:00:00')

    const rooms = await Room
      .query()
      .with('meetings', (builder) => {
        builder.where('meetings.start_time', '>=', startTime).andWhere('end_time', '<', endTime )
      })
      .fetch()
    return rooms
  }
}

module.exports = RoomController
