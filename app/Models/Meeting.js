'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
  room() {
    return this.belongsTo('App/Models/Room')
  }
  meetingType() {
    return this.belongsTo('App/Models/MeetingType')
  }
  users() {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('user_meetings')
      .withPivot(['is_created_user'])
      .withTimestamps()
  }

  static scopeCheckMeetingExist(query, start_time, end_time, room_id) {
    return query
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
  }
}

module.exports = Meeting
