
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    Ticket,
    TicketPriority,
    TicketStatus,
    CreateTicketInput,
    UpdateTicketInput,
} from "../../../data/ticketTypes";
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
} from "../services/ticketService";

/**
 * Defines the possible fields received in a ticket request body.
 */
interface TicketRequestBody {
    title?: unknown;
    description?: unknown;
    priority?: unknown;
    status?: unknown;
}

/**
 * Checks whether a value is a valid ticket priority.
 * @param value - Value to validate
 * @returns True if the value is a valid priority
 */
const isTicketPriority = (value: unknown): value is TicketPriority => {
    return (
        value === "critical" ||
        value === "high" ||
        value === "medium" ||
        value === "low"
    );
};

/**
 * Checks whether a value is a valid ticket status.
 * @param value - Value to validate
 * @returns True if the value is a valid status
 */
const isTicketStatus = (value: unknown): value is TicketStatus => {
    return (
        value === "open" ||
        value === "in-progress" ||
        value === "resolved"
    );
};

/**
 * Handles the request to retrieve all support tickets.
 * @param _req - Incoming HTTP request
 * @param res - HTTP response
 * @returns Nothing; sends the ticket array to the client
 */
export const getAllTicketsController = (
    _req: Request,
    res: Response
): void => {
    const allTickets: Ticket[] = getAllTickets();

    res.status(HTTP_STATUS.OK).json(allTickets);
};

/**
 * Handles the request to retrieve a support ticket by ID.
 * @param req - Incoming HTTP request containing the ticket ID
 * @param res - HTTP response
 * @returns Nothing; sends the ticket or an error response
 */
export const getTicketByIdController = (
    req: Request,
    res: Response
): void => {
    const id: number = Number(req.params.id);

    const ticket: Ticket | undefined = getTicketById(id);

    if (ticket === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json(ticket);
};

/**
 * Handles the request to create a support ticket.
 * @param req - Incoming HTTP request containing ticket data
 * @param res - HTTP response
 * @returns Nothing; sends the created ticket or a validation error
 */
export const createTicketController = (
    req: Request<Record<string, string>, unknown, TicketRequestBody>,
    res: Response
): void => {
    const body: TicketRequestBody = req.body ?? {};

    if (typeof body.title !== "string" || body.title.trim() === "") {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title",
        });
        return;
    }

    if (
        typeof body.description !== "string" ||
        body.description.trim() === ""
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: description",
        });
        return;
    }

    if (!isTicketPriority(body.priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return;
    }

    const ticketData: CreateTicketInput = {
        title: body.title,
        description: body.description,
        priority: body.priority,
    };

    const newTicket: Ticket = createTicket(ticketData);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created",
        data: newTicket,
    });
};

/**
 * Handles the request to update a support ticket.
 * @param req - Incoming HTTP request containing ticket ID and updates
 * @param res - HTTP response
 * @returns Nothing; sends the updated ticket or an error response
 */
export const updateTicketController = (
    req: Request<Record<string, string>, unknown, TicketRequestBody>,
    res: Response
): void => {
    const id: number = Number(req.params.id);

    const existingTicket: Ticket | undefined = getTicketById(id);

    if (existingTicket === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    const body: TicketRequestBody = req.body ?? {};

    if (
        body.priority !== undefined &&
        !isTicketPriority(body.priority)
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return;
    }

    if (
        body.status !== undefined &&
        !isTicketStatus(body.status)
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved",
        });
        return;
    }

    const updates: UpdateTicketInput = {};

    if (typeof body.title === "string") {
        updates.title = body.title;
    }

    if (typeof body.description === "string") {
        updates.description = body.description;
    }

    if (isTicketPriority(body.priority)) {
        updates.priority = body.priority;
    }

    if (isTicketStatus(body.status)) {
        updates.status = body.status;
    }

    const updatedTicket: Ticket | undefined = updateTicket(id, updates);

    if (updatedTicket === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket updated",
        data: updatedTicket,
    });
};

/**
 * Handles the request to delete a support ticket.
 * @param req - Incoming HTTP request containing the ticket ID
 * @param res - HTTP response
 * @returns Nothing; sends a success or not found response
 */
export const deleteTicketController = (
    req: Request,
    res: Response
): void => {
    const id: number = Number(req.params.id);

    const wasDeleted: boolean = deleteTicket(id);

    if (!wasDeleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket deleted",
    });
};