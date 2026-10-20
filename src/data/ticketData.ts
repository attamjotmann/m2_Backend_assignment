
import { Ticket } from "./ticketTypes";

// Number of milliseconds in one day
const MILLISECONDS_PER_DAY: number = 24 * 60 * 60 * 1000;

// Use the current time as the reference for sample ticket dates
const referenceTime: number = Date.now();

/**
 * Creates an ISO timestamp for a date a specified number of days ago.
 * @param daysAgo - Number of days before the reference time
 * @returns The calculated date as an ISO string
 */
const getCreatedAt = (daysAgo: number): string => {
    return new Date(
        referenceTime - daysAgo * MILLISECONDS_PER_DAY
    ).toISOString();
};

/**
 * Initial support ticket data.
 * Dates are calculated relative to the current date.
 */
export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: getCreatedAt(3),
    },
    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: getCreatedAt(2),
    },
    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: getCreatedAt(6),
    },
    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: getCreatedAt(5),
    },
    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: getCreatedAt(9),
    },
    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: getCreatedAt(6),
    },
    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: getCreatedAt(10),
    },
];
