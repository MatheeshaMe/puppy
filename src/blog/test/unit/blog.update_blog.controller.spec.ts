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

    // describe('Update', () => { 
    //     let blog:Blog;
    //     beforeEach(async ()=>{
    //         jest.spyOn(blogModel,"findByIdAndUpdate")
    //         blog = await blogController.updateBlog(blogStub(),"1234",userStub())
    //         console.log(blog)
    //     })

    //     test('should call the user model', () => { 
    //         expect(blogModel.findByIdAndUpdate).toBeCalled()
    //      })

    //     test('should return a blog', () => { 
    //         expect(blog).toHaveProperty("desc")
    //      })
    //  })
})