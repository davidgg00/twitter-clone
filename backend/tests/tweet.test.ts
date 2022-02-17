const supertest = require("supertest");
const { app, server } = require("../server");
const api = supertest(app);
describe("Post Endpoints", () => {
  let token: string;
  let tweet_id: string;
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

  it("should be able to send tweets", async () => {
    await api
      .post("/api/tweet/send")
      .set("x-auth-token", token)
      .send({
        user_id: 9999,
        tweet_text: "test tweet",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res: any) => {
        tweet_id = res.body.tweet.id;
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  it("should be able to get all user tweets", async () => {
    await api
      .get("/api/tweet/getAllUserTweets/9999")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should be able to get all the tweets of the people he follows", async () => {
    await api
      .get("/api/tweet/getTweetsFollowingUsers/9999")
      .set("x-auth-token", token)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should be able to delete tweets", async () => {
    await api
      .delete("/api/tweet/delete/" + tweet_id)
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
