import { BlogController } from "../../blog.controller"
import { Test } from "@nestjs/testing"
import { BlogService } from "../../blog.service"
import { getModelToken } from "@nestjs/mongoose"
import { BlogModel } from "../support/blog.model"
import { Blog } from "../../schema/schema.blog"
import { blogStub, constructorSpyBlog } from "../stubs/blog.stub"
import { userStub } from "../stubs/user.stub"
import { compareSync } from "bcrypt"

describe('Blog repo', () => {
    describe("Create", () => {
        let blogController: BlogController
        let blogModel: BlogModel
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                imports: [],
                providers: [BlogService, {
                    provide: getModelToken("Blog"),
                    useValue: BlogModel
                }],
                controllers: [BlogController]
            }).compile()

            blogController = moduleRef.get<BlogController>(BlogController)
            blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
            // console.log("blog model create", blogModel)
        })
        describe('when create blog is called', () => {
            let blog: Blog;
            let saveSpy: jest.SpyInstance;
            let constructorSpy: jest.SpyInstance;

            beforeEach(async () => {
                saveSpy = jest.spyOn(BlogModel.prototype, "save")
                constructorSpy = jest.spyOn(BlogModel.prototype, "constructorSpy")
                blog = await blogController.createBlog(blogStub(), userStub())
                // jest.clearAllMocks()
            })

            test("it should call the blog model ", () => {
                expect(saveSpy).toHaveBeenCalled();
                expect(constructorSpy).toHaveBeenCalled()
            })

            test("it should return a blog", () => {
                expect(blog).toEqual(blogStub())
                // console.log("blog model is in there\n",blogModel)
            })

        })

        // describe('when findone is called', () => { 
        //     let blog: Blog;
        //     beforeEach(async ()=>{
        //       jest.spyOn(BlogModel.prototype,"findById")
        //       jest.spyOn(blogModel,"findById")
        //       blog = await blogController.getBlogById("1234")
        //     })

        //     test('should have been called blog model', () => { 
        //       console.log(expect(blogModel.findById).toHaveBeenCalled()) 
        //      })
        //  })
    })
})

