'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const Role = use('App/Models/Role')
// const Department = use('App/Models/Department')

class UserSeeder {
  static async run () {
    const user = await Factory
      .model('App/Models/User')
      .createMany(11)
      // .make()
    
    // const activedRole = await Role.first()
    // const activedDepartment = await Department.first()
    // await activedRole.users().save(user)
    // await activedDepartment.users().save(user)
  }
}

module.exports = UserSeeder
