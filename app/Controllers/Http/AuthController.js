'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ request, auth, response }) {
    const data = request.all()
    let password = data.password
    let email = data.email
    let user = null

    if (!email && data.username) {
      user = await User.findBy('username', data.username)
    } else {
      user = await User.findBy('email', email)
    }

    if(!user) {
      return response.status(400).send({
        message: 'Log in failed'
      })
    }

    email = data.email || user.email
    const userAuth = await auth.attempt(email, password)
    const { id, username, role_id, department_id } = user
    
    return {
      id,
      role_id,
      email: user.email,
      username,
      department_id,
      token: userAuth.token
    }
  }
}

module.exports = AuthController
