import http from "http";
import app from "./app";
import connectDB from "./src/config/db.config";
import { env } from "./src/config/env";

// Handle Uncaught Exceptions (Sync errors)
process.on("uncaughtException", (err: Error) => {
    console.error("❌ UNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});

let server: http.Server;

const startServer = async () => {
    try {
        // 1️⃣ Connect Database
        await connectDB();

        // 2️⃣ Create HTTP server
        server = http.createServer(app);

        // 3️⃣ Start listening
        server.listen(env.PORT, () => console.log(`🚀 Server running on port ${env.PORT}`));

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();


// Handle Unhandled Promise Rejections (Async errors)
process.on("unhandledRejection", (err: any) => {
    console.error("❌ UNHANDLED REJECTION! Shutting down...");
    console.error(err);

    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});


// Graceful shutdown (Docker, PM2, cloud)
process.on("SIGTERM", () => {
    console.log("👋 SIGTERM received. Shutting down gracefully...");

    if (server) server.close(() => console.log("💥 Process terminated"));
});