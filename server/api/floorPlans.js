const router = require("express").Router();
const { FloorPlan } = require("../db/models");
module.exports = router;

//floorPlans routes go here
router.get("/:userId", async (req, res, next) => {
  try {
    const userFloorPlans = await FloorPlan.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(userFloorPlans);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { coordinates } = req.body;
    const newFloorPlan = await FloorPlan.create({
      coordinates
    });
    res.json(newFloorPlan);
  } catch (error) {
    next(error);
  }
});
