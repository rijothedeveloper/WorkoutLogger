process.env.NODE_ENV = "test";
const db = require("../db");

const request = require("supertest");

const app = require("../app");

beforeEach(async function () {
  await request(app)
    .post("/user/register")
    .send({ username: "rijo1", password: "poopoo" });
});

afterEach(async function () {
  await db.query("DELETE FROM users");
});

afterAll(async function () {
  await db.end();
});

describe("/user/register", () => {
  test("register a new user", async function () {
    const resp = await request(app)
      .post("/user/register")
      .send({ username: "george1", password: "zoozoo" });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      username: "george1",
    });
  });
});

describe("/user/login", () => {
  test("login user", async () => {
    const resp = await request(app)
      .post("/user/login")
      .send({ username: "rijo1", password: "poopoo" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      message: "Logged in!",
    });
  });
});
