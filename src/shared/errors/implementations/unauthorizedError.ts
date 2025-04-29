import { DomainError } from "../interface/error";

export class UnauthorizedError extends DomainError {
    statusCode = 401;

    constructor(message = "Unauthorized") {
        super(message);
    }
}
