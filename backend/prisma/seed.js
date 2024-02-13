import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {

        }
    })
    console.log("Test data created");

    await prisma.department.deleteMany({})
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
    const departments = await prisma.department.findMany()
    console.log(departments)
    await prisma.degree.deleteMany({})
    await prisma.degree.createMany({
            data: [
                {
                    name: "Grado en Animación + Titulo Propio en Arte para Videojuegos",
                    departmentId: departments[0].id
                },
                {
                    name: "Grado en Animación",
                    departmentId: departments[0].id
                },
                {
                    name: "Grado en Efectos Visuales",
                    departmentId: departments[1].id
                },
                {
                    name: "Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos",
                    departmentId: departments[1].id
                },
                {
                    name: "Grado en Diseño Digital",
                    departmentId: departments[2].id
                },
                {
                    name: "Ciclo de Grado Superior en Artes Plásticas y Diseño en Ilustración",
                    departmentId: departments[2].id
                },
                {
                    name: "Grado en Diseño de Productos Interactivos + Título Propio en Technical Design para Unreal Engine",
                    departmentId: departments[3].id
                },
                {
                    name: "Grado en Ingeniería del Software",
                    departmentId: departments[4].id
                },
                {
                    name: "Doble Grado en Matemática Computacional e Ingeniería del Software",
                    departmentId: departments[5].id
                },
                {
                    name: "Doble Grado en Física Computacional e Ingeniería del Software",
                    departmentId: departments[5].id
                },
                {
                    name: "Ciclo de Grado Superior en Administración de Sistemas Informáticos en Red",
                    departmentId: departments[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma Dual",
                    departmentId: departments[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Web",
                    departmentId: departments[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
                    departmentId: departments[4].id
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