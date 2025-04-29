// src/shared/errors/userAlreadyExistsError.ts
import { DomainError } from "../interface/error";

export class UserAlreadyExistsError extends DomainError {
    statusCode = 409;

    constructor() {
        super("User already exists.");
    }
}
