import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(128, "Title must be at most 128 characters long"),
    description: z.string().min(0, "Description must be at least 3 characters long").max(1000, "Description must be at most 1000 characters long"),
    status: z.enum(["pending", "in_progress", "done"]),
});