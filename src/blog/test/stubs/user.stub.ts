import { User } from "src/user/schema/user.schema"

export const userStub = ():User| any =>{
    return{
      name:"user",
      password:"user",
      address:"user",
      photo:"user",
      accounts:"user",
      isAdmin:true
    }
}