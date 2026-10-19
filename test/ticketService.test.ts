
import {
    calculateTicketAge,
    calculateUrgencyScore,
} from "../src/api/v1/services/ticketService";
import {
    Ticket,
    TicketPriority,
} from "../src/data/ticketTypes";

// Fixed reference date for predictable test results
const referenceTime: number = new Date(
    "2025-01-15T10:00:00.000Z"
).getTime();

const MILLISECONDS_PER_DAY: number = 24 * 60 * 60 * 1000;

/**
 * Creates a test ticket with a specified priority and age.
 * @param priority - Priority assigned to the ticket
 * @param daysAgo - Age of the ticket in days
 * @returns A support ticket for testing
 */
const createTestTicket = (
    priority: TicketPriority,
    daysAgo: number
): Ticket => {
    return {
        id: 1,
        title: "Test ticket",
        description: "Testing urgency calculation",
        priority: priority,
        status: "open",
        createdAt: new Date(
            referenceTime - daysAgo * MILLISECONDS_PER_DAY
        ).toISOString(),
    };
};

describe("Ticket Urgency Calculation", (): void => {
    it("should calculate a low priority ticket score", (): void => {
        // Arrange
        const ticket: Ticket = createTestTicket("low", 3);

        // Act
        const age: number = calculateTicketAge(
            ticket.createdAt,
            referenceTime
        );

        const score: number = calculateUrgencyScore(
            ticket,
            referenceTime
        );

        // Assert
        expect(age).toBe(3);
        expect(score).toBe(25);
    });

    it("should calculate a medium priority ticket score", (): void => {
        // Arrange
        const ticket: Ticket = createTestTicket("medium", 6);

        // Act
        const score: number = calculateUrgencyScore(
            ticket,
            referenceTime
        );

        // Assert
        expect(score).toBe(50);
    });

    it("should calculate a high priority ticket score", (): void => {
        // Arrange
        const ticket: Ticket = createTestTicket("high", 9);

        // Act
        const score: number = calculateUrgencyScore(
            ticket,
            referenceTime
        );

        // Assert
        expect(score).toBe(75);
    });

    it("should calculate a critical priority ticket score", (): void => {
        // Arrange
        const ticket: Ticket = createTestTicket("critical", 6);

        // Act
        const score: number = calculateUrgencyScore(
            ticket,
            referenceTime
        );

        // Assert
        expect(score).toBe(80);
    });
});
