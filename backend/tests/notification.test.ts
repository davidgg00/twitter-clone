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

  it("should user be able to log in to get token", async () => {
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

  it("should be able to create new Notification", async () => {
    await api
      .post("/api/notification/new")
      .set("x-auth-token", token)
      .send({
        user_id: 9999,
        user_id_send: 1,
        type: "follow",
      })
      .expect(201)
      .expect("Content-Type", /json/);
  });

  it("should be able to get new Notifications", async () => {
    await api
      .get("/api/notification/getNew/9999")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should be able to get All Notifications", async () => {
    await api
      .get("/api/notification/getAll/9999")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should be able to get read All Notifications", async () => {
    await api
      .post("/api/notification/readAll/9999")
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

export {};
