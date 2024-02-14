import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {

        }
    })
    console.log("Test data created");

    await prisma.area.deleteMany({})
    await prisma.area.createMany({
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
    const areas = await prisma.area.findMany()
    console.log(areas)
    await prisma.degree.deleteMany({})
    await prisma.degree.createMany({
            data: [
                {
                    name: "Grado en Animación + Titulo Propio en Arte para Videojuegos",
                    areaId: areas[0].id
                },
                {
                    name: "Grado en Animación",
                    areaId: areas[0].id
                },
                {
                    name: "Grado en Efectos Visuales",
                    areaId: areas[1].id
                },
                {
                    name: "Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos",
                    areaId: areas[1].id
                },
                {
                    name: "Grado en Diseño Digital",
                    areaId: areas[2].id
                },
                {
                    name: "Ciclo de Grado Superior en Artes Plásticas y Diseño en Ilustración",
                    areaId: areas[2].id
                },
                {
                    name: "Grado en Diseño de Productos Interactivos + Título Propio en Technical Design para Unreal Engine",
                    areaId: areas[3].id
                },
                {
                    name: "Grado en Ingeniería del Software",
                    areaId: areas[4].id
                },
                {
                    name: "Doble Grado en Matemática Computacional e Ingeniería del Software",
                    areaId: areas[5].id
                },
                {
                    name: "Doble Grado en Física Computacional e Ingeniería del Software",
                    areaId: areas[5].id
                },
                {
                    name: "Ciclo de Grado Superior en Administración de Sistemas Informáticos en Red",
                    areaId: areas[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma Dual",
                    areaId: areas[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Web",
                    areaId: areas[4].id
                },
                {
                    name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
                    areaId: areas[4].id
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