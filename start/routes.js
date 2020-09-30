'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('login', 'AuthController.login')

Route.group(() => {
  Route.post('token', 'AuthController.refreshToken')
  
  Route.post('user', 'UserController.store').validator('User')
  Route.get('user', 'UserController.index')
  Route.get('user/meetings', 'UserController.meeting')

  Route.post('room-list/', 'RoomController.store').validator('Room')
  Route.get('room-list/', 'RoomController.index')
  
  Route.put('meeting/', 'MeetingController.update').validator('Meeting')
  Route.post('meeting/', 'MeetingController.store').validator('Meeting')
  Route.get('meeting/:meeting_id', 'MeetingController.index')

  Route.post('meeting/add-person', 'UserMeetingController.store').validator('UserMeeting')
  Route.delete('meeting/add-person', 'UserMeetingController.destroy')

}).middleware('auth')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
