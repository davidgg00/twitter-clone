const supertest = require("supertest");
const { app, server } = require("../server");
const api = supertest(app);
describe("Post Endpoints", () => {
  let token: string;
  it("should create a new user", async () => {
    await api
      .post("/api/user/register")
      .send({
        id: 9999,
        first_name: "jest",
        last_name: "jest",
        dob: "2000-12-12",
        username: "jest",
        password: "jest",
        email: "jest@jest.com",
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should user be able to log in ", async () => {
    await api
      .post("/api/user/login")
      .send({
        username: "jest",
        password: "jest",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res: any) => {
        token = res.body.idToken;
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  it("should get all users", async () => {
    await api
      .get("/api/user/getAllUsers")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should get data of specific user ", async () => {
    await api
      .get("/api/user/getUser/1")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should update user data ", async () => {
    await api
      .put("/api/user/updateUser/1")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should delete user data ", async () => {
    await api
      .delete("/api/user/deleteUser/9999")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  afterAll(() => {
    server.close();
  });
});
