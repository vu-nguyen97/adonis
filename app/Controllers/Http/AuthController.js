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

    await auth.attempt(email, password)
    return 'Logged in successfully' 
  }
}

module.exports = AuthController
