import React from "react";

export const INTRODUCTION = 0;
export const SIMULATOR = 1;
export const TEXT_EDITOR = 2;
export const EXECUTION_OPTIONS = 3;
export const END = 4;

const introTutorial = (
  <>
    <div>Hola, gracias por utilizar nuestra aplicación.</div>
    <p>
      Este simulador te permitirá aprender y experimentar con los principios
      básicos de una arquitectura de computadora RISC (Reduced Instruction Set
      Computer)
    </p>
    <p>
      Vas a poder ejecutar programas, visualizar el comportamiento de los
      diferentes componentes de la computadora y observar cómo las instrucciones
      se procesan en tiempo real. Con este tutorial vas a aprender a utilizar la
      aplicación de manera sencilla y rápida.
    </p>
    <p>
      Con este tutorial vas a aprender a utilizar el simulador de manera
      sencilla y rápida.
    </p>
  </>
);

const simulatorTutorial = (
  <>
    <p>
      Esta sección es el simulador de la computadora, donde vas a poder ver cómo
      se ejecutan las instrucciones de un programa y cómo interactúan los
      diferentes componentes de la máquina, y el flujo de datos a través de los
      buses.
    </p>
    <p>
      Durante la simulación, vas a poder hacerle click a algunos de los
      componentes de la computadora para visualizar más información sobre ellos.
    </p>
  </>
);

const textEditorTutorial = (
  <>
    <p>
      En esta sección vas a poder visualizar el editor de texto, donde se pueden
      cargar o crear programas para que sean interpretados por el simulador.
    </p>
    <p>
      En la parte superior de la pantalla vas a encontrar botones para subir un
      programa, limpiar el editor, descargar el programa del editor, y abrir un
      atajo a la lista de instrucciones que interpreta el simulador.
    </p>
    <p>
      Abajo están los botones de control para empezar la simulación, ejecutar
      paso a paso, avanzar o retroceder al inicio o fin, y detener la ejecución.
    </p>
    <p>
      Para comenzar a correr la simulación, cargá un programa en el editor de
      texto y hacé click en el botón de 'Simular'. Para terminar la simulación o
      cambiar el programa hacé click en el botón de 'Editar'.
    </p>
  </>
);

const simulationOptionsTutorial = (
  <>
    <p>En esta sección se encuentran distintas opciones para la simulación.</p>
    <p>
      Por un lado, está la opción de seleccionar la base numérica en la que se
      van a mostrar los valores de los datos de la simulación: binaria o
      hexadecimal.
    </p>
    <p>
      Por otro lado, se va a poder elegir el modo de ejecución del programa: sin
      ciclos de ejecución, con ciclos de ejecución o con ciclos utilizando
      pipelining.
    </p>
  </>
);

const endTutorial = (
  <>
    <p>¡Eso es todo! Ya podés empezar a simular.</p>
    <p>
      Para volver a reproducir este tutorial, siempre va a estar disponible el
      botón de Ayuda en la parte inferior derecha de la pantalla
    </p>
    <p>¡Disfrutá de la experiencia!</p>
  </>
);

export const tutorialTexts = {
  [INTRODUCTION]: {
    title: "Introducción",
    content: introTutorial,
    arrow: "none",
    position: { top: "30%", left: "30%" },
  },
  [SIMULATOR]: {
    title: "Simulador",
    content: simulatorTutorial,
    arrow: "right",
    position: { top: "20%", left: 0, maxWidth: "300px" },
    highlight: "simulatorContainer",
  },
  [TEXT_EDITOR]: {
    title: "Editor de texto",
    content: textEditorTutorial,
    arrow: "left",
    position: { top: "20%", left: "16%", maxWidth: "400px" },
    highlight: "editorContainer",
  },
  [EXECUTION_OPTIONS]: {
    title: "Opciones de simulación",
    content: simulationOptionsTutorial,
    arrow: "top",
    position: { top: "5%", left: "80%", maxWidth: "300px" },
    highlight: "headerContainer",
  },
  [END]: {
    title: "Fin del tutorial",
    content: endTutorial,
    arrow: "none",
    position: { top: "35%", left: "35%" },
  },
};
