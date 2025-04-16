import UserEntity from "../../models/user.entity";

export default interface IUserRepository {
    create(user: UserEntity): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    update(id: string, user: UserEntity): Promise<UserEntity | null>;
    delete(id: string): Promise<void>;
}
