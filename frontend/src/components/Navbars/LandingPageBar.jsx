import { motion } from "framer-motion";

const LandingPageBar = () => {
	return (
		<nav className="flex flex-col md:flex-row justify-between items-center px-8">
			<div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
				<motion.h1
					className="text-3xl font-[950] text-blue-600 cursor-pointer"
					whileHover={{
						scale: 1.1,
						rotate: 5,
						textShadow: "0px 0px 8px rgb(0, 187, 255)",
						transition: { duration: 0.3 },
					}}
					whileTap={{ scale: 0.9 }}
				>
					U-PROJECTS
				</motion.h1>
			</div>
			<div className="flex items-center">
				<motion.img
					src="/full-logo-utad-by.png"
					alt="Logo Derecha"
					className="h-16 w-auto cursor-pointer"
					whileHover={{
						scale: 1.1,
						rotate: 5,
						transition: { duration: 0.3 },
					}}
					whileTap={{
						scale: 0.9,
					}}
				/>
			</div>
		</nav>
	);
};

export default LandingPageBar;
