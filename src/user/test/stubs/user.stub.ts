import { User } from "src/user/schema/user.schema"

export const userStub = ():User| any =>{
    return{
      _id:"1234",
      name:"user",
      password:"user",
      address:"user",
      photo:"user",
      accounts:"user",
      isAdmin:true
    }
}

export const tokenStub = ():string=>{
    return 'token'
}

