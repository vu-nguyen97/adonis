'use strict'

const Database = use('Database')
const UserMeeting = use('App/Models/UserMeeting')
const User = use('App/Models/User')
const roles = {
  1: 'admin',
  2: 'user'
}

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password', 'role_id', 'department_id'])
      if (!data.role_id) {
        data.role_id = Object.keys(roles)[1]
      }

      const emailExists = await User.findBy('email', data.email)
      const usernameExists = await User.findBy('username', data.username)
      
      if (emailExists || usernameExists) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' } })
      }

      const user = await User.create(data)
      return user
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  async index ({request, response}) {
    const data = request.all()
    if(data.id) {
      return await User.findBy('id', data.id)
    }
    if (data.email) {
      return await User.findBy('email', data.email)
    }
    if (data.username) {
      return await User.findBy('username', data.username)
    }
    return response.send('Error get user: email and username invaild')
  }

  async meeting ({request, response}) {
    const userId = request.input('id')
    const meetings = await UserMeeting
      .query()
      .where('user_id', userId)
      .with('meeting')
      .fetch()

    return meetings
  }
}

module.exports = UserController
