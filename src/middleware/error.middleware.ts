import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Duplicate Mongo Error
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // Mongoose Cast Error
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val: any) => val.message).join(", ");
    }

    // Production vs Development
    if (process.env.NODE_ENV === "production") {
        if (err.isOperational)  res.status(statusCode).json({ success: false, message });

        // Unknown error (don't leak stack)
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }

    // Development mode
    return res.status(statusCode).json({ success: false, message, stack: err.stack });
};