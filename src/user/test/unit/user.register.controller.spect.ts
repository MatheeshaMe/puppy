import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { AuthService } from "../../../auth/auth.service"
import { AuthController } from "../../../auth/auth.controller"
import { SchemaNames } from "../../../config/SchemaNames"
import { User } from "../../schema/user.schema"
import { UserController } from "../../user.controller"
import { UserService } from "../../user.service"
import { userStub } from "../stubs/user.stub"
import { UserModel } from "../support/user.model"

describe('User Controller', () => {
    describe('Register', () => {
        let userController: UserController
        let userModel: UserModel
        let authController:AuthController

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                imports: [],
                providers: [UserService, {
                    provide: getModelToken(SchemaNames.USER),
                    useValue: UserModel
                },
                  AuthService
            ],
                controllers: [UserController,AuthController]
            }).compile()

            userController = moduleRef.get<UserController>(UserController)
            userModel = moduleRef.get<UserModel>(getModelToken(SchemaNames.USER))
            authController = moduleRef.get<AuthController>(AuthController)
        })

        describe("When user register is called", () => {
            let user: {};
            let registerSpy: jest.SpyInstance;
            let constructorSpy: jest.SpyInstance;

            beforeEach(async () => {
                registerSpy = jest.spyOn(UserModel.prototype, "save")
                constructorSpy = jest.spyOn(UserModel.prototype, "constructorSpy")
                // user = await userController.
                user = await authController.register(userStub())
            })
            test('should call the usermodel', () => {
                expect(registerSpy).toHaveBeenCalled();
                expect(constructorSpy).toHaveBeenCalled()
             })
        })
    })
})