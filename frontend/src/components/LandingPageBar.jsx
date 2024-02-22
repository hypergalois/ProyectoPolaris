const LandingPageBar = () => {
	return (
		<nav className="flex justify-between items-center p-8">
			<div className="flex items-center">
				<img src="/logo-projects.png" alt="Logo Izquierda" className="h-16 w-auto" />
			</div>
			<div className="flex items-center">
				<img src="full-logo-utad.png" alt="Logo Derecha" className="h-16 w-auto" />
			</div>
		</nav>
	);
};

export default LandingPageBar;
