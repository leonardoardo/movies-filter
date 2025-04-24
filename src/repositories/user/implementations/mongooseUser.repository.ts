import IUserRepository from "../interfaces/user.repository";
import mongoose, { mongo } from "mongoose";
import { UserModel, UserSchema } from "../../../database/mongoose/user.schema";
import { UserMapper } from "../../../mappers/user.mapper";
import UserEntity from "../../../models/user.entity";
import { injectable } from "tsyringe";

@injectable()
export default class MongooseUserRepository implements IUserRepository {
    userModel = mongoose.model("User", UserSchema);

    constructor(url: string) {
        mongoose
            .connect(url)
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => {
                console.log("Error connecting to MongoDB", err);
            });
    }

    async create(user: UserEntity): Promise<UserEntity | null> {
        try {
            const newUser = await new this.userModel(user).save();
            return UserMapper.toEntity(newUser);
        } catch (err) {
            console.log("Error creating user", err);
        }
        return null;
    }

    async findById(userId: string): Promise<any> {
        try {
            const user = await this.userModel.findById(userId);
            if (user) {
                return UserMapper.toEntity(user);
            }
        } catch (err) {
            console.log("Error getting user by id", err);
        }
        return null;
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
        } catch (err) {
            console.log("Error updating user", err);
        }
    }
    async delete(userId: string): Promise<void> {
        try {
            await this.userModel.findByIdAndDelete(userId);
        } catch (err) {
            console.log("Error deleting user", err);
        }
    }
}
