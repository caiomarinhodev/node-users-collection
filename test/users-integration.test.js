const app = require("../app");
const request = require("supertest")(app);

describe("Integration tests for /api/users", () => {
  let lastId = 0;

  beforeAll(async () => {
    const response = await request.get("/api/users");
    const users = response.body;
    const idUser = users[users.length - 1]._id;
    lastId = idUser + 1;
  });

  it("should return an array of users", async () => {
    const response = await request.get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add a new user", async () => {
    const res = await request.post("/api/users").send({
      _id: lastId,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should update an existing user", async () => {
    const res = await request.put(`/api/users/${lastId - 1}`).send({
      name: "Jane Doe",
    });
    expect(res.statusCode).toEqual(200);
    expect(res._body.data.name).toEqual("Jane Doe");
  });

  it("should get a single user by ID", async () => {
    const res = await request.get(`/api/users/${lastId - 1}`);
    expect(res.statusCode).toEqual(200);
    console.log(res._body);
    expect(res._body._id).toEqual(lastId - 1);
  });

  it("should update just name", async () => {
    const res2 = await request.put(`/api/users/${lastId - 1}`).send({
      name: "Jane Doe",
    });
    expect(res2.statusCode).toEqual(200);
    expect(res2._body.data.name).toEqual("Jane Doe");
  });

  it("should update just email", async () => {
    const res2 = await request.put(`/api/users/${lastId - 1}`).send({
      email: "new_email@outlook.com",
    });

    expect(res2.statusCode).toEqual(200);
    expect(res2._body.data.email).toEqual("new_email@outlook.com");
  });

  //check if just update password
  it("should update just password", async () => {
    const res2 = await request.put(`/api/users/${lastId}`).send({
      password: "new_password",
    });
    expect(res2.statusCode).toEqual(200);
    expect(res2._body.data.password).toEqual("new_password");
  });

  it("should delete an existing user", async () => {
    const res = await request.delete(`/api/users/${lastId - 1}`);
    expect(res.statusCode).toEqual(204);
  });
});

describe("Unit tests", () => {
  beforeAll(() => {
    console.log("Before all tests");
  });
  it("should return true", () => {
    expect(true).toBe(true);
  });

  it("should return false", () => {
    expect(false).toBe(false);
  });

  it("should return null", () => {
    expect(null).toBeNull();
  });
});
