import { useState, useEffect } from "react";

const HomePageAnimation = () => {
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
          className="absolute bg-[#858585]"
          style={{
            transition: "transform 3s ease-out",
            transform: loaded ? "translateX(-100%)" : "translateX(0)",
          }}
          onTransitionEnd={handleAnimationEnd}
        >
          {/* Contenido del elemento */}
          <div className="flex items-center justify-center w-screen h-screen">
            <img src="/logo-projects.png" alt="Project Logo" />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePageAnimation;
