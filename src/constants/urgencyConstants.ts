
import { TicketPriority } from "../data/ticketTypes";

// Number of milliseconds in one day
export const MILLISECONDS_PER_DAY: number = 24 * 60 * 60 * 1000;

// Points added to a ticket's urgency score for each day of age
export const URGENCY_POINTS_PER_DAY: number = 5;

/**
 * Base urgency scores assigned to each ticket priority.
 */
export const PRIORITY_BASE_SCORES: Record<TicketPriority, number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
};

/**
 * Urgency thresholds based on the demonstrated ticket scores.
 */
export const URGENCY_THRESHOLDS: Record<
    "MODERATE" | "HIGH" | "CRITICAL",
    number
> = {
    MODERATE: 30,
    HIGH: 55,
    CRITICAL: 80,
};

/**
 * Urgency messages shown in the assignment demonstration.
 */
export const URGENCY_MESSAGES: Record<
    "LOW" | "MODERATE" | "HIGH" | "CRITICAL" | "RESOLVED",
    string
> = {
    LOW: "Low urgency: Address when capacity allows.",
    MODERATE: "Moderate. Schedule for attention.",
    HIGH: "High urgency. Prioritize resolution.",
    CRITICAL: "Critical. Immediate attention required.",
    RESOLVED: "Minimal. Ticket resolved.",
};
