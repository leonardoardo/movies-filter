import CreateUserDTO from "../../../../dtos/users/createUser.dto";
import UserEntity from "../../../../models/user.entity";

export interface ICreateUserService {
    execute(userData: CreateUserDTO): Promise<UserEntity>;
}
