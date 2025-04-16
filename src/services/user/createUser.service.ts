import { IService } from "../Iservice";

export default class CreateUserService implements IService {
    async execute(userData: any): Promise<any> {
        const newUser = { id: Date.now(), ...userData };
        return newUser;
    }
}
