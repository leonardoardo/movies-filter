import { injectable } from "tsyringe";
import UserEntity from "../../../models/user.entity";
import IUserRepository from "../interfaces/user.repository";
import { v7 as uuid } from "uuid";

@injectable()
export default class MemoryUserRepository implements IUserRepository {
    users = new Map<string, UserEntity>();

    async create(userData: UserEntity): Promise<UserEntity | null> {
        try {
            const user = new UserEntity(
                userData.name,
                userData.email,
                userData.password,
                uuid(),
            );

            if (user.id) {
                this.users.set(user.id, user);

                console.log("This users ->", this.users.values());
                return user;
            }
        } catch (err) {
            console.log("Error creating user", err);
        }
        return null;
    }

    async findById(userId: string): Promise<UserEntity | null> {
        try {
            const user = this.users.get(userId);
            if (user) {
                return user;
            }
        } catch (err) {
            console.log("Error getting user by id", err);
        }

        return null;
    }

    async update(
        userId: string,
        userData: UserEntity,
    ): Promise<UserEntity | null> {
        try {
            const user = this.users.get(userId);
            if (user) {
                const updatedUser = new UserEntity(
                    userData.name || user.name,
                    userData.email || user.email,
                    userData.password || user.password,
                    userId,
                );

                this.users.set(userId, updatedUser);
                return updatedUser;
            }
        } catch (err) {
            console.log("Error updating user", err);
        }

        return null;
    }

    async delete(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
