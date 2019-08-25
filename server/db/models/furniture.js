const Sequelize = require("sequelize");
const db = require("../db");

const Furniture = db.define("furniture", {
  type: {
    type: Sequelize.ENUM("Couch", "Table", "Bed", "Other")
  },
  room: {
    type: Sequelize.ENUM(
      "Kitchen",
      "Living Room",
      "Dining Room",
      "Bedroom",
      "Other"
    )
  },
  name: {
    type: Sequelize.STRING
  },
  dimensions: {
    type: Sequelize.JSON
  }
});

Furniture.getRoom = async function(userId, roomName) {
  try {
    const furniture = await Furniture.findAll({
      where: {
        room: roomName,
        id: userId
      }
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports = Furniture;
