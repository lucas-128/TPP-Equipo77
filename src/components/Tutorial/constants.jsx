import React from "react";

export const INTRODUCTION = 0;
export const SIMULATOR = 1;
export const TEXT_EDITOR = 2;
export const INSTRUCTION_BUTTONS = 3;
export const EXECUTION_MODE = 4;
export const TUTORIAL = 5;

// 1. Intro
// 2. Simulador
// 3. Editor de texto
// 4. Botones de instrucciones
// 5. Modo de ejecución

const introTutorial = (
  <>
    <div>
      Hola, gracias por utilizar nuestro simulador de una máquina RISC ideal.
    </div>
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
      Con este tutorial vas a aprender a utilizar la aplicación de manera
      sencilla y rápida.
    </p>
  </>
);

// TODO: cambiar este texto
const simulatorTutorial = (
  <>
    <p>
      En esta sección vas a poder visualizar el estado de la computadora en
      tiempo real.
    </p>
    <p>
      En la parte superior de la pantalla vas a encontrar el contador de
      programa, el registro de instrucción y el estado de los registros de la
      computadora.
    </p>
    <p>
      En la parte inferior de la pantalla vas a encontrar los botones de
      control, que te permitirán ejecutar el programa paso a paso o de manera
      automática.
    </p>
  </>
);

// TODO: cambiar este texto
const textEditorTutorial = (
  <>
    <p>En esta sección vas a poder visualizar el editor de texto.</p>
    <p>
      En la parte superior de la pantalla vas a encontrar botones con diferentes
      funcionalidades: subir un programa, limpiar el editor, descargar el
      programa, y un atajo a la lista de instrucciones que interpreta el simulador.
    </p>
    <p>
      En la parte inferior de la pantalla vas a encontrar los botones de
      control, que te permitirán ejecutar el programa paso a paso, 
    </p>
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

  //TODO: terminar
  // [INSTRUCTION_BUTTONS]: {
  //   title: "Botones de instrucciones",
  //   content:
  //     "En esta sección vas a poder visualizar los botones de instrucciones. \
  //     En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
  //     En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
  //     Para continuar, hacé clic en el botón de abajo.",
  //     arrow: "left",
  // },
  // [EXECUTION_MODE]: {
  //   title: "Modo de ejecución",
  //   content:
  //     "En esta sección vas a poder visualizar el modo de ejecución. \
  //     En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
  //     En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
  //     Para continuar, hacé clic en el botón de abajo.",
  //     arrow: "left",
  // },
  // [TUTORIAL]: {
  //   title: "Tutorial",
  //   content:
  //     "En esta sección vas a poder visualizar el tutorial. \
  //     En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
  //     En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
  //     Para continuar, hacé clic en el botón de abajo.",
  //     arrow: "left",
  // },
};
