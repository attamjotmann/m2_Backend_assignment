
import { tickets } from "../../../data/ticketData";
import { Ticket } from "../../../data/ticketTypes";

/**
 * Retrieves all support tickets.
 * @returns An array containing all support tickets
 */
export const getAllTickets = (): Ticket[] => {
    return structuredClone(tickets);
};

/**
 * Retrieves a support ticket by its ID.
 * @param id - The ID of the ticket to retrieve
 * @returns The matching ticket or undefined if it does not exist
 */
export const getTicketById = (id: number): Ticket | undefined => {
    const ticket: Ticket | undefined = tickets.find(
        (currentTicket: Ticket): boolean => currentTicket.id === id
    );

    if (ticket === undefined) {
        return undefined;
    }

    return structuredClone(ticket);
};
