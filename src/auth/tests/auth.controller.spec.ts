import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { User, UserSchema } from "../../user/schema/user.schema";
import { SchemaNames } from "../../config/SchemaNames";
import { UserModule } from "../../user/user.module";
import { UserService } from "../../user/user.service";
import { AuthController } from "../auth.controller";
import { AuthModule } from "../auth.module";
import { AuthService } from "../auth.service";
import { UserModel } from "./support/user.model";
import { domainToASCII } from "url";


describe("Auth test", () => {
  let authController: AuthController;
  const mockAuthServices = {
    register: jest.fn(registerDTO => {
      return {
        ...registerDTO,
      }
    }),
    findOne:jest.fn(name=>{
      return {
        name
      }
    })
    // create: jest.fn().mockResolvedValue((functon,dto)=>{
    //   return {
    //     ...dto,
    //     functon
    //   }
    // })
  }
  describe("Auth operations initializing", () => {
    let userModel: UserModel;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          UserService,
          {
            provide: getModelToken(SchemaNames.USER),
            useClass: UserModel,
          },
          AuthService,
        ],       
      }).overrideProvider(AuthService).useValue(mockAuthServices).compile()

      authController = moduleRef.get<AuthController>(AuthController)
      userModel = moduleRef.get<UserModel>(getModelToken(SchemaNames.USER))

      jest.clearAllMocks();
    });
    describe("Auth", () => {
      test('AuthController should be defined', () => {
        expect(authController).toBeDefined()
      })
      test("Should register", () => {
        // expect(
        //   authController.register({
        //   name: "string",
        //   address: "string",
        //   photo: "string",
        //   accounts: "string",
        //   password: "string",
        //   isAdmin: true
        // })).toEqual({
        //   name:"string"
        // })
        const a = authController.register({
          name: "string",
          address: "string",
          photo: "string",
          accounts: "string",
          password: "string",
          isAdmin: true
        })
      })
    });
  });
});
