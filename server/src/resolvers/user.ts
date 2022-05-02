import { User } from "src/entities/User"
import { RegisterInput } from "src/types/RegisterInput"
import { Mutation, Resolver } from "type-graphql"

@Resolver()
export class UserResolver {
  @Mutation()
  async register(registerInput: RegisterInput) {
    const { username, password } = registerInput

    const existingUser = await User
  }
}
