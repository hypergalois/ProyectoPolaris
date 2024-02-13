import { z } from 'zod';

export const areaSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    })
});