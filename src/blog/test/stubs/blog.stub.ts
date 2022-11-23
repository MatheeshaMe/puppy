import { Types } from "mongoose";
import { Blog } from "../../../blog/schema/schema.blog";


export const blogStub = () =>{
    return{
        // owner:new Types.ObjectId("637caa41c9977fd7e0db28d0"),
        owner:{
            name:"user",
            password:"user",
            address:"user",
            photo:"user",
            accounts:"user",
            isAdmin:true
        },
        title:"Title",
        photos:"photo",
        desc:"Desc",

    }
}

export const constructorSpyBlog =()=>{
    return{
        // owner:{
        //     name:"user",
        //     password:"user",
        //     address:"user",
        //     photo:"user",
        //     accounts:"user",
        //     isAdmin:true
        // },
        
        title:"Title",
        photos:"photo",
        desc:"Desc",
        owner:"637caa41c9977fd7e0db28d0",
        photo:"photo"

    }
    }
