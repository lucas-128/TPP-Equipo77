export const INTRODUCTION = 0;
export const SIMULATOR = 1;
export const COMPONENTS = 2;
export const TEXT_EDITOR = 3;
export const INSTRUCTION_BUTTONS = 4;
export const EXECUTION_MODE = 5;
export const TUTORIAL = 6;


// 1. Intro
// 2. Simulador
// 3. Componentes
// 4. Editor de texto
// 5. Botones de instrucciones
// 6. Modo de ejecución


export const introTutorial =
  "Hola, gracias por utilizar nuestro simulador de una máquina RISC ideal.\
 Este simulador te permitirá aprender y experimentar con los principios básicos de una arquitectura de computadora RISC \
 (Reduced Instruction Set Computer). Vas a poder ejecutar programas, visualizar el comportamiento de los diferentes componentes de la computadora y observar \
 cómo las instrucciones se procesan en tiempo real. Con este tutorial vas a aprender a utilizar la aplicación de manera sencilla y rápida. \
 Para continuar, hacé clic en el botón de abajo.";

export const tutorialTexts = {
  [INTRODUCTION]: {
    title: "Introducción",
    content: introTutorial,
  },
  [SIMULATOR]: {
    title: "Simulador",
    content:
      "En esta sección vas a poder visualizar el estado de la computadora en tiempo real. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
  [COMPONENTS]: {
    title: "Componentes",
    content:
      "En esta sección vas a poder visualizar los componentes de la computadora. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
  [TEXT_EDITOR]: {
    title: "Editor de texto",
    content:
      "En esta sección vas a poder visualizar el editor de texto. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
  [INSTRUCTION_BUTTONS]: {
    title: "Botones de instrucciones",
    content:
      "En esta sección vas a poder visualizar los botones de instrucciones. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
  [EXECUTION_MODE]: {
    title: "Modo de ejecución",
    content:
      "En esta sección vas a poder visualizar el modo de ejecución. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
  [TUTORIAL]: {
    title: "Tutorial",
    content:
      "En esta sección vas a poder visualizar el tutorial. \
      En la parte superior de la pantalla vas a encontrar el contador de programa, el registro de instrucción y el estado de los registros de la computadora. \
      En la parte inferior de la pantalla vas a encontrar los botones de control, que te permitirán ejecutar el programa paso a paso o de manera automática. \
      Para continuar, hacé clic en el botón de abajo.",
  },
};