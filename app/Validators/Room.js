'use strict'

class Room {
  get rules () {
    return {
      name: 'required|unique:rooms,name',
      address: 'required|unique:rooms,address'
    }
  }
}

module.exports = Room
