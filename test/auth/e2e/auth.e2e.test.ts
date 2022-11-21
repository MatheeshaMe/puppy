import { HttpStatus } from "@nestjs/common";
import * as mongoose from "mongoose";
import * as request from "supertest";
import "dotenv/config";
import { CreateUserDto } from "../../../src/user/dto/create-user.dto";
import { userStub } from "../../../src/auth/tests/stubs/user.stub";
import { LoginUserDTO } from "../../../src/user/dto/loginUser.dto";

beforeAll(async () => {
  await mongoose.connect("mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/?retryWrites=true&w=majority");
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Authentication", () => {
  const app = "http://localhost:3000/";

  const newUser: CreateUserDto = {
    name: userStub().name,
    address: userStub().address,
    photo: userStub().photo,
    accounts: userStub().accounts,
    password: userStub().password,
    isAdmin: userStub().isAdmin,
  };

  const fakeUserLogin: LoginUserDTO = {
    name: "fake details",
    password: userStub().password,
  };

  const loginUser: LoginUserDTO = {
    name: userStub().name,
    password: userStub().password,
  };
  // interface Obj  {
  //     user: {
  //       user: {
  //         _id: String,
  //         name: String,
  //         password: String,
  //         address: String,
  //         photo: String,
  //         accounts:String,
  //         isAdmin: Boolean,
  //         __v: Number || String
  //       },
  //       status : {
  //         response: String,
  //         status: Number,
  //         message: String,
  //         name:String
  //       }
  //     },
  //     token: String
  //   }

  // {
  //     user: {
  //       user: {
  //         _id: '637b29af90d777748482c3b1',
  //         name: 'praveen',
  //         password: '$2b$10$q6Kdg7tuNkrXbBR.G.a.1.2ZwaKUr8Ak4c3WXkY0JUr0CEuNuMFD6',
  //         address: 'sri lanka',
  //         photo: 'photo1',
  //         accounts: 'accounts1',
  //         isAdmin: true,
  //         __v: 0
  //       },
  //       status: {
  //         response: 'Accepted',
  //         status: 202,
  //         message: 'Accepted',
  //         name: 'HttpException'
  //       }
  //     },
  //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkwMTU5ODQsImV4cCI6MTY2OTA1OTE4NH0.TUURPpqQl1XIcwtJXFvEMC1Vp5Gm6XhA2OKnq1V4Mk8'
  //   }s

  describe("Register", () => {
    it("should register a user", () => {
      return request(app)
        .post("auth/register")
        .set("Accept", "application/json")
        .send(newUser)
        .expect(HttpStatus.CREATED);
    });
    it("should reject duplicated credentials", () => {
      return request(app)
        .post("auth/register")
        .set("Accept", "application/json")
        .send(newUser)
        .expect(({ body }) => {
          // {
          //   response: 'user already exist',
          //   status: 406,
          //   message: 'user already exist',
          //   name: 'HttpException'
          // }
          console.log('rejection body \n',body)
          // expect(body.status).toEqual(HttpStatus.UNAUTHORIZED || 406)
          // expect(body.message).toEqual("user already exist")
        });
    });
  });

  describe("Login", () => {
    it("should login user", async () => {
      return request(app)
        .post("auth/login")
        .set("Accept", "application/json")
        .send(loginUser)
        .expect(({ body }) => {
          console.log(body); //.user.status
          expect(body.user.user).toBeDefined();
          expect(body.user.status.status).toEqual(HttpStatus.ACCEPTED);
          expect(body.user.status.message).toEqual("Accepted");
        });
    });

    it("should reject invalid credentials  ", async () => {
      return request(app)
        .post("auth/login")
        .set("Accept", "application/json")
        .send(fakeUserLogin)
        .expect(({ body }) => {
          console.log("bodyyy", body); //.user.status
          expect(body.statusCode).toEqual(404);
          expect(body.message).toEqual("credentials invalid");
          // expect(body.user.user).toBeUndefined()
          // expect(body.user.status.status).toEqual(HttpStatus.BAD_REQUEST)
          // expect(body.user.status.message).toEqual('Accepted')
        });
    });
  });
});
