'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ request, auth, response }) {
    const data = request.all()
    let password = data.password
    let email = data.email || ''
    let user = null

    if (email) {
      user = await User.findBy('email', email)
    } else if (!email && data.username) {
      user = await User.findBy('username', data.username)
      email = user ? user.email : ''
    } else {
      return 'Log in fail'
    }

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
