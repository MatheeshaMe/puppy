import * as mongoose from "mongoose";
import * as request from "supertest";
import "dotenv/config";
import { HttpStatus } from "@nestjs/common";
import { CreateBlogDTO } from "../../../src/blog/dto/blog.dto";
import { User } from "../../../src/user/schema/user.schema";
import axios, { AxiosResponse } from "axios";
import { LoginUserDTO } from "../../../src/user/dto/loginUser.dto";
import { userStub } from "../../../src/auth/tests/stubs/user.stub";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { BlogModule } from "../../../src/blog/blog.module";
import { BlogService } from "../../../src/blog/blog.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogSchema } from "../../../src/blog/schema/schema.blog";

describe("Blog", () => {
  const apps = "http://localhost:3000";

  var app: INestApplication;

  beforeAll(async () => {
    let blogService = {
      findAll: () => [],
    };

    await mongoose.connect(
      process.env.MONGO_DB_URL_TEST! ||
        "mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/test"
    );
    await mongoose.connection.db.dropDatabase();

    const loginUser: LoginUserDTO = {
      name: userStub().name,
      password: userStub().password,
    };

    const headers = {
      headers: {
        Accept: "application/json",
      },
    };

    // const moduleRef = await Test.createTestingModule({
    //   imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
    // })
    //   .overrideProvider(BlogService)
    //   .useValue(blogService)
    //   .compile();

    // app = moduleRef.createNestApplication();
    // await app.init();

     const data =await axios && axios?.post(`${app}/auth/login`,loginUser,headers)//<AxiosResponse>
     console.log("axios data",data)
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
//   const user: User = {
//     name: "admin",
//     password: "admin",
//     address: "admin",
//     photo: "admin",
//     accounts: "admin",
//     isAdmin: true,
//   };

//   const blog: CreateBlogDTO = {
//     owner: user,
//     title: "title",
//     photo: "photo",
//     desc: "desc",
//   };

//   it("should create blog", async () => {
//     //   return request(app.)
//     const data=await request(app.getHttpServer()).get("/blog").expect(200)
//     console.log("dataaaaaa",data)
//   });
it("should pass",()=>{

})
});
