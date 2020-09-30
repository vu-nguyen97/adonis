'use strict'

const UserMeeting = use('App/Models/UserMeeting')

class UserMeetingController {
  async store ({request, response}) {
    try {
      const data = request.input('data')
      return UserMeeting.createMany(data)
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  async destroy ({ request, response }) {
    const data = request.only(['user_id', 'meeting_id'])
    const { user_id, meeting_id } = data

    const userMeetingExists = await UserMeeting
      .query()
      .where('user_id', user_id)
      .andWhere('meeting_id', meeting_id)
      .count('* as total')
      
    if (userMeetingExists[0].total == 0) {
      return response.status(400).send({ message: 'Deleting the user in this meeting is not successful' })
    }
    await UserMeeting
      .query()
      .where('user_id', user_id)
      .andWhere('meeting_id', meeting_id)
      .delete()
    
    return response.status(200).send({ message: 'Delete the user successfully'})
  }
}

module.exports = UserMeetingController
