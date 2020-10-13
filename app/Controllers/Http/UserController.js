'use strict'

const moment = require('moment')
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
    const data = request.only(['meeting_id'])

    const users = await User.all()
    if (!data.meeting_id) {
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

  async meeting ({ auth, request }) {
    let startTime = request.input('start_time') || new Date
    startTime = moment(startTime).format('YYYY-MM-DD 00:00:00')

    const user = await auth.getUser()
    let userMeetings = null
    let endTime = request.input('end_time')
    if (endTime) {
      endTime = moment(endTime).format('YYYY-MM-DD 23:59:59')

      userMeetings = await UserMeeting
        .query()
        .where('user_id', user.id)
        .with('meeting', builder => {
          builder.andWhere('start_time', '>', startTime)
          builder.andWhere('end_time', '<', endTime)
          builder.with('meetingType')
          builder.with('room')
          builder.with('users')
        })
        .fetch()
    } else {
      userMeetings = await UserMeeting
        .query()
        .where('user_id', user.id)
        .with('meeting', builder => {
          builder.andWhere('start_time', '>', startTime)
          builder.with('meetingType')
          builder.with('room')
          builder.with('users')
        })
        .fetch()
    }

    return userMeetings.toJSON().filter(
      userMeeting => userMeeting.meeting ? true : false
    )
  }
}

module.exports = UserController
