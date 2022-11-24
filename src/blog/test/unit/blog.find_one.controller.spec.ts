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
        let blog:Blog;
        beforeEach(async ()=>{
            jest.spyOn(blogModel,"findById")
            blog = await blogController.getBlogById("1234")
        })
        test('should call the user model', () => { 
            expect(blogModel.findById).toBeCalled()
         })
        test('should return a blog', () => { 
            expect(blog).toHaveProperty("desc")
         })
     })

    //  describe('Create', () => { 
    //     let blog: Blog;
    //     let saveSpy: jest.SpyInstance;
    //     let constructorSpy: jest.SpyInstance;

    //     beforeEach(async () => {
    //         saveSpy = jest.spyOn(BlogModel.prototype, "save")
    //         console.log(saveSpy)
    //         constructorSpy = jest.spyOn(BlogModel.prototype, "constructorSpy")
    //         blog = await blogController.createBlog(blogStub(), userStub())
    //     })
    //     test('should call the blog model', () => { 
    //         expect(saveSpy).toHaveBeenCalled()
    //      })
    //   })
})