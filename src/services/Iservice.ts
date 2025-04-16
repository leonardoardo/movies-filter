export interface IService {
    execute(...args: any[]): Promise<any>;
}