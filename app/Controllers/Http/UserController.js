'use strict'

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
      const user = await User.create(data)
      return user
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  // async index ({request, response}) {
  //   const data = request.all()
  //   if(data.id) {
  //     return await User.findBy('id', data.id)
  //   }
  //   if (data.email) {
  //     return await User.findBy('email', data.email)
  //   }
  //   if (data.username) {
  //     return await User.findBy('username', data.username)
  //   }
  //   return response.send('Error get user: email and username invaild')
  // }

  async index ({ request }) {
    const data = request.only(['fetch_user_joined_meeting', 'meeting_id'])
    const fetchUserJoinedMeeting = data.fetch_user_joined_meeting

    const users = await User.all()
    if (!fetchUserJoinedMeeting) {
      return users
    }

    const userMeeting = await UserMeeting
      .query()
      .where('meeting_id', data.meeting_id)
      .with('user')
      .fetch()

    const dataResponse = {
      ...users,
      userMeeting
    }
    return dataResponse
  }

  async meeting ({ auth, request, response }) {
    const user = await auth.getUser()
    const meetings = await UserMeeting
      .query()
      .where('user_id', user.id)
      .with('meeting', builder => {
        builder.with('room')
      })
      .fetch()

    return meetings
  }
}

module.exports = UserController
