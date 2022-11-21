import { User } from "../../../user/schema/user.schema"

export const userStub =():User=>{
    return{
        name:"praveen",
        password:"praveen",
        address:"sri lanka",
        photo:"photo1",
        accounts:"accounts1",
        isAdmin:true
    }
}