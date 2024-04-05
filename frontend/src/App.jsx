import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AreasProvider } from "./context/AreasContext";
import { RequestsProvider } from "./context/RequestsContext";

import LandingPageLogin from "./pages/LandingPageLogin";
import LandingPageRegister from "./pages/LandingPageRegister";
import HomePageRegisterDetails from "./pages/LandingPageRegisterDetails";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import HomePage from "./pages/HomePage";

import DashboardPage from "./pages/DashboardPage";
import ProjectsFormPage from "./pages/ProjectsFormPage";
import ProjectsHomePage from "./pages/ProjectsHomePage";
import ProjectsDetailPage from "./pages/ProjectsDetailPage";

import VerifyEmailPage from "./pages/VerifyEmailPage";

import SettingsPage from "./pages/SettingsPage";

import NotFoundPage from "./pages/NotFoundPage";

import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import { ProjectsProvider } from "./context/ProjectsContext";

function App() {
	return (
		<AuthProvider>
			{/* Una vez acabado el testing areas provider debe moverse dentro del protectedroute */}
			<AreasProvider>
				<ProjectsProvider>
					<RequestsProvider>
						<Router>
							{/* Es para tener en cuenta la navbar y que todo aparezca más abajo ya que al ser absolute no cuenta */}
							<main className="pt-24 h-full">
								{/* Seria cutre pero se puede mostrar navbarnoauth o navbarauth dependiendo del estado */}
								<Routes>
									{/* Home page sin logearse, sale el formulario de login */}
									<Route path="/" element={<LandingPageLogin />} />
									{/* Pagina de recuperar contraseña */}
									<Route path="/forgot-password" element={<ForgotPasswordPage />} />
									{/* Pagina de resetear contraseña */}
									<Route path="/reset-password" element={<ResetPasswordPage />} />
									{/* Pagina de registro, solo pide dos datos inciales */}
									<Route path="/register" element={<LandingPageRegister />} />
									{/* Pagina de registro secundaria, termina el registro */}
									<Route path="/register/details" element={<HomePageRegisterDetails />} />
									{/* Dejo la pagina de añadir proyectos fuera de la ruta protegida para poder probarla */}
									{/* <Route path="/projects/new" element={<ProjectsFormPage />} /> */}
									<Route element={<ProtectedRoute />}>
										{/* Meto un div aqui para meter el padding que no puede ir en el main porque las paginas de pc no tienen navbar */}
										{/* Pagina 404, va dentro del protected para que se muestre la navbar y porque fuera si no estas logeado te devuelve a home automaticamente */}
										<Route path="*" element={<NotFoundPage />} />
										{/* Pagina de verificacion de email */}
										<Route path="/verify-email" element={<VerifyEmailPage />} />
										{/* Pagina home pero que salen proyectos y noticias una vez estas logeado */}
										{/* <Route path="/home" element={<HomePage />} /> */}
										<Route path="/home/:area?" Component={HomePage} />
										{/* Pagina dashboard donde se veran las peticiones */}
										<Route path="/dashboard" element={<DashboardPage />} />
										{/* Pagina de proyectos para buscarlos */}
										<Route path="/projects" element={<ProjectsHomePage />} />
										{/* Pagina para el formulario de proyectos nuevos */}
										<Route path="/projects/new" element={<ProjectsFormPage />} />
										{/* Pagina para ver un proyecto en detalle */}
										<Route path="/projects/:id" element={<ProjectsDetailPage />} />
										{/* Pagina para editar un proyecto, es el mismo formulario pero populating */}
										<Route path="/projects/:id/edit" element={<ProjectsFormPage />} />
										{/* Pagina de ajustes, puede ser solo para admin */}
										<Route path="/settings" element={<SettingsPage />} />
										{/* Pagina de ajustes, puede ser solo para admin */}
										<Route path="/profile" element={<ProfilePage />} />
									</Route>
								</Routes>
							</main>
						</Router>
					</RequestsProvider>
				</ProjectsProvider>
			</AreasProvider>
		</AuthProvider>
	);
}

export default App;
