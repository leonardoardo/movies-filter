import UserEntity from "../../../models/user.entity";
import ICryptographyService from "../../../services/v1/cryptography/interfaces/cryptography.interface";

export default interface IUserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    update(id: string, user: UserEntity): Promise<UserEntity>;
    delete(id: string): Promise<void>;
}
