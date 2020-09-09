'use strict';

const RoomSeeder = require('./RoomSeeder');
const MeetingSeeder = require('./MeetingSeeder');
const UserSeeder = require('./UserSeeder');
const RoleSeeder = require('./RoleSeeder');
const DepartmentSeeder = require('./DepartmentSeeder');

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    // Ref: https://github.com/adonisjs/lucid/issues/307
    await UserSeeder.run()
    await DepartmentSeeder.run()
    await RoleSeeder.run()
    await RoomSeeder.run()
    await MeetingSeeder.run()
  }
}

module.exports = DatabaseSeeder