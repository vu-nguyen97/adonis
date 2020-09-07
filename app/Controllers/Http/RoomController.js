'use strict'

const Room = use('App/Models/Room')

class RoomController {
  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'address'])

      const roomExist = await Room.findBy('address', data.address)
      if (roomExist) {
        return response
          .status(400)
          .send({
            message: { error: 'Room already exist!'}
          })
      }

      const room = await Room.create(data)
      return room

    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = RoomController
