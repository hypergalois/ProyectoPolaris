import { z } from 'zod';
import { academicRoleList } from '../config/tags.js';

// TODO: Añadir validacion de cargo y comprobar promocion si es alumni y si no departamento

export const registerSchema = z.object({
    fullName: z.string({
        required_error: 'Full name is required'
    }).refine(fullName => {
        const parts = fullName.split(' ');
        return parts.length >= 3;
    }, {
        message: 'fullName must include at least 2 surnames'
    }),
    username: z.string().optional(),
    email: z.string({
        required_error: 'Email is required'
    }).refine(email => {
        // Check if the email ends with @live.u-tad.com or @u-tad.com
        return email.endsWith('@live.u-tad.com') || email.endsWith('@u-tad.com');
    }, {
        message: 'Email must end with @live.u-tad.com or @u-tad.com'
    }),
    password: z.string({
        required_error: 'Password is required'
    }),
    academicRole: z.string({
        required_error: 'Academic role is required'
    }).refine(role => {
        // Check if the role is one of the values in the academicRole object
        return Object.values(academicRoleList).includes(role);
    }, {
        message: `Academic role must be one of ${Object.values(academicRoleList).join(', ')}`
    }),
    promotion: z.string().optional(),
    academicCourse: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).refine(email => {
        // Check if the email ends with @live.u-tad.com or @u-tad.com
        return email.endsWith('@live.u-tad.com') || email.endsWith('@u-tad.com');
    }, {
        message: 'Email must end with @live.u-tad.com or @u-tad.com'
    }),
    password: z.string({
        required_error: 'Password is required'
    })
});