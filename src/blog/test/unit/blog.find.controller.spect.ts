import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { BlogController } from "../../blog.controller"
import { BlogService } from "../../blog.service"
import { Blog } from "../../schema/schema.blog"
import { BlogModel } from "../support/blog.model"

describe("Find", () => {
    let blogController: BlogController
    let blogModel: BlogModel
    let blog:Blog
    let findSpy: jest.SpyInstance;
    let constructorSpy: jest.SpyInstance;
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


        console.log("blog model 34 ", blogModel)
        console.log(blogModel === undefined)
        findSpy = jest.spyOn(BlogModel.prototype, "findById")
        constructorSpy = jest.spyOn(BlogModel.prototype, "constructorSpy")
        blog = await blogController.getBlogById("1234")
        console.log(blog)
    })

    describe('find blog', () => {
        // beforeEach(async () => {

        // })
        console.log('abs')
        test('should pass', () => {
            expect(findSpy).toHaveBeenCalled();

            console.log("blog model 39 ", blogModel)
        })
    })
})