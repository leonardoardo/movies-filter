import { injectable } from "tsyringe";
import ICryptographyService from "../interfaces/cryptography.interface";
import bcrypt from "bcrypt";

@injectable()
export default class BcryptCryptographyService implements ICryptographyService {
    private readonly saltRounds: number = Number(process.env.SALT_ROUNDS) || 12;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
