import { z } from 'zod';

export const departmentSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    area: z.string({
        required_error: 'Area is required'
    }),
    coordinator: z.string({
        required_error: 'Coordinator is required'
    })
});