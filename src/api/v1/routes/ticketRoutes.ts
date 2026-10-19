import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
} from "../controllers/ticketController";

// Initialize the router for support ticket endpoints
const ticketRoutes: Router = Router();

// Retrieve all support tickets
ticketRoutes.get("/", getAllTicketsController);

// Retrieve a support ticket by ID
ticketRoutes.get("/:id", getTicketByIdController);

export default ticketRoutes;
