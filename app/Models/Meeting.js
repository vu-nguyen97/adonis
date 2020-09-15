'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
  room() {
    return this.hasOne('App/Models/Room')
  }
  users() {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('user_meetings')
      .withTimestamps()
  }
}

module.exports = Meeting
