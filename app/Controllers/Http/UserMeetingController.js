'use strict'

const User = use('App/Models/User')
const Meeting = use('App/Models/Meeting')
const UserMeeting = use('App/Models/UserMeeting')

class UserMeetingController {
  async store ({request, response}) {
    try {
      const data = request.input('data')

      return UserMeeting.createMany(data)
      
      // const { user_id, meeting_id } = data

      // const meetingExist = await Meeting.find(meeting_id)
      // if (!meetingExist) {
      //   return response
      //   .send({ message: 'Not found meeting_id' })
      // }

      // const userExist = await User.find(user_id)
      // if (!userExist) {
      //   return response
      //     .send({ message: 'Not found user_id' })
      // }

      // const userMeeting = await UserMeeting
      //   .query()
      //   .where('user_id', user_id)
      //   .andWhere('meeting_id', meeting_id)
      //   .count()
      
      // if (userMeeting[0]['count(*)']) {
      //   return response
      //     .send({ message: 'Don\'t add this user to meeting' })
      // }
      // const is_created_user = false
      // return await UserMeeting.create({user_id, meeting_id, is_created_user})
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = UserMeetingController
