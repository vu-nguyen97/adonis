'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
  room() {
    return this.hasOne('App/Models/Room')
  }
}

module.exports = Meeting
