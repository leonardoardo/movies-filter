import IMessage from "./interface/Imessage";

export default class ErrorMessage implements IMessage {
    message: string;
    error: any;

    constructor(message: string = "Error", error: any) {
        this.message = message;
        this.error = error;
    }

    create = () => ({
        message: this.message,
        error: this.error
    })
}