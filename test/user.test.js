const supertest = require("supertest");
const { User } = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

describe("/api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all users", async () => {
      const users = [
        { name: "test", email: "test@gmail.com", gender: "male" },
        { name: "test1", email: "test1@gmail.com", gender: "female" },
      ];
      await User.insertMany(users);
      console.log(users);
      const res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male",
      });
      await user.save();
      const res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", user.name);
    });

    it("should return 400 error when invalid object id is passed", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.status).to.equal(400);
    });
    it("should return 400 error when valid object id passed but does not exist", async () => {
      const res = await request(app).get("/api/users/11111");
      expect(res.status).to.equal(400);
    });
  });
});
