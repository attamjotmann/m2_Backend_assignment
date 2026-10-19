
// import the express application and type definition
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

// initialize the express application
const app: Express = express();

// Configure middleware for HTTP request logging
app.use(morgan("combined"));

// Configure middleware to parse JSON request bodies
app.use(express.json());

// Mount the support ticket routes
app.use("/api/v1/tickets", ticketRoutes);

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// respond to GET request at endpoint "/" with message
app.get("/", (_req: Request, res: Response): void => {
    res.send("Hello, world!");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (_req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

// export app and server for testing
export default app;
