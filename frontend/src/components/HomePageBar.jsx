// import projectLogo from "../../public/logo-projects.png";
// import utadLogo from "../../public/full-logo-utad.webp";

// TODO: PONER TODOS LOS PATHS COMO CONSTANTES EN UN ARCHIVO DE CONFIGURACIÓN

const HomePageBar = () => {
  return (
    <nav className="flex justify-between items-center p-8">
      <div className="flex items-center">
        <img
          src="/logo-projects.png"
          alt="Logo Izquierda"
          className="h-16 w-auto"
        />
      </div>
      <div className="flex items-center">
        <img
          src="full-logo-utad.webp"
          alt="Logo Derecha"
          className="h-16 w-auto"
        />
      </div>
    </nav>
  );
};

export default HomePageBar;
