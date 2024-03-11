const LandingPageBar = () => {
	return (
		<nav className="flex justify-between items-center p-8">
			<div className="flex items-center">
				{/* <img src="/logo-projects.png" alt="Logo Izquierda" className="h-16 w-auto" /> */}
				<h1 className="text-3xl font-[950] text-blue-600">U-PROJECTS</h1>
			</div>
			<div className="flex items-center">
				<img src="/full-logo-utad.webp" alt="Logo Derecha" className="h-16 w-auto" />
			</div>
		</nav>
	);
};

export default LandingPageBar;
