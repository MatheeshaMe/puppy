import { Blog } from "src/blog/schema/schema.blog"
import { User } from "src/user/schema/user.schema"

export abstract class MockBlogModel<T>{
    protected abstract blogStub:T

    constructor(createBlogData:T){
        this.constructorSpy(createBlogData)
    }

    constructorSpy(_createBlogData:T):void{}

    async findById():Promise<T>{
     return this.blogStub
    }

    async find():Promise<T[]>{
        return [this.blogStub]
    }
    
    async findByIdAndUpdate():Promise<T>{
        return this.blogStub
    }
    async save():Promise<T>{
        return this.blogStub
    }

    async findByIdAndDelete():Promise<{}>{
        return {}
    }
    // async findByIdAndDelete():Promise<{message:string}>{
    //     return {message}
    // }
}