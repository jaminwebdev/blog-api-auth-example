import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

test("v1 route", async () => {
  await request(app)
    .get("/api/v1")
    .expect(200)
    .then((response) => {
      assert.strictEqual(response.body.message, "API is live");
    });
});
