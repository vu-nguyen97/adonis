'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MeetingType extends Model {
  meetings() {
    return this.hasMany('App/Models/Meeting')
  }
}

module.exports = MeetingType
