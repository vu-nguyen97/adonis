'use strict'

const User = use('App/Models/User')
const roles = {
  1: 'admin',
  2: 'user'
}

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password', 'role_id', 'department_id'])
      if (!data.role_id) {
        data.role_id = Object.keys(roles)[1]
      }

      const emailExists = await User.findBy('email', data.email)
      const usernameExists = await User.findBy('username', data.username)
      
      if (emailExists || usernameExists) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' } })
      }

      const user = await User.create(data)
      return user
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  async index ({request, response}) {
    const data = request.all()
    if (data.email) {
      const user = await User.findBy('email', data.email)
      return user
    }
    if (data.username) {
      const user = await User.findBy('username', data.username)
      return user
    }
    return response.send('Error get user: email and username invaild')
  }
}

module.exports = UserController
