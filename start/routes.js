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
Route.post('user', 'UserController.store')
Route.get('user', 'UserController.index')
Route.get('user/meetings', 'UserController.meeting')

Route.post('login', 'AuthController.login')

Route.post('room-list/', 'RoomController.store')
Route.get('room-list/', 'RoomController.index')

Route.put('room-list/', 'MeetingController.update')
Route.post('meeting/', 'MeetingController.store')
Route.get('meeting/', 'MeetingController.index')
Route.post('meeting/add-person', 'UserMeetingController.store')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
