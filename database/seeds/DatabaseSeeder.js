'use strict';

const RoomSeeder = require('./RoomSeeder');
const MeetingSeeder = require('./MeetingSeeder');
const UserSeeder = require('./UserSeeder');
const RoleSeeder = require('./RoleSeeder');
const DepartmentSeeder = require('./DepartmentSeeder');
const UserMeetingSeeder = require('./UserMeetingSeeder');
const MeetingTypeSeeder = require('./MeetingTypeSeeder');

class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
    // Ref: https://github.com/adonisjs/lucid/issues/307
    await DepartmentSeeder.run()
    await RoleSeeder.run()
    await UserSeeder.run()
    await RoomSeeder.run()
    await MeetingTypeSeeder.run()
    await MeetingSeeder.run()
    await UserMeetingSeeder.run()
  }
}

module.exports = DatabaseSeeder