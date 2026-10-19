
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Ticket } from "../../../data/ticketTypes";
import {
    getAllTickets,
    getTicketById,
} from "../services/ticketService";

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
