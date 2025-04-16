import UserEntity from "../models/user.entity";

export const UserMapper = {
    toEntity(data: any): UserEntity {
        return new UserEntity(
            data.name,
            data.email,
            data.password,
            data._id?.toString(),
        );
    },
    toPersistence(user: UserEntity): any {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
        };
    },
};
