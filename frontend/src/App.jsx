import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AreasProvider } from "./context/AreasContext";

import NavBar from "./components/Navbar";

import HomePageLogin from "./pages/HomePageLogin";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProfilePage from "./pages/ProfilePage";
import ProjectFormPage from "./pages/ProjectFormPage";

import ProtectedRoute from "./ProtectedRoute";
import HomePageRegister from "./pages/HomePageRegister";
import HomePageRegisterSecond from "./pages/HomePageRegisterSecond";

import HomePageBar from "./components/HomePageBar";
import HomePageLanding from "./components/HomePageLanding";

function App() {
  return (
    <AuthProvider>
      {/* Una vez acabado el testing areas provider debe moverse dentro del protectedroute */}
      <AreasProvider>
        <Router>
          <main>
            <Routes>
              {/* Home page sin logearse, sale el formulario de login */}
              <Route path="/" element={<HomePageLogin />} />
              {/* Pagina de registro, solo pide dos datos inciales */}
              <Route path="/register" element={<HomePageRegister />} />
              {/* Pagina de registro secundaria, termina el registro */}
              <Route
                path="/register/details"
                element={<HomePageRegisterSecond />}
              />
              {/* Dejo la pagina de añadir proyectos fuera de la ruta protegida para poder probarla */}
              <Route path="/projects/new" element={<ProjectFormPage />} />
              <ProtectedRoute>
                {/* Barra de navegacion, estará en todas con lo cual lo dejamos fuera */}
                <NavBar />
                {/* Pagina home pero que salen proyectos y noticias una vez estas logeado */}
                <Route path="/home" element={<LoginPage />} />
                {/* Pagina perfil donde se veran las peticiones */}
                <Route path="/profile" element={<ProfilePage />} />
                {/* Pagina de proyectos para buscarlos */}
                <Route path="/projects" element={<ProjectsHome />} />
                {/* Pagina para el formulario de proyectos nuevos */}
                <Route path="/projects/new" element={<ProjectFormPage />} />
                {/* Pagina para ver un proyecto en detalle */}
                <Route path="/projects/:id" element={<ProjectDetail />} />
                {/* Pagina para editar un proyecto, es el mismo formulario pero populating */}
                <Route
                  path="/projects/:id/edit"
                  element={<ProjectFormPage />}
                />
                {/* Posible admin dashboard, puede que OoS (MOsCoW) */}
                <Route path="/admin" element={<AreasHome />} />
              </ProtectedRoute>
            </Routes>
          </main>
        </Router>
      </AreasProvider>
    </AuthProvider>
  );
}

export default App;
