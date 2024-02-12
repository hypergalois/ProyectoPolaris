import projectLogo from "../../public/logo-projects.png";
import utadLogo from "../../public/full-logo-utad.webp";

const HomePageBar = () => {
  return (
    <nav className="flex justify-between items-center p-8">
      <div className="flex items-center">
        <img src={projectLogo} alt="Logo Izquierda" className="h-16 w-auto" />
      </div>
      <div className="flex items-center">
        <img src={utadLogo} alt="Logo Derecha" className="h-16 w-auto" />
      </div>
    </nav>
  );
};

export default HomePageBar;
