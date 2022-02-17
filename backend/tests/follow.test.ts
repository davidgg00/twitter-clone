const supertest = require("supertest");
const { app, server } = require("../server");
const api = supertest(app);
describe("Post Endpoints", () => {
  let token: string;
  it("should create a first new user to test follows", async () => {
    await api
      .post("/api/user/register")
      .send({
        id: 9998,
        first_name: "jest_follow1",
        last_name: "jest_follow1",
        dob: "2000-12-12",
        username: "jest_follow1",
        password: "jest_follow1",
        email: "jest_follow1@jest_follow1.com",
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should create a second new user to test follows", async () => {
    await api
      .post("/api/user/register")
      .send({
        id: 9997,
        first_name: "jest_follow2",
        last_name: "jest_follow2",
        dob: "2000-12-12",
        username: "jest_follow2",
        password: "jest_follow2",
        email: "jest_follow2@jest_follow2.com",
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should user be able to log in to get auth-token", async () => {
    await api
      .post("/api/user/login")
      .send({
        username: "jest_follow2",
        password: "jest_follow2",
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

  it("should follow an account", async () => {
    await api
      .post("/api/followers/followUser")
      .set("x-auth-token", token)
      .send({
        user_id: 9998,
        follower_id: 9997,
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should get all following users", async () => {
    await api
      .get("/api/followers/getFollowing/9997")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should get all followers of specific user ", async () => {
    await api
      .get("/api/followers/getFollowers/9998")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should not be able to follow an already followed account.", async () => {
    await api
      .post("/api/followers/followUser")
      .set("x-auth-token", token)
      .send({
        user_id: 9998,
        follower_id: 9997,
      })
      .expect(400)
      .expect("Content-Type", /json/);
  });

  it("should not be able to follow an account that does not exist.", async () => {
    await api
      .post("/api/followers/followUser")
      .set("x-auth-token", token)
      .send({
        user_id: 9999,
        follower_id: 9997,
      })
      .expect(500)
      .expect("Content-Type", /json/);
  });

  it("should unfollow an account", async () => {
    await api
      .post("/api/followers/unfollowUser/9998/9997")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should not be able to unfollow an account that does not exist.", async () => {
    await api
      .post("/api/followers/unfollowUser/9999/9997")
      .set("x-auth-token", token)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("should delete users tests data (first user)", async () => {
    await api
      .delete("/api/user/deleteUser/9998")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should delete users tests data (second user)", async () => {
    await api
      .delete("/api/user/deleteUser/9997")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  afterAll(() => {
    server.close();
  });
});

export {};
