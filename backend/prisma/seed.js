import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.area.deleteMany({});
    await prisma.area.createMany({
        data: [
            { name: "Animación" }, // 0
            { name: "Efectos Visuales" }, // 1
            { name: "Diseño Digital" }, // 2
            { name: "Videojuegos" }, // 3
            { name: "Ingeniería" }, // 4
            { name: "Física y Matemáticas" }, // 5
            { name: "Ciberseguridad" }, // 6
            { name: "Inteligencia Artificial" }, // 7
            { name: "Realidad Virtual" }, // 8
            { name: "Negocio y Marketing" } // 9
        ]
    });
    const areas = await prisma.area.findMany();
    await prisma.degree.deleteMany({});
    await prisma.degree.createMany({
        data: [
            {
                name: "Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos",
                areasId: [areas[0].id, areas[1].id, areas[2].id],
            },
            {
                name: "Grado en Animación + Titulo Propio en Arte para Videojuegos",
                areasId: [areas[0].id],
            },
            {
                name: "Grado en Animación",
                areasId: [areas[0].id],
            },
            {
                name: "Grado en Efectos Visuales",
                areasId: [areas[1].id],
            },
            {
                name: "Grado en Diseño Digital",
                areasId: [areas[2].id],
            },
            {
                name: "Ciclo de Grado Superior en Artes Plásticas y Diseño en Animación",
                areasId: [areas[2].id],
            },
            {
                name: "Ciclo de Grado Superior en Artes Plásticas y Diseño en Ilustración",
                areasId: [areas[2].id],
            },
            {
                name: "Grado en Animación + Título Propio en Arte para Videojuegos",
                areasId: [areas[3].id],
            },
            {
                name: "Grado en Diseño de Productos Interactivos + Título Propio en Technical Design para Unreal Engine",
                areasId: [areas[3].id],
            },
            {
                name: "Grado en Ingeniería del Software + Título Propio en Ingeniería de Videojuegos",
                areasId: [areas[3].id],
            },
            {
                name: "Grado en Ingeniería del Software",
                areasId: [areas[4].id],
            },
            {
                name: "Grado en Ingeniería del Software + Especialización en Programación Gráfica y RV",
                areasId: [areas[4].id, areas[8].id],
            },
            {
                name: "Grado en Ingeniería del Software + Especialización en Ingeniería de Datos IA",
                areasId: [areas[4].id, areas[7].id],
            },
            {
                name: "Grado en Ingeniería del Software + Título Propio en Ingeniería de Videojuegos",
                areasId: [areas[4].id],
            },
            {
                name: "Grado en Ingeniería del Software + Especialización en Ciberseguridad",
                areasId: [areas[4].id, areas[6].id],
            },
            {
                name: "Doble Grado en Matemática Computacional e Ingeniería del Software",
                areasId: [areas[4].id, areas[5].id, areas[7].id],
            },
            {
                name: "Doble Grado en Física Computacional e Ingeniería del Software",
                areasId: [areas[4].id, areas[5].id, areas[7].id],
            },
            {
                name: "Ciclo de Grado Superior en Administración de Sistemas Informáticos en Red",
                areasId: [areas[4].id],
            },
            {
                name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma Dual",
                areasId: [areas[4].id],
            },
            {
                name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Web",
                areasId: [areas[4].id],
            },
            {
                name: "Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
                areasId: [areas[4].id],
            },
            {
                name: "Grado en Dirección de Empresas de Entretenimiento Digital",
                areasId: [areas[9].id],
            },
            {
                name: "Ciclo de Grado Superior en Marketing y Publicidad + Título Propio en E-commerce y Marketplaces",
                areasId: [areas[9].id],
            }
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
