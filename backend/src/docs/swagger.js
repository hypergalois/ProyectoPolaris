import swaggerJSDoc from "swagger-jsdoc";

// Serve Swagger UI
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Proyecto Polaris",
        description: "API para Proyecto Polaris",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:4000", // Update with your actual API base URL
            description: "Development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [
        "./src/routes/*.js", // Update with the path to your route files
    ],
    components: {
        schemas: {
            Role: {
                type: "string",
                enum: ["ADMIN", "CREATOR", "USER"],
            },
            Status: {
                type: "string",
                enum: ["PENDING", "ACCEPTED", "REJECTED"],
            },
            User: {
                type: "object",
                properties: {
                    id: { type: "string", format: "ObjectId" },
                    fullName: { type: "string" },
                    email: { type: "string", uniqueItems: true },
                    emailVerified: { type: "boolean", default: false },
                    username: { type: "string", uniqueItems: true },
                    passwordHash: { type: "string" },
                    role: {
                        $ref: "#/components/schemas/Role",
                        default: "USER",
                    },
                    position: { type: "string" },
                    promotion: { type: "string" },
                    academicCourse: { type: "string" },
                    degreeId: { type: "string", format: "ObjectId" },
                    degree: { $ref: "#/components/schemas/Degree" },
                    requests: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Request" },
                    },
                    involvedAsStudentIDs: {
                        type: "array",
                        items: { type: "string", format: "ObjectId" },
                    },
                    involvedAsStudent: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Project" },
                        name: "involvedAsStudent",
                    },
                    involvedAsProfessorIDs: {
                        type: "array",
                        items: { type: "string", format: "ObjectId" },
                    },
                    involvedAsProfessor: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Project" },
                        name: "involvedAsProfessor",
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        default: "now()",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        updatedAt: true,
                    },
                },
                required: ["email", "username", "passwordHash"],
            },
            Project: {
                type: "object",
                properties: {
                    id: { type: "string", format: "ObjectId" },
                    status: {
                        $ref: "#/components/schemas/Status",
                        default: "PENDING",
                    },
                    Request: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Request" },
                    },
                    title: { type: "string" },
                    type: { type: "string" },
                    description: { type: "string" },
                    summary: { type: "string" },
                    report: { type: "string" },
                    differentiator: { type: "string" },
                    keywords: { type: "array", items: { type: "string" } },
                    awards: { type: "array", items: { type: "string" } },
                    subject: { type: "string" },
                    personalProject: { type: "boolean" },
                    academicCourse: { type: "string" },
                    course: { type: "string" },
                    letter: { type: "string" },
                    externalLinks: { type: "array", items: { type: "string" } },
                    uploadedContent: {
                        type: "array",
                        items: { type: "string" },
                    },
                    areaId: { type: "string", format: "ObjectId" },
                    area: { $ref: "#/components/schemas/Area" },
                    impliedStudentsIDs: {
                        type: "array",
                        items: { type: "string", format: "ObjectId" },
                    },
                    impliedStudents: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" },
                        name: "involvedAsStudent",
                    },
                    impliedProfessorsIDs: {
                        type: "array",
                        items: { type: "string", format: "ObjectId" },
                    },
                    impliedProfessors: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" },
                        name: "involvedAsProfessor",
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        default: "now()",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        updatedAt: true,
                    },
                },
                required: ["title", "description"],
            },
            Degree: {
                type: "object",
                properties: {
                    id: { type: "string", format: "ObjectId" },
                    name: { type: "string" },
                    areaId: { type: "string", format: "ObjectId" },
                    area: { $ref: "#/components/schemas/Area" },
                    users: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" },
                    },
                },
                required: ["name"],
            },
            Area: {
                type: "object",
                properties: {
                    id: { type: "string", format: "ObjectId" },
                    name: { type: "string", uniqueItems: true },
                    degrees: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Degree" },
                    },
                    projects: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Project" },
                    },
                },
                required: ["name"],
            },
            Request: {
                type: "object",
                properties: {
                    id: { type: "string", format: "ObjectId" },
                    status: {
                        $ref: "#/components/schemas/Status",
                        default: "PENDING",
                    },
                    projectId: { type: "string", format: "ObjectId" },
                    project: { $ref: "#/components/schemas/Project" },
                    projectTitle: { type: "string" },
                    description: { type: "string" },
                    academicCourse: { type: "string" },
                    requester: { $ref: "#/components/schemas/User" },
                    requesterId: { type: "string", format: "ObjectId" },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        default: "now()",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        updatedAt: true,
                    },
                },
                required: ["projectId", "description", "requesterId"],
            },
        },
    },
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
