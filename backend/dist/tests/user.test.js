"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const supertest = require("supertest");
const { app, server } = require("../server");
const api = supertest(app);
describe("Post Endpoints", () => {
    let token;
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
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
    }));
    it("should user be able to log in ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .post("/api/user/login")
            .send({
            username: "jest",
            password: "jest",
        })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((res) => {
            token = res.body.idToken;
        })
            .catch((err) => {
            console.log(err);
        });
    }));
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get("/api/user/getAllUsers")
            .set("x-auth-token", token)
            .expect(200)
            .expect("Content-Type", /json/);
    }));
    it("should get data of specific user ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get("/api/user/getUser/1")
            .set("x-auth-token", token)
            .expect(200)
            .expect("Content-Type", /json/);
    }));
    it("should update user data ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .put("/api/user/updateUser/1")
            .set("x-auth-token", token)
            .expect(200)
            .expect("Content-Type", /json/);
    }));
    it("should delete user data ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .delete("/api/user/deleteUser/9999")
            .set("x-auth-token", token)
            .expect(200)
            .expect("Content-Type", /json/);
    }));
    afterAll(() => {
        server.close();
    });
});
//# sourceMappingURL=user.test.js.map