class apiResponse {
    public statusCode: number;
    public message: string;
    public data: string | object;
    public success: boolean | number | string;
    constructor(
        statusCode: number,
        data: string | object,
        message: string
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export { apiResponse };
