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
  testUserToken = "Bearer " + jwt.sign(testUser, jwt_secret);
  testAdminToken = "Bearer " + jwt.sign(testAdmin, jwt_secret);

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
      .set("authorization", testUserToken);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(2);
  });
  test("get workout with name indoor", async () => {
    const resp = await request(app)
      .get("/workouts?name=indoor")
      .set("authorization", testUserToken);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });
});

describe("POST /plan", function () {
  test("add a plan successfully", async () => {
    const resp = await request(app)
      .post("/workouts/plan")
      .set("authorization", testUserToken)
      .send({
        name: "lowebody",
        notes: "lowerbody program",
        sun: true,
        mon: false,
        tue: true,
        wed: false,
        thu: true,
        fri: false,
        sat: false,
        workouts: [1, 2],
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      result: "success",
    });
  });
});

describe("GET /plan", () => {
  test("plan retrive all plans", async () => {
    const preReq = await request(app)
      .post("/workouts/plan")
      .set("authorization", testUserToken)
      .send({
        token: testUserToken,
        name: "lowebody",
        notes: "lowerbody program",
        sun: true,
        mon: false,
        tue: true,
        wed: false,
        thu: true,
        fri: false,
        sat: false,
        workouts: [1, 2],
      });
    const resp = await request(app)
      .get("/workouts/plan")
      .set("authorization", testUserToken);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBe(1);
  });
});

describe("GET /plan/planId", () => {
  test("plan retrive all plans", async () => {
    const preReq = await request(app)
      .post("/workouts/plan")
      .set("authorization", testUserToken)
      .send({
        token: testUserToken,
        name: "lowebody",
        notes: "lowerbody program",
        sun: true,
        mon: false,
        tue: true,
        wed: false,
        thu: true,
        fri: false,
        sat: false,
        workouts: [1, 2],
      });
    const result = await db.query("SELECT id FROM plans");
    const planId = result.rows[0].id;
    const resp = await request(app)
      .get("/workouts/plan/" + planId)
      .set("authorization", testUserToken);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.length).toBeGreaterThanOrEqual(1);
  });
});

afterEach(async function () {
  await db.query("DELETE FROM workout");
  await db.query("DELETE FROM plan_workouts");
  await db.query("DELETE FROM plans");
  await db.query("DELETE FROM users");
});
afterAll(async () => {
  await db.end();
});
