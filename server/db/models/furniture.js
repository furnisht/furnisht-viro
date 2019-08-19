const Sequelize = require('sequelize')
const db = require('../db')

const Furniture = db.define('furniture', {
  type: {
    type: Sequelize.ENUM('Couch', 'Table', 'Bed', 'Other')
  },
  name: {
    type: Sequelize.STRING
  },
  dimensions: {
    type: Sequelize.JSON
  }
})

module.exports = Furniture