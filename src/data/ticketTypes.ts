/**
 * Defines the allowed priority levels for support tickets.
 */
export type TicketPriority = "critical" | "high" | "medium" | "low";

/**
 * Defines the allowed status values for support tickets.
 */
export type TicketStatus = "open" | "in-progress" | "resolved";

/**
 * Represents a support ticket in the system.
 */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
}

/**
 * Defines the fields required when creating a ticket.
 */
export type CreateTicketInput = Pick<
    Ticket,
    "title" | "description" | "priority"
>;

/**
 * Defines the fields that can be updated on a ticket.
 */
export type UpdateTicketInput = Partial<
    Pick<Ticket, "title" | "description" | "priority" | "status">
>;