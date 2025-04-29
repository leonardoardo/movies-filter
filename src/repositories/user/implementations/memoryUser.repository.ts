import { injectable } from "tsyringe";
import UserEntity from "../../../models/user.entity";
import IUserRepository from "../interfaces/user.repository";
import { v7 as uuid } from "uuid";
import { InternalServerError } from "../../../shared/errors/implementations/internalServerError";
import { UserNotFoundError } from "../../../shared/errors/implementations/userNotFoundError";

@injectable()
export default class MemoryUserRepository implements IUserRepository {
    users = new Map<string, UserEntity>();

    async create(userData: UserEntity): Promise<UserEntity> {
        try {
            const user = new UserEntity(
                userData.name,
                userData.email,
                userData.password,
                uuid(),
            );

            if (user?.id) {
                this.users.set(user.id, user);
            }

            return user;
        } catch (err: any) {
            throw new InternalServerError(
                "Error creating user: " + err.message,
            );
        }
    }

    async findById(userId: string): Promise<UserEntity> {
        try {
            const user = this.users.get(userId);

            if (!user) throw new UserNotFoundError("User not found");
            return user;
        } catch (err: any) {
            throw new InternalServerError(
                "Error finding user by id: " + err?.message,
            );
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = Array.from(this.users.values()).find(
                (user) => user.email === email,
            );

            if (!user) throw new UserNotFoundError("User not found");
            return user;
        } catch (err: any) {
            throw new InternalServerError(
                "Error finding user by email: " + err?.message,
            );
        }
    }

    async update(userId: string, userData: UserEntity): Promise<UserEntity> {
        try {
            const user = this.users.get(userId);

            if (!user) throw new UserNotFoundError("User not found");

            const updatedUser = new UserEntity(
                userData.name || user.name,
                userData.email || user.email,
                userData.password || user.password,
                userId,
            );

            this.users.set(userId, updatedUser);
            return updatedUser;
        } catch (err: any) {
            throw new InternalServerError(
                "Error updating user: " + err?.message,
            );
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            const user = this.users.get(userId);

            if (!user) throw new UserNotFoundError("User not found");

            this.users.delete(userId);
        } catch (err: any) {
            throw new InternalServerError(
                "Error deleting user: " + err?.message,
            );
        }
    }
}
