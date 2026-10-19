
import { tickets } from "../../../data/ticketData";
import {
    Ticket,
    CreateTicketInput,
    UpdateTicketInput,
} from "../../../data/ticketTypes";
import {
    MILLISECONDS_PER_DAY,
    URGENCY_POINTS_PER_DAY,
    PRIORITY_BASE_SCORES,
} from "../../../constants/urgencyConstants";

// Track the next available ticket ID
let nextTicketId: number =
    Math.max(...tickets.map((ticket: Ticket): number => ticket.id)) + 1;

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

/**
 * Creates a new support ticket.
 * @param ticketData - Required fields for the new ticket
 * @returns The newly created ticket
 */
export const createTicket = (ticketData: CreateTicketInput): Ticket => {
    const newTicket: Ticket = {
        id: nextTicketId,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date().toISOString(),
    };

    nextTicketId += 1;

    tickets.push(newTicket);

    return structuredClone(newTicket);
};

/**
 * Updates an existing support ticket.
 * @param id - ID of the ticket to update
 * @param updates - Fields to change
 * @returns The updated ticket or undefined if it does not exist
 */
export const updateTicket = (
    id: number,
    updates: UpdateTicketInput
): Ticket | undefined => {
    const index: number = tickets.findIndex(
        (ticket: Ticket): boolean => ticket.id === id
    );

    if (index === -1) {
        return undefined;
    }

    const updatedTicket: Ticket = {
        ...tickets[index],
        ...updates,
    };

    tickets[index] = updatedTicket;

    return structuredClone(updatedTicket);
};

/**
 * Deletes a support ticket by its ID.
 * @param id - ID of the ticket to delete
 * @returns True if the ticket was deleted, otherwise false
 */
export const deleteTicket = (id: number): boolean => {
    const index: number = tickets.findIndex(
        (ticket: Ticket): boolean => ticket.id === id
    );

    if (index === -1) {
        return false;
    }

    tickets.splice(index, 1);

    return true;
};

/**
 * Calculates the age of a ticket in whole days.
 * @param createdAt - Ticket creation timestamp
 * @param referenceTime - Time used to calculate the ticket's age
 * @returns Ticket age in whole days
 */
export const calculateTicketAge = (
    createdAt: string,
    referenceTime: number = Date.now()
): number => {
    const createdAtTime: number = new Date(createdAt).getTime();

    const ticketAge: number = Math.floor(
        (referenceTime - createdAtTime) / MILLISECONDS_PER_DAY
    );

    return Math.max(0, ticketAge);
};

/**
 * Calculates an urgency score using ticket priority and age.
 * @param ticket - Support ticket to evaluate
 * @param referenceTime - Time used to calculate ticket age
 * @returns Calculated numerical urgency score
 */
export const calculateUrgencyScore = (
    ticket: Ticket,
    referenceTime: number = Date.now()
): number => {
    const baseScore: number = PRIORITY_BASE_SCORES[ticket.priority];

    const ticketAge: number = calculateTicketAge(
        ticket.createdAt,
        referenceTime
    );

    const urgencyScore: number =
        baseScore + ticketAge * URGENCY_POINTS_PER_DAY;

    return urgencyScore;
};
