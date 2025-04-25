import { injectable } from "tsyringe";
import ICryptographyService from "../interfaces/cryptography.interface";
import bcrypt from "bcrypt";

@injectable()
export default class BcryptCryptographyService implements ICryptographyService {
    private readonly saltRounds: number = Number(process.env.SALT_ROUNDS) || 12;

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
