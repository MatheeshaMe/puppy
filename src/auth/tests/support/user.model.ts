import { MockModel } from "../../../auth/__mocks__/mock.model";
import { User } from "../../../user/schema/user.schema";
import { userStub } from "../stubs/user.stub";

export class UserModel extends MockModel<User>{
    protected ustub = userStub();
}