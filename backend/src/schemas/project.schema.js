import { z } from "zod";

// TODO: Mejorar esquemas

export const projectSchema = z.object({
	title: z.string({
		required_error: "Title is required",
	}),
	type: z.string({
		required_error: "Type is required",
	}),
	description: z.string({
		required_error: "Description is required",
	}),
	departmentName: z.string({
		required_error: "Department is required",
	}),
	externalLink: z.array(z.string()).optional(),
	awards: z.array(z.string()).optional(),
	keywords: z.array(z.string()).optional(),
});

export const updateProjectSchema = z.object({
	title: z.string().optional(),
	type: z.string().optional(),
	status: z.string().optional(),
	description: z.string().optional(),
	subject: z.string().optional(),
	personalProject: z.boolean().optional(),
	academicCourse: z.string().optional(),
	course: z.string().optional(),
	letter: z.string().optional(),
	summary: z.string().optional(),
	report: z.string().optional(),
    pinned: z.boolean().optional(),
	externalLink: z.array(z.string()).optional(),
	awards: z.array(z.string()).optional(),
	keywords: z.array(z.string()).optional(),
});
