class createError extends Error {
    readonly status: number;

    constructor(status:number = 500,message:string="internal server error"){
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default createError;