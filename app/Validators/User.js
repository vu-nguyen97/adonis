'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users,username',
      password: 'required',
      department_id: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'username.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }
}

module.exports = User
