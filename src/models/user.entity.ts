export default class UserEntity {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly id?: string,
    ) {}
}
