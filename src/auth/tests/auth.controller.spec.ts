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


describe("Auth test", () => {
  let authController: AuthController;

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
      }).compile();

      authController = moduleRef.get<AuthController>(AuthController)
      userModel = moduleRef.get<UserModel>(getModelToken(SchemaNames.USER))

      jest.clearAllMocks();
    });
    describe("Find One", () => {
      test('should first', () => { console.log("first");
       })
    });
  });
});
