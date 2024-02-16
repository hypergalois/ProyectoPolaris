import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import projectLogo from "../../public/logo-projects.png";

const HomePageAnimation = () => {
  const [showTransition, setShowTransition] = useState(true);

  return (
    
    <CSSTransition
      in={showTransition}
      timeout={500}
      classNames={{
        enter: "transition-transform ease-in-out duration-500 transform translate-x-full",
        enterActive: "transform translate-x-0",
        exit: "transform translate-x-0",
        exitActive: "transition-transform ease-in-out duration-500 transform -translate-x-full",
      }}
      unmountOnExit
      onExited={setShowTransition(false)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white z-1000">
        <div className='flex items-center justify-center'>
          <img src={projectLogo} className="h-auto w-auto" />
        </div>
      </div>
    </CSSTransition>
  );
};

export default HomePageAnimation;


