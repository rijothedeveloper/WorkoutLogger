process.env.NODE_ENV = "test";
const db = require("../db");

const request = require("supertest");

const app = require("../app");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret, BCRYPT_WORK_FACTOR } = require("../config");

let testUserToken;
let testAdminToken;

beforeEach(async function () {
  const hashedPassword = await bcrypt.hash("secret", BCRYPT_WORK_FACTOR);
  await db.query(`INSERT INTO users VALUES ('test', $1)`, [hashedPassword]);
  await db.query(`INSERT INTO users VALUES ('admin', $1)`, [hashedPassword]);

  const testUser = { username: "test" };
  const testAdmin = { username: "admin" };
  testUserToken = jwt.sign(testUser, jwt_secret);
  testAdminToken = jwt.sign(testAdmin, jwt_secret);

  let query =
    "insert into workout (category, name, muscles, description, image_url, video_url) values (1,'outdoor walk test', 2, 'walk outside test','https://support.apple.com/library/content/dam/edam/applecare/images/en_US/navicons/content-nav-watch-workout-walking-icon.png', null)";
  await db.query(query);
  query =
    "insert into workout (category, name, muscles, description, image_url, video_url) values (1,'indoor walk test', 2, 'walk inside test','https://support.apple.com/library/content/dam/edam/applecare/images/en_US/navicons/content-nav-watch-workout-walking-icon.png', null)";
  await db.query(query);
});

describe("GET /workout", function () {
  test("get all workouts", async () => {
    const resp = await request(app)
      .get("/workouts")
      .send({ token: testUserToken });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(2);
  });
  test("get workout with name indoor", async () => {
    const resp = await request(app)
      .get("/workouts?name=indoor")
      .send({ token: testUserToken });
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
