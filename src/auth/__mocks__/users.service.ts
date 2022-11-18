import { userStub } from "../tests/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
   register:jest.fn().mockResolvedValue(userStub()),
   login:jest.fn().mockResolvedValue(userStub()),
   findByPayload:jest.fn().mockResolvedValue(userStub()),
   updateUser:jest.fn().mockResolvedValue(userStub()),
})