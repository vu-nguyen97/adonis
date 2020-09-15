'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserMeeting extends Model {
  meeting() {
    return this.belongsTo('App/Models/Meeting')
  }
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UserMeeting
