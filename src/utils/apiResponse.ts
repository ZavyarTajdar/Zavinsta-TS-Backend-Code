class apiResponse {
    public statusCode: number;
    public data: string | object;
    public message: string;
    public success: boolean | number | string;
    constructor(
        statusCode: number,
        data: string | object = {}, 
        message: string = "Success"
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export { apiResponse };
