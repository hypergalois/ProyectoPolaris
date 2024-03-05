import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.award.deleteMany({});
    await prisma.award.createMany({
        data: [
            { name: "Premios ADG Laus" },
            { name: "Concurso Cortometrajes RNE" },
            { name: "BAM! Festival" },
            { name: "Digital International Festival" },
            { name: "Actualidad Económica" },
            { name: "Bilbao International Conference" },
            { name: "CEIG 2001" },
            { name: "Bienal Iberoamérica de Diseño" },
            { name: "Festival Arte Digital Vialia" },
            { name: "Irish Animation Awards" },
            { name: "PlayStation Awards" },
            { name: "Annie Awards" },
            { name: "SXSW Austin, Texas" },
            { name: "European Cyber Security Challenge" },
            { name: "Programa-Me" },
            { name: "Summa 3D" },
            { name: "Game JamOn" },
            { name: "Gamelab" },
            { name: "Fun & Serious" },
            { name: "Premios Digitales El Español" },
            { name: "Hackatrips" },
            { name: "South Summit" },
            { name: "Indie[Mad]" },
            { name: "Datathon Microsoft" },
            { name: "World Skills Abu Dhabi" },
            { name: "Spain Skills" },
            { name: "My World Blipoint" },
            { name: "Datathon Madrid" },
            { name: "Periodismo de Datos" },
            { name: "Gamingfest" },
            { name: "Madrid Skills" },
            { name: "Premios Goya" },
            { name: "Gamepolis" },
            { name: "Valencia Indie Summit" },
            { name: "Demo Day Semana de VR, AR y Gamificación" },
            { name: "Guerrilla Game Festival" },
            { name: "Robotrader" },
            { name: "Ficod" },
            { name: "COITT Excelencia" },
            { name: "Muycomputer" },
            { name: "50 mejores ideas digitales Expansión" },
            { name: "Premios DeVuego" },
            { name: "Beca Bridging the Gap" },
            { name: "Red Dot Design Award" },
            { name: "IF Design Award" },
            { name: "A' Design Award" },
            { name: "Premios CLAP" },
            { name: "Pentawards" },
            { name: "Webby Awards" },
            { name: "CES Innovation Awards" },
            { name: "TechCrunch Disrupt" },
            { name: "Premios Emprendedores" },
            { name: "MIT Technology Review Innovators Under 35" },
            { name: "Festival de Cine de Cannes" },
            { name: "Berlinale" },
            { name: "Venice Film Festival" },
            { name: "Premios Oscar" },
            { name: "BAFTA Awards" },
            { name: "The Game Awards" },
            { name: "Independent Games Festival" },
            { name: "D.I.C.E. Awards" },
            { name: "Golden Joystick Awards" },
            { name: "BAFTA Game Awards" },
            { name: "RSA Conference Awards" },
            { name: "Cybersecurity Excellence Awards" },
            { name: "SC Awards Europe" },
            { name: "Black Hat Arsenal" },
            { name: "DEF CON Awards" },
            { name: "Y Combinator Demo Day" },
            { name: "Slush" },
            { name: "Techstars Demo Day" },
            { name: "Echelon Asia Summit" },
            { name: "StartUp Grind Global Conference" },
            { name: "Awwwards" },
            { name: "CSS Design Awards" },
            { name: "Lovie Awards" },
            { name: "UX Design Awards" },
            { name: "Web Summit" },
            { name: "Cannes Lions International Festival of Creativity" },
            { name: "Clio Awards" },
            { name: "EFFIE Awards" },
            { name: "The One Show" },
            { name: "D&AD Awards" },
            { name: "QS World University Rankings" },
            { name: "EdTech Awards" },
            { name: "Global Teacher Prize" },
            { name: "WorldSkills Competition" },
            { name: "Microsoft Imagine Cup" },
            { name: "Turner Prize" },
            { name: "National Book Awards" },
            { name: "Pulitzer Prize" },
            { name: "Booker Prize" },
            { name: "Venice Biennale" },
            { name: "Nobel Prize" },
            { name: "Breakthrough Prize" },
            { name: "Earthshot Prize" },
            { name: "Global Energy Prize" },
            { name: "Tyler Prize for Environmental Achievement" }
        ]
    });
    
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
			{ name: "Negocio y Marketing" }, // 9
		],
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
			},
		],
	});
    const degrees = await prisma.degree.findMany();
    console.log(degrees);
	await prisma.subject.deleteMany({});

    // Grado de Animación
	await prisma.subject.createMany({
		data: [
            {
                name: "Introducción al Dibujo y la Pintura",
                degreesId: [degrees[2].id]
            },
            {
                name: "Guion",
                degreesId: [degrees[2].id]
            },
            {
                name: "Principios de Gráficos 3D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Elementos de Composición Visual",
                degreesId: [degrees[2].id]
            },
            {
                name: "Pensamiento Creativo",
                degreesId: [degrees[2].id]
            },
            {
                name: "Historia y Tradición Artística",
                degreesId: [degrees[2].id]
            },
            {
                name: "Principios de Animación",
                degreesId: [degrees[2].id]
            },
            {
                name: "Narrativa Audiovisual",
                degreesId: [degrees[2].id]
            },
            {
                name: "Anatomía Humana Animal",
                degreesId: [degrees[2].id]
            },
            {
                name: "Historia del Cine de Animación",
                degreesId: [degrees[2].id]
            },
            {
                name: "Teoría del Color y de la Luz",
                degreesId: [degrees[2].id]
            },
            {
                name: "Proyectos I",
                degreesId: [degrees[2].id]
            },
            {
                name: "Sistemas de Representación Geométrica",
                degreesId: [degrees[2].id]
            },
            {
                name: "Modelado de Objetos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Principios de Dinámicas del Cuerpo",
                degreesId: [degrees[2].id]
            },
            {
                name: "Producción Digital",
                degreesId: [degrees[2].id]
            },
            {
                name: "Guion Visual - Storyboarding",
                degreesId: [degrees[2].id]
            },
            {
                name: "Edición digital",
                degreesId: [degrees[2].id]
            },
            {
                name: "Fundamentos de Música y Diseño de Sonido",
                degreesId: [degrees[2].id]
            },
            {
                name: "Escultura",
                degreesId: [degrees[2].id]
            },
            {
                name: "Fotografía",
                degreesId: [degrees[2].id]
            },
            {
                name: "Diseño de Personajes",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación 3D de Personajes I",
                degreesId: [degrees[2].id]
            },
            {
                name: "Previsualización y Realización",
                degreesId: [degrees[2].id]
            },
            {
                name: "Proyectos II",
                degreesId: [degrees[2].id]
            },
            {
                name: "Modelado orgánico",
                degreesId: [degrees[2].id]
            },
            {
                name: "Texturizado y Shading",
                degreesId: [degrees[2].id]
            },
            {
                name: "Diseño y Desarrollo de Entornos y Elementos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Layout 2D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Desarrollo de Proyectos 2D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Desarrollo de Personajes 2D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Layout 3D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Desarrollo de Proyectos 3D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Rigging",
                degreesId: [degrees[2].id]
            },
            {
                name: "Diseño de Videojuegos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Modelado para Videojuegos y Sistemas Inmersivos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Rigging para Videojuegos y Sistemas Inmersivos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Proyectos III",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación 3D de Personajes II",
                degreesId: [degrees[2].id]
            },
            {
                name: "Iluminación y Composición I",
                degreesId: [degrees[2].id]
            },
            {
                name: "Ink & Paint 2D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Character FX",
                degreesId: [degrees[2].id]
            },
            {
                name: "Programación para Escenas 3D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación para Videojuegos y Sistemas Inmersivos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Shading e Iluminación Videojuegos y Sistemas Inmersivos I",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación Avanzada",
                degreesId: [degrees[2].id]
            },
            {
                name: "Composición y Efectos 2D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación 2D de Personajes II",
                degreesId: [degrees[2].id]
            },
            {
                name: "Efectos Visuales 3D",
                degreesId: [degrees[2].id]
            },
            {
                name: "Iluminación y Composición II",
                degreesId: [degrees[2].id]
            },
            {
                name: "Efectos Visuales para Videojuegos y Sistemas Inmersivos",
                degreesId: [degrees[2].id]
            },
            {
                name: "Shading e Iluminación para Videojuegos y Sistemas Inmersivos II",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación Experimental",
                degreesId: [degrees[2].id]
            },
            {
                name: "Matte Painting",
                degreesId: [degrees[2].id]
            },
            {
                name: "Sistemas de Simulación en Tiempo Real",
                degreesId: [degrees[2].id]
            },
            {
                name: "Animación 2D de Personajes I",
                degreesId: [degrees[2].id]
            },
            {
                name: "Proyectos IV",
                degreesId: [degrees[2].id]
            },
            {
                name: "Trabajo de Fin de Grado",
                degreesId: [degrees[2].id]
            },
            {
                name: "Prácticas en Empresa",
                degreesId: [degrees[2].id]
            },
            {
                name: "Formación para el empleo",
                degreesId: [degrees[2].id]
            }
        ]
        
	});

    // Grado de Ingeniería del Software
    await prisma.subject.createMany({
        data: [
            {
                name: "Fundamentos de Desarrollo Web",
                degreesId: [degrees[10].id]
            },
            {
                name: "Introducción a la Programación I",
                degreesId: [degrees[10].id]
            },
            {
                name: "Laboratorios de Redes y Sistemas Operativos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Lógica y Matemática Discreta",
                degreesId: [degrees[10].id]
            },
            {
                name: "Pensamiento Creativo",
                degreesId: [degrees[10].id]
            },
            {
                name: "Álgebra",
                degreesId: [degrees[10].id]
            },
            {
                name: "Arquitectura de Ordenadores",
                degreesId: [degrees[10].id]
            },
            {
                name: "Introducción a la Programación II",
                degreesId: [degrees[10].id]
            },
            {
                name: "Laboratorio de Bases de Datos y Sistemas Distribuidos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Sociedad Digital",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos I: Técnicas y Tecnologías Digitales",
                degreesId: [degrees[10].id]
            },
            {
                name: "Fundamentos de Composición Visual",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación Orientada a Objetos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Redes de Ordenadores",
                degreesId: [degrees[10].id]
            },
            {
                name: "Sistemas Operativos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Probabilidad y Estadística",
                degreesId: [degrees[10].id]
            },
            {
                name: "Cálculo",
                degreesId: [degrees[10].id]
            },
            {
                name: "Análisis y Diseño de Algoritmos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Bases de Datos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Diseño de Software",
                degreesId: [degrees[10].id]
            },
            {
                name: "Negocios y Modelos Digitales",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos II: Tendencias de la Ingeniería del Software",
                degreesId: [degrees[10].id]
            },
            {
                name: "Inteligencia Artificial",
                degreesId: [degrees[10].id]
            },
            {
                name: "Dirección y Gestión de Proyectos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación de Sistemas Distribuidos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación Web I, Cliente",
                degreesId: [degrees[10].id]
            },
            {
                name: "Desarrollo de Aplicaciones Móviles",
                degreesId: [degrees[10].id]
            },
            {
                name: "Fundamentos de UX",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación Web II, Servidor",
                degreesId: [degrees[10].id]
            },
            {
                name: "Introducción a la Seguridad Informática",
                degreesId: [degrees[10].id]
            },
            {
                name: "Análisis Forense",
                degreesId: [degrees[10].id]
            },
            {
                name: "Hacking Ético",
                degreesId: [degrees[10].id]
            },
            {
                name: "Ampliación de Bases de Datos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Búsqueda y Análisis de la Información",
                degreesId: [degrees[10].id]
            },
            {
                name: "Procesamiento de Datos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación de Motores Gráficos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Física e Inteligencia Artificial",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación Gráfica",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos III: Desarrollo Web y Apps",
                degreesId: [degrees[10].id]
            },
            {
                name: "Creación y Dirección de Empresas",
                degreesId: [degrees[10].id]
            },
            {
                name: "Ingeniería del Software",
                degreesId: [degrees[10].id]
            },
            {
                name: "Paradigmas de Programación",
                degreesId: [degrees[10].id]
            },
            {
                name: "Bastionado",
                degreesId: [degrees[10].id]
            },
            {
                name: "Técnicas y Metodologías de Investigación en Ciberseguridad",
                degreesId: [degrees[10].id]
            },
            {
                name: "Análisis de Malware",
                degreesId: [degrees[10].id]
            },
            {
                name: "Desarrollo de Herramientas de Ciberseguridad",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos de Ciberseguridad - Ciberejercicios",
                degreesId: [degrees[10].id]
            },
            {
                name: "Aprendizaje Automático I",
                degreesId: [degrees[10].id]
            },
            {
                name: "Visión por Computador",
                degreesId: [degrees[10].id]
            },
            {
                name: "Aprendizaje Automático II",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos de Ingeniería de Datos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Visualización de Datos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Simulación y Rendering Realista",
                degreesId: [degrees[10].id]
            },
            {
                name: "Sistemas Inmersivos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación Avanzada de Motores Gráficos",
                degreesId: [degrees[10].id]
            },
            {
                name: "Simulación de Efectos Especiales",
                degreesId: [degrees[10].id]
            },
            {
                name: "Proyectos de Programación Gráfica, Sistemas Inmersivos y Simulación",
                degreesId: [degrees[10].id]
            },
            {
                name: "Programación de Bajo Nivel",
                degreesId: [degrees[10].id]
            },
            {
                name: "Verificación de Software",
                degreesId: [degrees[10].id]
            },
            {
                name: "Prácticas en Empresa",
                degreesId: [degrees[10].id]
            },
            {
                name: "Formación para el empleo",
                degreesId: [degrees[10].id]
            },
            {
                name: "Trabajo de Fin de Grado",
                degreesId: [degrees[10].id]
            }
        ]
    });
    
    // Grado de Efectos Visuales
    await prisma.subject.createMany({
        data: [
            {
                name: "Fundamentos de fotografía",
                degreesId: [degrees[3].id]
            },
            {
                name: "Sistemas de representación geométrica",
                degreesId: [degrees[3].id]
            },
            {
                name: "Matemáticas y física para efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Técnicas básicas de creación 3D",
                degreesId: [degrees[3].id]
            },
            {
                name: "Pensamiento creativo",
                degreesId: [degrees[3].id]
            },
            {
                name: "Guión",
                degreesId: [degrees[3].id]
            },
            {
                name: "Proyectos I: cámara fija",
                degreesId: [degrees[3].id]
            },
            {
                name: "Introducción al modelado 3D",
                degreesId: [degrees[3].id]
            },
            {
                name: "Principios de diseño gráfico y motion graphics",
                degreesId: [degrees[3].id]
            },
            {
                name: "Fundamentos de escenografía y efectos especiales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Narrativa audiovisual",
                degreesId: [degrees[3].id]
            },
            {
                name: "Edición y montaje audiovisual",
                degreesId: [degrees[3].id]
            },
            {
                name: "Sociedad digital y desarrollo sostenible",
                degreesId: [degrees[3].id]
            },
            {
                name: "Teoría y ciencia del color y de la luz",
                degreesId: [degrees[3].id]
            },
            {
                name: "Previsualización y dirección de fotografía en 3D",
                degreesId: [degrees[3].id]
            },
            {
                name: "Texturizado y sombreado",
                degreesId: [degrees[3].id]
            },
            {
                name: "Introducción a la programación",
                degreesId: [degrees[3].id]
            },
            {
                name: "Proyectos II: elementos en movimiento",
                degreesId: [degrees[3].id]
            },
            {
                name: "Técnicas básicas de composición",
                degreesId: [degrees[3].id]
            },
            {
                name: "Introducción a la iluminación sintética y el renderizado",
                degreesId: [degrees[3].id]
            },
            {
                name: "Rigging y animación para efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Historia del cine y los efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Composición avanzada",
                degreesId: [degrees[3].id]
            },
            {
                name: "Programación para composición e integración",
                degreesId: [degrees[3].id]
            },
            {
                name: "Programación para simulación y efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Simulación básica de materia",
                degreesId: [degrees[3].id]
            },
            {
                name: "Optimización y simulación de la luz",
                degreesId: [degrees[3].id]
            },
            {
                name: "Matte Painting",
                degreesId: [degrees[3].id]
            },
            {
                name: "Introducción a la inteligencia artificial generativa",
                degreesId: [degrees[3].id]
            },
            {
                name: "Producción audiovisual y de efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Proyectos III: personajes",
                degreesId: [degrees[3].id]
            },
            {
                name: "Simulación y efectos visuales avanzados",
                degreesId: [degrees[3].id]
            },
            {
                name: "Teoría de la imagen y la comunicación audiovisual",
                degreesId: [degrees[3].id]
            },
            {
                name: "Supervisión de efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Animación con captura de movimiento",
                degreesId: [degrees[3].id]
            },
            {
                name: "Creación de entornos sintéticos",
                degreesId: [degrees[3].id]
            },
            {
                name: "Producción audiovisual virtual",
                degreesId: [degrees[3].id]
            },
            {
                name: "Creación 3D procedural",
                degreesId: [degrees[3].id]
            },
            {
                name: "Fundamentos de música y diseño de sonido",
                degreesId: [degrees[3].id]
            },
            {
                name: "Matemáticas aplicadas a la integración",
                degreesId: [degrees[3].id]
            },
            {
                name: "Nuevas tecnologías en efectos visuales",
                degreesId: [degrees[3].id]
            },
            {
                name: "Efectos aplicados a personajes",
                degreesId: [degrees[3].id]
            },
            {
                name: "Técnicas de seguimiento de movimiento",
                degreesId: [degrees[3].id]
            },
            {
                name: "Formación para el empleo",
                degreesId: [degrees[3].id]
            },
            {
                name: "Prácticas en empresa",
                degreesId: [degrees[3].id]
            },
            {
                name: "Proyectos IV: secuencia audiovisual",
                degreesId: [degrees[3].id]
            },
            {
                name: "Trabajo de Fin de Grado",
                degreesId: [degrees[3].id]
            }
        ]
    });

    // Grado de Diseño Digital
    await prisma.subject.createMany({
        data: [
            {
                name: "Dibujo, Análisis e Ideación I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Historia del Arte",
                degreesId: [degrees[4].id]
            },
            {
                name: "Historia del Diseño y la Iconografía",
                degreesId: [degrees[4].id]
            },
            {
                name: "Sistemas de Representación Geométrica",
                degreesId: [degrees[4].id]
            },
            {
                name: "Tratamiento Digital de la Imagen",
                degreesId: [degrees[4].id]
            },
            {
                name: "Composición Gráfica",
                degreesId: [degrees[4].id]
            },
            {
                name: "Dibujo, Análisis e Ideación II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Fundamentos de Estética y Análisis de la Imagen",
                degreesId: [degrees[4].id]
            },
            {
                name: "Teoría del Color y de la Luz",
                degreesId: [degrees[4].id]
            },
            {
                name: "Tipografía y Caligrafía",
                degreesId: [degrees[4].id]
            },
            {
                name: "Pensamiento creativo",
                degreesId: [degrees[4].id]
            },
            {
                name: "Dirección de Arte y Comunicación publicitaria I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Escultura",
                degreesId: [degrees[4].id]
            },
            {
                name: "Fotografía",
                degreesId: [degrees[4].id]
            },
            {
                name: "Ilustración",
                degreesId: [degrees[4].id]
            },
            {
                name: "Infografía y visualización de datos",
                degreesId: [degrees[4].id]
            },
            {
                name: "Narrativa audiovisual",
                degreesId: [degrees[4].id]
            },
            {
                name: "Dirección de Arte y Comunicación publicitaria II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Edición y postproducción digital",
                degreesId: [degrees[4].id]
            },
            {
                name: "Fundamentos de Entornos 3D",
                degreesId: [degrees[4].id]
            },
            {
                name: "Historia del Arte Electrónico y Digital",
                degreesId: [degrees[4].id]
            },
            {
                name: "Motion Graphics I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Negocios y Modelos Digitales",
                degreesId: [degrees[4].id]
            },
            {
                name: "Proyectos I (imagen digital)",
                degreesId: [degrees[4].id]
            },
            {
                name: "Diseño y Usabilidad de Interfaces I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Entornos 3D I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Motion Graphics II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Programación para el Arte y el Diseño",
                degreesId: [degrees[4].id]
            },
            {
                name: "Proyectos II (Desarrollo de imagen de marca)",
                degreesId: [degrees[4].id]
            },
            {
                name: "Entornos 3D II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Maquetación y estructura Web/ APP I",
                degreesId: [degrees[4].id]
            },
            {
                name: "Proyectos III (Creación de un Proyecto de Motion Graphics)",
                degreesId: [degrees[4].id]
            },
            {
                name: "Sistemas Interactivos",
                degreesId: [degrees[4].id]
            },
            {
                name: "Sociedad Digital",
                degreesId: [degrees[4].id]
            },
            {
                name: "Diseño Editorial",
                degreesId: [degrees[4].id]
            },
            {
                name: "Diseño de personajes",
                degreesId: [degrees[4].id]
            },
            {
                name: "Proyectos tecnológicos",
                degreesId: [degrees[4].id]
            },
            {
                name: "Creación y dirección de empresas",
                degreesId: [degrees[4].id]
            },
            {
                name: "Digitalización y materialización",
                degreesId: [degrees[4].id]
            },
            {
                name: "Diseño y Usabilidad de Interfaces II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Formación para el empleo",
                degreesId: [degrees[4].id]
            },
            {
                name: "Prácticas empresas",
                degreesId: [degrees[4].id]
            },
            {
                name: "Proyecto IV (Desarrollo WEB/ APP/ ARTE ELECT)",
                degreesId: [degrees[4].id]
            },
            {
                name: "Trabajo Fin de Grado",
                degreesId: [degrees[4].id]
            },
            {
                name: "Maquetación y estructura Web/ APP II",
                degreesId: [degrees[4].id]
            },
            {
                name: "Marketing en la red",
                degreesId: [degrees[4].id]
            },
            {
                name: "Animación 3D",
                degreesId: [degrees[4].id]
            },
            {
                name: "Diseño de Packaging",
                degreesId: [degrees[4].id]
            },
            {
                name: "Entornos Interactivos para TV",
                degreesId: [degrees[4].id]
            },
            {
                name: "Habilidades de dirección",
                degreesId: [degrees[4].id]
            }
        ]
    });

    // Grado de Diseño de Productos Interactivos
    await prisma.subject.createMany({
        data: [
            {
                name: "Fundamentos de Matemáticas y Física",
                degreesId: [degrees[8].id]
            },
            {
                name: "Introducción al diseño de juegos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Habilidades de Comunicación y Exposición",
                degreesId: [degrees[8].id]
            },
            {
                name: "Teoría del Juego",
                degreesId: [degrees[8].id]
            },
            {
                name: "Tecnología para Diseñadores",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos I",
                degreesId: [degrees[8].id]
            },
            {
                name: "Fundamentos Literarios",
                degreesId: [degrees[8].id]
            },
            {
                name: "Percepción y Expresión Visual",
                degreesId: [degrees[8].id]
            },
            {
                name: "Historia de los Juegos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Introducción a la Programación",
                degreesId: [degrees[8].id]
            },
            {
                name: "Sociedad Digital",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos II",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Videojuegos I",
                degreesId: [degrees[8].id]
            },
            {
                name: "Narrativa y Storytelling Visual",
                degreesId: [degrees[8].id]
            },
            {
                name: "Psicología del Juego",
                degreesId: [degrees[8].id]
            },
            {
                name: "Scripting I",
                degreesId: [degrees[8].id]
            },
            {
                name: "Elementos de Composición Visual",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos III",
                degreesId: [degrees[8].id]
            },
            {
                name: "Dirección de Arte",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño Gráfico, Interfaz y Experiencia de Usuario",
                degreesId: [degrees[8].id]
            },
            {
                name: "Scripting II",
                degreesId: [degrees[8].id]
            },
            {
                name: "Historia y Tradición Artística",
                degreesId: [degrees[8].id]
            },
            {
                name: "Fundamentos de Experiencia de Usuario",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos IV",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Videojuegos II",
                degreesId: [degrees[8].id]
            },
            {
                name: "Creación de Contenidos 3D",
                degreesId: [degrees[8].id]
            },
            {
                name: "Animación en Videojuegos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Scripting III",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos V",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño Avanzado de Niveles",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Música y Sonido",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Videojuegos III",
                degreesId: [degrees[8].id]
            },
            {
                name: "Comunicación Audiovisual",
                degreesId: [degrees[8].id]
            },
            {
                name: "Usabilidad y Testeo",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos VI",
                degreesId: [degrees[8].id]
            },
            {
                name: "Ampliación al Diseño Interactivo",
                degreesId: [degrees[8].id]
            },
            {
                name: "Dirección y Gestión de Proyectos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Producción de Videojuegos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Propiedad Intelectual",
                degreesId: [degrees[8].id]
            },
            {
                name: "Pensamiento Creativo",
                degreesId: [degrees[8].id]
            },
            {
                name: "Creación y Desarrollo de Empresas",
                degreesId: [degrees[8].id]
            },
            {
                name: "Trabajo Fin de Grado",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos VII",
                degreesId: [degrees[8].id]
            },
            {
                name: "Trabajo Fin de Grado",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño Web y Aplicaciones",
                degreesId: [degrees[8].id]
            },
            {
                name: "Proyectos VIII",
                degreesId: [degrees[8].id]
            },
            {
                name: "Reconocimiento Académico de Créditos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Juegos Casuales",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Juegos Serios",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño de Juegos Sociales y Multijugador",
                degreesId: [degrees[8].id]
            },
            {
                name: "Programación Avanzada",
                degreesId: [degrees[8].id]
            },
            {
                name: "Inteligencia Artificial para videojuegos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Diseño para RA y RV",
                degreesId: [degrees[8].id]
            },
            {
                name: "Introducción a Unreal Engine",
                degreesId: [degrees[8].id]
            },
            {
                name: "World Building",
                degreesId: [degrees[8].id]
            },
            {
                name: "Sistemas Avanzados de World Building",
                degreesId: [degrees[8].id]
            },
            {
                name: "Herramientas de Prototipado I",
                degreesId: [degrees[8].id]
            },
            {
                name: "Gameplay Ability System",
                degreesId: [degrees[8].id]
            },
            {
                name: "Interacción con Blueprints",
                degreesId: [degrees[8].id]
            },
            {
                name: "Blueprints Avanzados",
                degreesId: [degrees[8].id]
            },
            {
                name: "Fundamentos de las Interfaces de Usuario",
                degreesId: [degrees[8].id]
            },
            {
                name: "Herramientas de Prototipado II",
                degreesId: [degrees[8].id]
            },
            {
                name: "Replicación y arquitectura Multijugador",
                degreesId: [degrees[8].id]
            },
            {
                name: "Interfaces de Usuario Avanzadas",
                degreesId: [degrees[8].id]
            },
            {
                name: "Sistemas de Inteligencia Artificial Avanzados",
                degreesId: [degrees[8].id]
            },
            {
                name: "Herramientas de Prototipado III",
                degreesId: [degrees[8].id]
            },
            {
                name: "Sistemas Narrativos",
                degreesId: [degrees[8].id]
            },
            {
                name: "Rendimiento y Depurado",
                degreesId: [degrees[8].id]
            }
        ]
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
