import { BlogController } from "../../blog.controller"
import { Test } from "@nestjs/testing"
import { BlogService } from "../../blog.service"
import { getModelToken } from "@nestjs/mongoose"
import { BlogModel } from "../support/blog.model"
import { Blog } from "../../schema/schema.blog"
import { blogStub, constructorSpyBlog } from "../stubs/blog.stub"
import { userStub } from "../stubs/user.stub"
import { compareSync } from "bcrypt"
import { createMock } from "@golevelup/ts-jest"

describe('Blog Unit Test', () => {
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

    })

    describe('FindAll', () => {

        let blogController: BlogController
        let blogModel: BlogModel
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    BlogService,
                    {
                        provide: getModelToken("Blog"),
                        useClass: BlogModel
                    },

                ],
                controllers: [BlogController]
            }).compile()

            blogController = moduleRef.get<BlogController>(BlogController)
            blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
        })


        describe('FindAll', () => {
            const mockResponseObject = () => {
                return createMock<Request>({

                })
            }

            let blogs: Blog[];
            beforeEach(async () => {
                jest.spyOn(blogModel, "find")
                blogs = await blogController.getBlogs(
                    createMock<Response | any>({
                        req: jest.fn().mockRejectedValue({
                            query: jest.fn().mockReturnValue({
                                search: jest.fn().mockReturnValue({
                                    // options:jest.fn().mockReturnValue({
                                    title: "main"
                                })
                            })
                        })
                    }),
                    {
                        skip: 10,
                        limit: 2
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
    })

    describe('Find One', () => {

        let blogController: BlogController
        let blogModel: BlogModel
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    BlogService,
                    {
                        provide: getModelToken("Blog"),
                        useClass: BlogModel
                    },

                ],
                controllers: [BlogController]
            }).compile()

            blogController = moduleRef.get<BlogController>(BlogController)
            blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
        })

        describe('FindOne', () => {
            let blog: Blog;
            beforeEach(async () => {
                jest.spyOn(blogModel, "findById")
                blog = await blogController.getBlogById("1234")
            })
            test('should call the user model', () => {
                expect(blogModel.findById).toBeCalled()
            })
            test('should return a blog', () => {
                expect(blog).toHaveProperty("desc")
            })
        })
    })

    describe('Update Blog', () => {

        let blogController: BlogController
        let blogModel: BlogModel
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    BlogService,
                    {
                        provide: getModelToken("Blog"),
                        useClass: BlogModel
                    },
                ],
                controllers: [BlogController]
            }).compile()

            blogController = moduleRef.get<BlogController>(BlogController)
            blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
        })

        describe('Update', () => {
            let blog: Blog;
            beforeEach(async () => {
                jest.spyOn(blogModel, "findByIdAndUpdate")
                blog = await blogController.updateBlog(blogStub(), "1234", userStub())
                console.log(blog)
            })

            test('should call the user model', () => {
                expect(blogModel.findByIdAndUpdate).toBeCalled()
            })

            test('should return a blog', () => {
                expect(blog).toHaveProperty("desc")
            })
        })
    })


    describe('Delete Blog', () => {

        let blogController: BlogController
        let blogModel: BlogModel
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    BlogService,
                    {
                        provide: getModelToken("Blog"),
                        useClass: BlogModel
                    },
                ],
                controllers: [BlogController]
            }).compile()

            blogController = moduleRef.get<BlogController>(BlogController)
            blogModel = moduleRef.get<BlogModel>(getModelToken("Blog"))
        })

        describe('FindOne', () => {
            let blog: {};
            beforeEach(async () => {
                jest.spyOn(blogModel, "findByIdAndDelete")
                blog = await blogController.deletBlog("1234", userStub())
                console.log(blog)
            })
            // test('should call the user model', async () => {
            //     expect( blogModel.findByIdAndDelete).toBeCalled()

            // })
            test('should have a message property', () => {
                expect(blog).toHaveProperty("message")
            })

            test("should return a message", () => {
                expect(blog).toEqual({ message: 'Blog has been deleted successfully' })
            })
        })

    })
})
