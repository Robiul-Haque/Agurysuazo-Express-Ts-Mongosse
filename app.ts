import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./src/routes/index";
import { errorHandler } from "./src/middleware/error.middleware";
import { notFoundHandler } from "./src/middleware/notfound.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// // Routes
app.use("/api/v1", routes);

// // 404 handler
app.use(notFoundHandler);

// // Error handler
app.use(errorHandler);

export default app;