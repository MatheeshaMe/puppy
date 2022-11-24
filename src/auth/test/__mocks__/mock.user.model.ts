import { use } from "passport"


export abstract class MockUserModel<T>{
    protected abstract userStub:T

    constructor(createUserData:T){
        this.constructorSpy(createUserData)
    }

    constructorSpy(_createUserData:T):void{}

    async findOne():Promise<T| string |any>{
        return this.userStub
    }

    // ***************
    async findById():Promise<T>{
     return this.userStub
    }

    async find():Promise< any>{
        return this.userStub
    }
    
    async findByIdAndUpdate():Promise<T>{
        return this.userStub
    }
    async save():Promise<T>{
        return this.userStub
    }

    async findByIdAndDelete():Promise<string>{
        return
    }

    
    // async findByIdAndDelete():Promise<{message:string}>{
    //     return {message}
    // }
}