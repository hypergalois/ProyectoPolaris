import { z } from 'zod';

// TODO: Mejorar esquemas

export const projectSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    })
});

export const updateProjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    })
});