'use strict'

/*
|--------------------------------------------------------------------------
| DepartmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DepartmentSeeder {
  static async run () {
    await Factory
      .model('App/Models/Department')
      .createMany(3)
  }
}

module.exports = DepartmentSeeder
