import mongoose from "mongoose";
import { injectable } from "tsyringe";
import { UserSchema } from "../../../database/mongoose/user.schema";
import { UserMapper } from "../../../mappers/user.mapper";
import UserEntity from "../../../models/user.entity";
import IUserRepository from "../interfaces/user.repository";
import ICryptographyService from "../../../services/v1/cryptography/interfaces/cryptography.interface";
import { InternalServerError } from "../../../shared/errors/implementations/internalServerError";

@injectable()
export default class MongooseUserRepository implements IUserRepository {
    userModel = mongoose.model("User", UserSchema);

    constructor(
        url: string,
        private readonly cryptographyService: ICryptographyService,
    ) {
        mongoose
            .connect(url)
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => {
                console.log("Error connecting to MongoDB", err);
            });
    }

    async create(user: UserEntity): Promise<UserEntity> {
        try {
            const userData = {
                ...user,
                password: await this.cryptographyService.hash(user.password),
            };
            const newUser = await new this.userModel(userData).save();

            return UserMapper.toEntity(newUser);
        } catch (err: any) {
            throw new InternalServerError(
                "Error creating user: " + err.message,
            );
        }
    }

    async findById(userId: string): Promise<any> {
        try {
            const user = await this.userModel.findById(userId);
            if (user) {
                return UserMapper.toEntity(user);
            }
        } catch (err: any) {
            throw new InternalServerError(
                "Error getting user by id" + err.message,
            );
        }
    }
    async update(userId: string, userData: any): Promise<any> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(
                userId,
                userData,
                { new: true },
            );

            if (updatedUser) {
                return UserMapper.toEntity(updatedUser);
            }
        } catch (err: any) {
            throw new InternalServerError(
                "Error updating user: " + err.message,
            );
        }
    }
    async delete(userId: string): Promise<void> {
        try {
            await this.userModel.findByIdAndDelete(userId);
        } catch (err: any) {
            throw new InternalServerError(
                "Error deleting user: " + err.message,
            );
        }
    }
}
