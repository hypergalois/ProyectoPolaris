import check from "../../public/check.jpg";

const HomePageLanding = () => {
  return (
    <div className="p-10">
      <h1 className="text-6xl font-bold text-center mb-8">Bienvenido, descubre disfruta.</h1>
      <div className="flex">
        <div className="w-1/2">
          <img src={check} alt="Descripción de la imagen" className="w-16" />
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-2">Tu título aquí</h2>
          <p>Tu texto aquí. Este es el texto que acompaña a la imagen y describe su contenido o el mensaje que quieres comunicar a los usuarios. Puedes agregar más detalles y formatear este texto como desees.</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <img src={check} alt="Descripción de la imagen" className="w-16" />
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-2">Tu título aquí</h2>
          <p>Tu texto aquí. Este es el texto que acompaña a la imagen y describe su contenido o el mensaje que quieres comunicar a los usuarios. Puedes agregar más detalles y formatear este texto como desees.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageLanding;
