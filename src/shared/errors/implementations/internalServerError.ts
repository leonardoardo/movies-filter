// src/shared/errors/internalServerError.ts
import { DomainError } from "../interface/error";

export class InternalServerError extends DomainError {
    statusCode = 500;

    constructor(message = "Internal server error.") {
        super(message);
    }
}
