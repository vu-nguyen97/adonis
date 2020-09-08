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

const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, i) => {
  // const number = randomInteger(0, 1000);
  // return {
  //   username: `test${number}`,
  //   email: `email${number}@gmail.com`,
  //   password: await Hash.make(faker.password())
  // }

  return {
    username: ['user1', 'admin1'][i],
    email: ['user1@gmail.com', 'admin1@gmail.com'][i],
    password: await Hash.make('123456')
  }
})

Factory.blueprint('App/Models/Room', async (faker, i, data) => {
  return {
    name: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'][i],
    address: ['8th Floor AC Building', '6th Floor AC Building', '5th Floor AC Building', '9th Floor HL Building', '8th Floor 3A Building'][i]
  }
})

Factory.blueprint('App/Models/Meeting', async () => {
  return {
    start_time: '2020-09-08 09:00:00',
    end_time: '2020-09-08 10:00:00',
  }
})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min +1) + min)
}
