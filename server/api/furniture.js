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

router.post("/", async (req, res, next) => {
  try {
    const { type, dimensions, userId } = req.body;
    //previously, we broke up dimensions with + to coerce into a number, but we were able to do this in furniturescreen submitFurniture before sending to database
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
