import request from "supertest";
// import supertest request object

import { Response } from "supertest";
// import supertest Response type

import app from "../src/app";
// import express application and server

describe("GET /", (): void => {
    it("should return Hello, world!", async (): Promise<void> => {
        // Arrange
        // The Express application is imported above.

        // Act
        // create GET request to root endpoint
        const response: Response = await request(app).get("/");

        // Assert
        // assert that response status is OK, response text is "Hello, world!"
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, world!");
    });
});

describe("GET /api/v1/health", (): void => {
    it("should return server health status", async (): Promise<void> => {
        // Arrange
        // The Express application is imported above.

        // Act
        // create GET request to health endpoint
        const response: Response = await request(app).get("/api/v1/health");

        // Assert
        // assert response status OK and health object to have specified properties
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});