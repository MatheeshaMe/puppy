export abstract class MockModel<T>{
    protected abstract ustub:T;

    constructor(createEntityData: T) {
        this.constructorSpy(createEntityData);
      }
    
      constructorSpy(_createEntityData: T): void {}

      async register():Promise<T>{
        return this.ustub
      }

      async login():Promise<T>{
        return this.ustub
      }

      async findByPayload():Promise<T>{
        return this.ustub
      }

      async updateUser():Promise<T>{
        return this.ustub
      }
}