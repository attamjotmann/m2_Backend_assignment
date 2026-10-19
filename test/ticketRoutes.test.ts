
import request from "supertest";
import { Response } from "supertest";
import app from "../src/app";
import { tickets } from "../src/data/ticketData";
import { Ticket } from "../src/data/ticketTypes";

// Preserve the original sample tickets between tests
const initialTickets: Ticket[] = structuredClone(tickets);

afterEach((): void => {
    tickets.splice(
        0,
        tickets.length,
        ...structuredClone(initialTickets)
    );
});

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

    describe("POST /api/v1/tickets", (): void => {
        it("should create a new support ticket", async (): Promise<void> => {
            // Arrange
            const newTicket = {
                title: "Test ticket",
                description: "Testing ticket creation",
                priority: "medium",
            };

            // Act
            const response: Response = await request(app)
                .post("/api/v1/tickets")
                .send(newTicket);

            // Assert
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Ticket created");
            expect(response.body.data.title).toBe(newTicket.title);
            expect(response.body.data.status).toBe("open");
            expect(response.body.data).toHaveProperty("createdAt");
        });

        it("should reject invalid ticket priority", async (): Promise<void> => {
            // Arrange
            const invalidTicket = {
                title: "Invalid priority test",
                description: "Testing validation",
                priority: "urgent",
            };

            // Act
            const response: Response = await request(app)
                .post("/api/v1/tickets")
                .send(invalidTicket);

            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "Invalid priority. Must be one of: critical, high, medium, low",
            });
        });
    });

    describe("PUT /api/v1/tickets/:id", (): void => {
        it("should update an existing support ticket", async (): Promise<void> => {
            // Arrange
            const ticketId: number = 1;

            const updates = {
                priority: "high",
                status: "in-progress",
            };

            // Act
            const response: Response = await request(app)
                .put(`/api/v1/tickets/${ticketId}`)
                .send(updates);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Ticket updated");
            expect(response.body.data.id).toBe(ticketId);
            expect(response.body.data.priority).toBe("high");
            expect(response.body.data.status).toBe("in-progress");
        });
    });

    describe("DELETE /api/v1/tickets/:id", (): void => {
        it("should delete an existing support ticket", async (): Promise<void> => {
            // Arrange
            const ticketId: number = 7;

            // Act
            const response: Response = await request(app).delete(
                `/api/v1/tickets/${ticketId}`
            );

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Ticket deleted",
            });

            const getResponse: Response = await request(app).get(
                `/api/v1/tickets/${ticketId}`
            );

            expect(getResponse.status).toBe(404);
        });
    });
});
