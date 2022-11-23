import { User } from "src/user/schema/user.schema"

export const userStub = ():User =>{
    return{
      name:"user",
      password:"user",
      address:"user",
      photo:"user",
      accounts:"user",
      isAdmin:true
    }
}