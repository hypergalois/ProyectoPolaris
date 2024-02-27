const HomePageLanding = () => {
	return (
		<div className="p-10">
			<h1 className="text-6xl text-[#858585] font-bold mb-8">¡Bienvenido!</h1>
			<div className="flex">
				<div className="w-2/12">
					<img src="/check.png" alt="Descripción de la imagen" className="w-16" />
				</div>
				<div className="w-10/12 pl-4">
					<h2 className="text-xl font-semibold mb-2">Explora los proyectos de alumnos y alumni de todos los grados de U-tad.</h2>
					<p>
						Podrás acceder a un repositorio de proyectos realizados por los alumnos de U-tad, filtrar el contenido en base a tus necesidades y conocer el trabajo realizado en otros grados.
					</p>
				</div>
			</div>
			<br />
			<div className="flex">
				<div className="w-2/12">
					<img src="/check.png" alt="Descripción de la imagen" className="w-16" />
				</div>
				<div className="w-10/12 pl-4">
					<h2 className="text-xl font-semibold mb-2">Sube y comparte tus propios proyectos con la comunidad de U-tad.</h2>
					<p>
						Vas a tener la oportunidad de subir tus propios proyectos para que los alumnos de U-tad puedan disfrutarlos, además tendrás la opción de que tus proyectos se presenten a
						concursos.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomePageLanding;
