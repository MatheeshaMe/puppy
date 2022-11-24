import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import * as request from 'supertest';
import { CreateBlogDTO } from '../src/blog/dto/blog.dto';
import { userStub } from '../src/blog/test/stubs/user.stub';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { LoginUserDTO } from '../src/user/dto/loginUser.dto';

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
    console.log("before each block")
    await dbConnection.collection('blogs').deleteMany({});
    // await dbConnection.collection('users').deleteMany({});

  })


  describe('Register a new use', () => {
    test('Register', async () => {
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
    let jwttoken: string
    beforeEach(async () => {
      const loginUserRequest: LoginUserDTO = {
        name: "admin",
        password: "admin"
      }
      const response = await request(httpServer).post('/auth/login').send(loginUserRequest)
      // console.log(response)
      expect(response.status).toBe(201)
      if (response.status === 201) {
        jwttoken = response.body?.token
      }
    })
  it("should return the jwt token",()=>{
    expect(jwttoken).toBeDefined()
  })
    it('should pass post blog with admin account', async () => {
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

      console.log("jwt token", jwttoken)
      const response = (jwttoken !== undefined && 
      await request(httpServer).post('/blog').set('Authorization', 'Bearer ' + jwttoken).send(createBlogRequeset))
      console.log(response)
      expect(response.status).toBe(201)
    })
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


})
