import AuthenticateDto from "../../../../dtos/auth/authenticate.dto";

export type AuthenticateResponse = {
    bearer: string;
    expiresIn: number;
};

export default interface IAuthenticateService {
    execute(authenticateData: AuthenticateDto): Promise<AuthenticateResponse>;
}
