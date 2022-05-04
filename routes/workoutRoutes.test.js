process.env.NODE_ENV = "test";
const db = require("../db");

const request = require("supertest");

const app = require("../app");

beforeEach(async function () {
  let query =
    "insert into workout (category, name, muscles, description, image_url, video_url) values (1,'outdoor walk test', 2, 'walk outside test','https://support.apple.com/library/content/dam/edam/applecare/images/en_US/navicons/content-nav-watch-workout-walking-icon.png', null)";
  await db.query(query);
  query =
    "insert into workout (category, name, muscles, description, image_url, video_url) values (1,'indoor walk test', 2, 'walk inside test','https://support.apple.com/library/content/dam/edam/applecare/images/en_US/navicons/content-nav-watch-workout-walking-icon.png', null)";
  await db.query(query);
});

describe("GET /workout", function () {
  test("get all workouts", async () => {
    const resp = await request(app).get("/workouts");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(2);
  });
  test("get workout with name indoor", async () => {
    const resp = await request(app).get("/workouts?name=indoor");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });
});

afterEach(async function () {
  await db.query("DELETE FROM workout");
});
afterAll(async () => {
  await db.end();
});
