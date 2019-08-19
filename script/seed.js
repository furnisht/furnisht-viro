"use strict";

const db = require("../server/db");
const { User, FloorPlan, Furniture } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      email: "cody@email.com",
      password: "123"
    }),
    User.create({
      email: "murphy@email.com",
      password: "123"
    })
  ]);
  console.log(`seeded ${users.length} users`);

  const floorPlans = await Promise.all([
    FloorPlan.create({
      userId: 1,
      coordinates: [
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 },
        { x: -1, y: 1 }
      ]
    }),
    FloorPlan.create({
      userId: 2,
      coordinates: [
        { x: 2, y: 2 },
        { x: 2, y: -2 },
        { x: -2, y: -2 },
        { x: -2, y: 2 }
      ]
    })
  ]);
  console.log(`seeded ${floorPlans.length} floor plans`);

  const furniture = await Promise.all([
    Furniture.create({
      type: "Couch",
      name: 'living room couch',
      userId: 1,
      dimensions: { x: 3, y: 1, z: 1 }
    }),
    Furniture.create({
      type: "Bed",
      name: 'my bed',
      userId: 1,
      dimensions: { x: 1, y: 0.5, z: 2 }
    }),
    Furniture.create({
      type: "Table",
      name: 'dining room table',
      userId: 1,
      dimensions: { x: 1, y: 1, z: 1 }
    }),
    Furniture.create({
      type: "Other",
      name: 'dresser',
      userId: 1,
      dimensions: { x: 2, y: 2, z: 2 }
    }),
    Furniture.create({
      type: "Couch",
      name: 'tv room couch',
      userId: 2,
      dimensions: { x: 3.1, y: 1.1, z: 1.1 }
    }),
    Furniture.create({
      type: "Bed",
      name: 'my bed',
      userId: 2,
      dimensions: { x: 1.1, y: 0.6, z: 2.1 }
    }),
    Furniture.create({
      type: "Table",
      name: 'kitchen table',
      userId: 2,
      dimensions: { x: 1.1, y: 1.1, z: 1.1 }
    }),
    Furniture.create({
      type: "Other",
      name: 'grand piano',
      userId: 2,
      dimensions: { x: 2.1, y: 2.1, z: 2.1 }
    })
  ]);
  console.log(`seeded ${furniture.length} furniture`);

  console.log(`seeded everything successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
