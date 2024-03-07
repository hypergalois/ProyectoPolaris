import { useState, useEffect } from "react";

const LandingPageAnimation = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleAnimationEnd = () => {
		// Oculta el elemento después de la animación
		setIsVisible(false);
	};

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setLoaded(true);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			{isVisible && (
				<div
					className="absolute"
					style={{
						transition: "transform 3s ease-out, opacity 2s ease-in, scale 2s ease-in-out",
						transform: loaded ? "translateY(-100%) scale(1)" : "translateY(80%) translateX(-20%) scale(0.5)",
						opacity: loaded ? 1 : 0,
					}}
					onTransitionEnd={handleAnimationEnd}
				>
					{/* Contenido del elemento */}
					<div className="flex items-center justify-center w-screen h-screen">
						<img src="/logo-projects.png" alt="Project Logo" style={{ maxWidth: "100%", height: "auto" }} />
					</div>
				</div>
			)}
		</>
	);
};

export default LandingPageAnimation;
