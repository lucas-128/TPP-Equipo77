import React, { useState, useEffect } from "react";
import { LoadingContainer, Icon, Title, Subtitle } from "./styled";

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  //Quitar si no se va a usar el boton
  //const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem("appLoaded");
    if (!hasLoadedBefore) {
      setIsVisible(true);
      localStorage.setItem("appLoaded", "true");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  //Quitar si no se va a usar el boton
  /*const handleStartClick = () => {
    setFadeOut(true);
    setTimeout(() => setIsVisible(false), 750);
  };*/

  return (
    <LoadingContainer>
      {" "}
      {/* Agregar al loading container para probar boton -> className={fadeOut ? "fade-out" : ""}*/}
      <Icon src="/favicon.png" alt="Cargando..." />
      <Title>Intérprete Máquina Ideal RISC</Title>
      <Subtitle>
        Una mirada interactiva a la arquitectura de una computadora en
        funcionamiento
      </Subtitle>
      {/*<StartButton onClick={handleStartClick}>Comenzar</StartButton>*/}
    </LoadingContainer>
  );
};
