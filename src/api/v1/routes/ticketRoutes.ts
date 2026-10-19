
import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
    createTicketController,
    updateTicketController,
    deleteTicketController,
} from "../controllers/ticketController";

// Initialize the router for support ticket endpoints
const ticketRoutes: Router = Router();

// Retrieve all support tickets
ticketRoutes.get("/", getAllTicketsController);

// Retrieve a support ticket by ID
ticketRoutes.get("/:id", getTicketByIdController);

// Create a new support ticket
ticketRoutes.post("/", createTicketController);

// Update an existing support ticket
ticketRoutes.put("/:id", updateTicketController);

// Delete an existing support ticket
ticketRoutes.delete("/:id", deleteTicketController);

export default ticketRoutes;