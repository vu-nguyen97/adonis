'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CustomValidationProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  async userExistsFn(data, field, message, args, get) {
    const userId = get(data, field);
    const row = await use('App/Models/User').find(userId);
    if (!row) {
      throw 'User not found';
    }
  }

  async meetingExistsFn(data, field, message, args, get) {
    const meetingId = get(data, field);
    const row = await use('App/Models/Meeting').find(meetingId);
    if (!row) {
      throw 'Meeting not found';
    }
  }

  async userMeetingExistsFn(data, field, message, args, get) {
    const userMeeting = get(data, field);
    const row = await use('App/Models/UserMeeting')
      .query()
      .where('user_id', userMeeting.user_id)
      .where('meeting_id', userMeeting.meeting_id)
      .where('is_created_user', userMeeting.is_created_user)
      .count()
    
    if (row[0]['count(*)']) {
      throw 'User joined the meeting';
    }
  }
  
  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator');
    Validator.extend('userExists', this.userExistsFn);
    Validator.extend('meetingExists', this.meetingExistsFn);
    Validator.extend('userMeetingExists', this.userMeetingExistsFn);
  }
}

module.exports = CustomValidationProvider
