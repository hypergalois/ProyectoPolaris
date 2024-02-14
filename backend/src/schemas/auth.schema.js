import { z } from 'zod';

// TODO: Añadir validacion de cargo y comprobar promocion si es alumni y si no departamento

export const registerSchema = z.object({
    fullName: z.string().refine(fullName => {
        const parts = fullName.split(' ');
      
        return parts.length >= 3;
      }, {
        message: 'fullName must include at least 2 surnames'
      }).required({
        message: 'fullName is required'
    }),
    username: z.string({
        required_error: 'Username is required'
    }),
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