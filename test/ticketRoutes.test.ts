
import request from "supertest";
import { Response } from "supertest";
import app from "../src/app";

describe("Ticket Routes", (): void => {
    describe("GET /api/v1/tickets", (): void => {
        it("should return all support tickets", async (): Promise<void> => {
            // Arrange
            // The application contains seven initial support tickets.

            // Act
            const response: Response = await request(app).get(
                "/api/v1/tickets"
            );

            // Assert
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(7);
        });
    });

    describe("GET /api/v1/tickets/:id", (): void => {
        it("should return a ticket by ID", async (): Promise<void> => {
            // Arrange
            const ticketId: number = 1;

            // Act
            const response: Response = await request(app).get(
                `/api/v1/tickets/${ticketId}`
            );

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(ticketId);
            expect(response.body.title).toBe(
                "Update footer copyright year"
            );
        });

        it("should return 404 for a missing ticket", async (): Promise<void> => {
            // Arrange
            const ticketId: number = 999;

            // Act
            const response: Response = await request(app).get(
                `/api/v1/tickets/${ticketId}`
            );

            // Assert
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "Ticket not found",
            });
        });
    });
});
