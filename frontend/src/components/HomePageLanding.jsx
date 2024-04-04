import { CursorArrowRippleIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const HomePageLanding = () => {
	return (
		<div className="p-4 md:p-10">
			<div className="text-center">
				<h1 className="text-5xl md:text-8xl font-bold mb-8 text-blue-600">¡Bienvenido!</h1>
			</div>

			<div className="flex flex-col md:flex-row">
				<div className="md:w-2/12 flex justify-center md:justify-start mb-4 md:mb-0">
					<CursorArrowRippleIcon className="w-16 md:w-12 text-blue-600" />
				</div>
				<div className="md:w-10/12">
					<h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">Explora los proyectos de alumnos y alumni de todos los grados de U-tad.</h2>
					<p className="text-blue-600">Podrás acceder a un repositorio de proyectos realizados por los alumnos de U-tad, filtrar el contenido en base a tus necesidades y conocer el trabajo realizado en otros grados.</p>
				</div>
			</div>
			<br />
			<div className="flex flex-col md:flex-row">
				<div className="md:w-2/12 flex justify-center md:justify-start mb-4 md:mb-0">
					<ComputerDesktopIcon className="w-16 md:w-12 text-blue-600" />
				</div>
				<div className="md:w-10/12">
					<h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">Sube y comparte tus propios proyectos con la comunidad de U-tad.</h2>
					<p className="text-blue-600">Vas a tener la oportunidad de subir tus propios proyectos para que los alumnos de U-tad puedan disfrutarlos, además tendrás la opción de que tus proyectos se presenten a concursos.</p>
				</div>
			</div>
		</div>
	);
};

export default HomePageLanding;
