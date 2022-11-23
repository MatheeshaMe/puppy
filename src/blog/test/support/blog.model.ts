import { Blog } from "src/blog/schema/schema.blog";
import { User } from "src/user/schema/user.schema";
import { blogStub, constructorSpyBlog } from "../stubs/blog.stub";
import { MockBlogModel } from "../__mocks__/mock.model";

export class BlogModel extends MockBlogModel<any>{
   protected blogStub= blogStub();
}