const router = require("express").Router();
const { Furniture } = require("../db/models");
module.exports = router;

//Furniture routes go here
router.get("/:userId", async (req, res, next) => {
  try {
    const userFurniture = await Furniture.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(userFurniture);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/:roomName", async (req, res, next) => {
  try {
    const roomFurniture = await Furniture.getRoom(
      req.params.userId,
      req.params.roomName
    );
    res.send(roomFurniture);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { type, dimensions, userId } = req.body;
    const newFurniture = await Furniture.create({
      type,
      dimensions,
      userId
    });
    res.json(newFurniture);
  } catch (error) {
    next(error);
  }
});
