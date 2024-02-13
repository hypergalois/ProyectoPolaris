import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {

        }
    })
    console.log("Test data created");

    await prisma.department.deleteMany()
    await prisma.department.createMany({
        data: [
            { name: "Animación" },
            { name: "Efectos Visuales" },
            { name: "Diseño Digital" },
            { name: "Videojuegos" },
            { name: "Ingeniería" },
            { name: "Física y Matemáticas" },
            { name: "Ciberseguridad" },
            { name: "Inteligencia Artificial" },
            { name: "Realidad Virtual" },
            { name: "Negocio y Marketing" }
        ]
    })
    await prisma.degree.deleteMany()
    await prisma.degree.createMany({
            data: [
                {
                    name: "Grado en Animación + Titulo Propio en Arte para Videojuegos",
                    departmentId: { connect : { name: "Animación" } }
                },
                {
                    name: "Grado en Animación",
                    departmentId: "Animación"
                },
                {
                    name: "Grado en Efectos Visuales",
                    departmentId: "Efectos Visuales"
                },
                {
                    name: "Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos",
                    departmentId: "Animación"
                },
                {
                    name: "Grado en Diseño Digital",
                    departmentId: "Diseño Digital"
                },
                {
                    name: "Ciclo de Grado Superior en Artes Plásticas y Diseño en Ilustración",
                    departmentId: "Diseño Digital"
                },
                {
                    name: "Grado en Diseño de Productos Interactivos + Título Propio en Technical Design para Unreal Engine",
                    departmentId: "Videojuegos"
                },
                {
                    name: "Grado en Ingeniería del Software",
                    departmentId: "Ingeniería"
                },
                {
                    name: "Doble Grado en Matemática Computacional e Ingeniería del Software",
                    departmentId: "Física y Matemáticas"
                },
                {
                    name: "Doble Grado en Física Computacional e Ingeniería del Software",
                    departmentId: "Física y Matemáticas"
                },
                {
                    name: "Ciclo de Grado Superior en Administración de Sistemas Informáticos en Red",
                    departmentId: "Ingeniería"
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma Dual",
                    departmentId: "Ingeniería"
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Web",
                    departmentId: "Ingeniería"
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
                    departmentId: "Ingeniería"
                }
            ]
        })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });