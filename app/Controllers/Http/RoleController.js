'use strict'

const Role = use('App/Models/Role')

class RoleController {
  async store ({ req, res }) {
    try {
      const data = req.only(['role'])
      const role = await Role.create(data)
      return role

    } catch (err) {
      return res
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = RoleController
