import IMessage from "./interface/Imessage";
export default class SuccessMessage implements IMessage {
    message?: string;
    data: any;

    constructor(message: string = "Success", data: any) {
        this.message = message;
        this.data = data;
    }

    create = () => ({
        message: this.message,
        data: this.data
    })

}