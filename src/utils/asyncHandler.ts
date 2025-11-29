import express, { Request, Response, NextFunction } from 'express';

const asyncHandler = (requestHandeler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandeler(req, res, next))
            .catch((error: unknown) => {
                const status = (error as any)?.status || 500;
                const message = (error as any)?.message || "Internal Server Error";

                res.status(status).json({
                    success: false,
                    message,
                });
            })
    }
}
export { asyncHandler }