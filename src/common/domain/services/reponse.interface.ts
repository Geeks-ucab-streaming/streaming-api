export class ResultResponse<T>{
    value:T;
    statusCode:number;
    message:string;
    error?:string;
    constructor(value:T, message:string, error:string, statusCode:number){
        this.value = value;
        this.message = message;
        this.error = error;
        this.statusCode = statusCode;
    }



}