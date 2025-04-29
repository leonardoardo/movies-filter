// src/shared/errors/internalServerError.ts
import { DomainError } from "../interface/error";

export class UserNotFoundError extends DomainError {
    statusCode = 404;

    constructor(message = "User not found.") {
        super(message);
    }
}
