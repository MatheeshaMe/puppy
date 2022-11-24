import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { BlogController } from "../../blog.controller"
import { BlogService } from "../../blog.service"
import { Blog } from "../../schema/schema.blog"
import { blogStub } from "../stubs/blog.stub"
import { reqStub } from "../stubs/req.stub"
import { userStub } from "../stubs/user.stub"
import { BlogModel } from "../support/blog.model"

import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';


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


    describe('FindAll', () => { 
        const mockResponseObject =()=>{
            return createMock<Request>({

            })
        }

        let blogs:Blog[];
        beforeEach(async ()=>{
            jest.spyOn(blogModel,"find")
            blogs = await blogController.getBlogs(
                createMock<Response | any>({
                    req:jest.fn().mockRejectedValue({
                        query:jest.fn().mockReturnValue({
                            search:jest.fn().mockReturnValue({
                                // options:jest.fn().mockReturnValue({
                                    title:"main"
                            })
                        })
                    })
                }),
                {
                skip:10,
                limit:2
            })
            // console.log(blogController.getBlogs())
        })
        test('should call the user model', () => { 
            expect(blogModel.find).toBeCalled()
            console.log("blog find is done mf")
         })
        // test('should return a blog', () => { 
        //     expect(blogs).toHaveProperty("desc")
        //  })
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