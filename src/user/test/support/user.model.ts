import { tokenStub, userStub } from "../stubs/user.stub";
import { MockUserModel } from "../__mocks__/user.model.mock";


export class UserModel extends MockUserModel<any>{
   protected userStub = userStub();
   protected tokenStub= tokenStub()
    
}