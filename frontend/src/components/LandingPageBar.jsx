const LandingPageBar = () => {
	return (
		<nav className="flex flex-col md:flex-row justify-between items-center p-8">
			<div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
				<h1 className="text-3xl font-[950] text-blue-600">U-PROJECTS</h1>
			</div>
			<div className="flex items-center">
				<img src="/full-logo-utad-by.png" alt="Logo Derecha" className="h-16 w-auto" />
			</div>
		</nav>
	);
};

export default LandingPageBar;
