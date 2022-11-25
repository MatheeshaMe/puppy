import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import * as request from 'supertest';
import { CreateBlogDTO, UpdateBlogDTO } from '../src/blog/dto/blog.dto';
import { userStub } from '../src/blog/test/stubs/user.stub';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { LoginUserDTO } from '../src/user/dto/loginUser.dto';
import axios from "axios"
describe('Blog E2E', () => {

  let app: INestApplication;
  let dbConnection: mongoose.Connection;
  let httpServer: any;
  let token: string

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    jest.setTimeout(1000)
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
    await dbConnection.collection('users').deleteMany({});

  });
  afterAll(async () => {
    await app.close();

  });
  beforeEach(async () => {
    // console.log("before each block")
    // await dbConnection.collection('blogs').deleteMany({});
    // await dbConnection.collection('users').deleteMany({});

  })


  describe('Register a new use', () => {
    test('Register Admin', async () => {
      const createUserRequest: CreateUserDto = {
        name: "admin",
        address: "admin",
        photo: "admin",
        accounts: "admin",
        password: "admin",
        isAdmin: true
      }

      const response = await request(httpServer).post('/auth/register').send(createUserRequest)
      // console.log(response)
      expect(response.status).toBe(201)
    })
    test('Register User', async () => {
      const createUserRequest: CreateUserDto = {
        name: "user",
        address: "user",
        photo: "user",
        accounts: "user",
        password: "user",
        isAdmin: false
      }

      const response = await request(httpServer).post('/auth/register').send(createUserRequest)
      // console.log(response)
      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
      // console.log(response.body)
    })
    test('If username already exist', async () => {
      const createUserRequest: CreateUserDto = {
        name: "admin",
        address: "admin",
        photo: "admin",
        accounts: "admin",
        password: "admin",
        isAdmin: true
      }

      const response = await request(httpServer).post('/auth/register').send(createUserRequest)
      // console.log(response)
      expect(response.status).toBe(400)
    })


  })

  describe('Login', () => {
    test('If creditional invalid', async () => {
      const loginUserRequest: LoginUserDTO = {
        name: "Admin",
        password: "wrong"
      }
      const response = await request(httpServer).post('/auth/login').send(loginUserRequest)
      // console.log(response)
      expect(response.status).toBe(404)
    })
    test('If creditional valid', async () => {
      const loginUserRequest: LoginUserDTO = {
        name: "admin",
        password: "admin"
      }
      const response = await request(httpServer).post('/auth/login').send(loginUserRequest)
      // console.log(response)
      expect(response.status).toBe(201)
      if (response.status === 201) {
        token = response.body?.token
        // {
        //   user: {
        //     user: { '$__': [Object], '$isNew': false, _doc: [Object] },
        //     status: {
        //       response: 'Accepted',
        //       status: 202,
        //       message: 'Accepted',
        //       name: 'HttpException'
        //     }
        //   },
        //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkyOTAyOTEsImV4cCI6MTY2OTMzMzQ5MX0.e4hI92DBGenFgdXg-yIlHhETrEpoDZOe4t3TxIGTO0w'
        // }
        //  console.log(response.body?.token)

      }
    })
  })
  describe('Blogs', () => {
    let jwttokenAdmin: string
    let jwttokenUser: string
    beforeEach(async () => {
      const loginAdminRequest: LoginUserDTO = {
        name: "admin",
        password: "admin"
      }
      const loginUserRequest: LoginUserDTO = {
        name: "user",
        password: "user"
      }

      const adminResponse = await request(httpServer).post('/auth/login').send(loginAdminRequest)
      const userResponse = await request(httpServer).post('/auth/login').send(loginUserRequest)
      // console.log(response)
      expect(adminResponse.status).toBe(201)
      if (adminResponse.status === 201) {
        jwttokenAdmin = adminResponse.body?.token
      }

      expect(userResponse.status === 201)
      if (userResponse.status === 201) {
        jwttokenUser = userResponse.body?.token
      }
    })
    it("should return the jwt token", () => {
      expect(jwttokenAdmin).toBeDefined()
    })
    it('should pass create blog with admin account', async () => {
      const createBlogRequeset: CreateBlogDTO = {
        owner: {
          name: "name",
          address: "address",
          photo: "photo",
          accounts: "accounts",
          password: "password",
          isAdmin: true
        },
        title: "title",
        photo: "photo",
        desc: "desc"
      }

      console.log("jwt token", jwttokenAdmin)
      const response = (jwttokenAdmin !== undefined &&
        await request(httpServer).post('/blog').set('Authorization', 'Bearer ' + jwttokenAdmin).send(createBlogRequeset))
      // console.log(response)
      expect(response.status).toBe(201)
    })
    it('should fail unauthorized create blog requests', async () => {

      const createBlogRequeset: CreateBlogDTO = {
        owner: {
          name: "name",
          address: "address",
          photo: "photo",
          accounts: "accounts",
          password: "password",
          isAdmin: true
        },
        title: "title",
        photo: "photo",
        desc: "desc"
      }

      const response = await request(httpServer).post('/blog').send(createBlogRequeset)
      // console.log(response)
      expect(response.status).toBe(401)
    })
    it("should reject not admin accounts when create a blog", async () => {
      const createBlogRequeset: CreateBlogDTO = {
        owner: {
          name: "name",
          address: "address",
          photo: "photo",
          accounts: "accounts",
          password: "password",
          isAdmin: false
        },
        title: "title",
        photo: "photo",
        desc: "desc"
      }

      console.log("jwt token", jwttokenUser)
      const response = (jwttokenUser !== undefined &&
        await request(httpServer).post('/blog').set('Authorization', 'Bearer ' + jwttokenUser).send(createBlogRequeset))
      // console.log(response)
      expect(response.status).toBe(401)
    })
    it('should pass update blog with admin account', async () => {
      const updateBlogRequeset: UpdateBlogDTO = {
        owner: {
          name: "name",
          address: "address",
          photo: "photo",
          accounts: "accounts",
          password: "password",
          isAdmin: true
        },
        title: "title updated",
        photo: "photo updated",
        desc: "desc updated"
      }


      await fetch("http://localhost:3000/blog/637f8e1de075ac6cd7823c2d").then(async (res) => {
        expect(res.status).toBe(200)
        if (res.status === 200) {
          const response = (jwttokenAdmin !== undefined &&
            await request(httpServer).put('/blog/637f8e1de075ac6cd7823c2d').set('Authorization', 'Bearer ' + jwttokenAdmin).send(updateBlogRequeset))
          console.log(response)
          expect(response.status).toBe(200)
          expect(response.body)
        }
      })
      // console.log("jwt token", jwttokenAdmin)
    })
    it("should fail user try to update a blog",async()=>{


      const getPost = async(_id)=>{
        try {
          const data = await axios.get(`http://localhost:3000/blog/${_id}`)
          if(!data){
            throw new Error(`there is no post ${_id}`)
          }
          console.log("line 294 data",data?.data)
        } catch (error) {
          console.log(error)
        }
      }

      const updateBlogRequeset: UpdateBlogDTO = {
        owner: {
          name: "name",
          address: "address",
          photo: "photo",
          accounts: "accounts",
          password: "password",
          isAdmin: true
        },
        title: "title updated",
        photo: "photo updated",
        desc: "desc updated"
      }

      await fetch("http://localhost:3000/blog/637f8e1de075ac6cd7823c2d").then(async (res) => {
        expect(res.status).toBe(200)
        if (res.status === 200) {
          const response = (jwttokenAdmin !== undefined &&
            await request(httpServer).put('/blog/637f8e1de075ac6cd7823c2d').set('Authorization', 'Bearer ' + jwttokenUser).send(updateBlogRequeset))
          // console.log(response)
          expect(response.status).toBe(401)
          expect(response.body)
        }
      })
    })
    // it("should pass if admin tries to delete blog",async()=>{
    //   await fetch("http://localhost:3000/blog/637f8e1de075ac6cd7823c2d").then(async (res) => {
    //     expect(res.status).toBe(200)
    //     if (res.status === 200) {
    //       const response = (jwttokenAdmin !== undefined &&
    //         await request(httpServer).delete('/blog/637f8e1de075ac6cd7823c2d').set('Authorization', 'Bearer ' + jwttokenAdmin))
    //       console.log(response)
    //       expect(response.status).toBe(200)
    //       expect(response.body)
    //     }

    //     // if(res.status ===40)
    //   })
    // })
  
  })
})
