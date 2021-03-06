'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const moment = require('moment')
const Factory = use('Factory')

const departments = ['D2', 'D6', 'D9']
const roles = {
  1: 'admin',
  2: 'user'
}
const meetingTypes = {
  1: "Meeting",
  2: "Event",
  3: "Birthday",
  4: "Conference",
  5: "Party",
}

const random = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  const isAdmin = i == 0 ? true : false
  const username = isAdmin ? 'admin' : `user${i}`
  const email = isAdmin ? 'admin@gmail.com' : `user${i}@gmail.com`
  const role_id = isAdmin ? 1 : 2
  const department_id = random(1, 3)

  return {
    username,
    email,
    role_id,
    department_id,
    password: '123'
  }
})

Factory.blueprint('App/Models/Room', async (faker, i, data) => {
  return {
    name: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'][i],
    address: ['8th Floor AC Building', '6th Floor AC Building', '5th Floor AC Building', '9th Floor HL Building', '8th Floor 3A Building'][i]
  }
})

Factory.blueprint('App/Models/Meeting', async () => {
  const current_date = moment(new Date()).format('YYYY-MM-DD')
  return {
    start_time: `${current_date} 09:00:00`,
    end_time: `${current_date} 10:00:00`,
    // meeting_type_id: 1
    // room_id: 1
  }
})

Factory.blueprint('App/Models/MeetingType', async (faker, i) => {
  return {
    type: Object.values(meetingTypes)[i]
  }
})

// Factory.blueprint('App/Models/UserMeeting', async () => {
//   return {
//     is_created_user: true,
//     user_id: 1,
//     meeting_id: 1
//   }
// })

Factory.blueprint('App/Models/Role', async (fake, i, data) => {
  return {
    role: Object.values(roles)[i]
  }
})

Factory.blueprint('App/Models/Department', async (fake, i) => {
  return {
    name: departments[i]
  }
})
