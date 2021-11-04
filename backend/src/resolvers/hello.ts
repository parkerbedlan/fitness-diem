import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Upload, FileUpload } from "graphql-upload";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }

  // @Mutation()
  // async uploadTestImage(
  //   @Arg('fileUpload') fileUpload: Upload
  // ) {
  //   const file = fileUpload.resolve()
  // }
}
