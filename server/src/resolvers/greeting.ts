import { Resolver, Query } from "type-graphql"

@Resolver()
export class GreetingResolver {
  @Query()
  hello(): string {
    return "Hello World James"
  }
}
