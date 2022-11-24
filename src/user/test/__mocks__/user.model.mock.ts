

export abstract class MockUserModel<T>{
    protected abstract userStub:T
    protected abstract tokenStub
    constructor(createUserData:T){
        this.constructorSpy(createUserData)
    }

    constructorSpy(_createUserData:T):void{}

    async findOne():Promise<any>{
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

    async hash():Promise<any>{
        return ""
    }
    // async findByIdAndDelete():Promise<{message:string}>{
    //     return {message}
    // }

    async sign():Promise<any>{
        return "sign"
    }
    async signPayload():Promise<any>{
        return "token"
    }
}