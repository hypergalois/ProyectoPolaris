import { z } from 'zod';

// TODO: Mejorar esquemas

export const projectSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    type: z.string({
        required_error: 'Type is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    differentiator: z.string({
        required_error: 'Differentiator is required'
    }),
    subject: z.string({
        required_error: 'Subject is required'
    }),
    personalProject: z.boolean({
        required_error: 'Personal project is required'
    }),
    academicCourse: z.string({
        required_error: 'Academic course is required'
    }),
    course: z.string({
        required_error: 'Course is required'
    }),
    letter: z.string({
        required_error: 'Letter is required'
    }),
    summary: z.string({
        required_error: 'Summary is required'
    }),
    report: z.string({
        required_error: 'Report is required'
    }),
    externalLink: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
});

export const updateProjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    })
});