const Sequelize = require('sequelize')
const db = require('../db')

const FloorPlan = db.define('floorPlan', {
  coordinates: {
    type: Sequelize.JSON
  }
})

module.exports = FloorPlan