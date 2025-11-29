class apiError extends Error {
    public statusCode: number;
    public errors: unknown[];
    public data: unknown | null;
    public success: boolean;

    constructor(
        statusCode: number,
        message: string,
        errors: unknown[] = [],
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.success = false;


        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { apiError }