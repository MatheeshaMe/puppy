import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('should pass', () => { 

  let app:INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jest.setTimeout(1000)
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  describe('auth/register', () => { 
    it("if username is existed",async()=>{
      const res = await request(app.getHttpServer())
      .post("auth/register")
      .send({
        name:"name",
        password:"password",
        address:"address",
        photo:"photo",
        accounts:"accounts",
        isAdmin:true
      })
    })
   })
 })