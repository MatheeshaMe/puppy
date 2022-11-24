import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { BlogController } from "../../blog.controller"
import { BlogService } from "../../blog.service"
import { Blog } from "../../schema/schema.blog"
import { blogStub } from "../stubs/blog.stub"
import { userStub } from "../stubs/user.stub"
import { BlogModel } from "../support/blog.model"

describe('Blog Controller', () => { 

    let blogController:BlogController
    let blogModel:BlogModel
    beforeEach(async()=>{
        const moduleRef = await Test.createTestingModule({
            providers:[
            BlogService,
            {
                provide:getModelToken("Blog"),
                useClass:BlogModel
            },
         ],
         controllers: [BlogController]
      }).compile()

      blogController =  moduleRef.get<BlogController>(BlogController)
      blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
    })

    describe('FindOne', () => { 
        let blog:{};
        beforeEach(async ()=>{
            jest.spyOn(blogModel,"findByIdAndDelete")
            blog = await blogController.deletBlog("1234",userStub())
            console.log(blog)
        })
        test('should call the user model', async () => { 
            expect(await blogModel.findByIdAndDelete).toBeCalled()

         })
        test('should have a message property', () => { 
            expect(blog).toHaveProperty("message")
         })

         test("should return a message",()=>{
            expect(blog).toEqual({ message: 'Blog has been deleted successfully' })
         })
     })

})