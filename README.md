# Simulador de Arquitectura RISC Máquina Ideal

Este simulador web te permite explorar y experimentar con los principios fundamentales de una arquitectura de computadora RISC (Reduced Instruction Set Computer). Podrás ejecutar programas, observar el funcionamiento de los distintos componentes de la computadora y ver en tiempo real cómo se procesan las instrucciones.

![Descripción del simulador](public/readme/simulador.gif)

Trabajo Profesional de Ingeniería en Informática - 2024  
Integrantes:

- Balmaceda, Fernando
- Bocaccio, Agustina
- Grati, Lucas
- Pinto, Nicolás

Tutor: Prof. Arturo Carlos Servetto

## Simulador de la Computadora

La interfaz principal del simulador te muestra cómo se ejecutan las instrucciones de un programa, cómo interactúan los componentes de la máquina y cómo fluye la información a través de los buses. Además, puedes hacer clic en algunos componentes para obtener más detalles sobre su funcionamiento. Esto te permitirá comprender a profundidad el comportamiento interno de la máquina.

## Editor de Programas

El editor de texto es donde puedes cargar o crear programas que serán interpretados por el simulador.

En la barra superior, encontrarás herramientas para:

- Subir un programa desde tu computadora.
- Limpiar el editor y comenzar desde cero.
- Descargar el programa actual.
- Acceder a un atajo con la lista de instrucciones soportadas por el simulador.

En la parte inferior, están los controles para gestionar la simulación:

- Iniciar simulación.
- Ejecutar paso a paso.
- Avanzar o retroceder al inicio o final de la ejecución.
- Detener la simulación.

Para comenzar, simplemente carga un programa en el editor y haz clic en "Simular". Si deseas finalizar la simulación o cargar un nuevo programa, utiliza el botón "Editar".

## Configuración de la Simulación

En el panel de opciones, puedes personalizar cómo se ejecutará el programa:

- Seleccionar la base numérica para los datos: **binaria** o **hexadecimal**.

Elegir el modo de ejecución:

- Sin ciclos de ejecución.
- Con ciclos de ejecución.
- Con ciclos utilizando pipelining.

## Instrucciones Soportadas

Las instrucciones que se pueden utilizar en el simulador son las siguientes:

| Código | Operandos | Descripción                                                                                    |
| ------ | --------- | ---------------------------------------------------------------------------------------------- |
| 1      | RXY       | Cargar en el registro R el contenido de la celda con dirección XY                              |
|        |
| 2      | RXY       | Cargar en el registro R el patrón XY                                                           |
|        |
| 3      | RXY       | Almacenar el contenido del registro R en la celda con dirección XY                             |
|        |
| 4      | 0RS       | Copiar el contenido del registro R en el registro S                                            |
|        |
| 5      | RST       | Sumar en complemento a 2 los contenidos de los registros S y T y dejar el resultado en R       |
|        |
| 6      | RST       | Sumar en punto flotante los contenidos de los registros S y T y dejar el resultado en R        |
|        |
| 7      | RST       | Disyunción (OR) de los contenidos de los registros S y T con resultado en registro R           |
|        |
| 8      | RST       | Conjunción (AND) de los contenidos de los registros S y T con resultado en registro R          |
|        |
| 9      | RST       | Disyunción exc. (XOR) de los contenidos de los registros S y T con resultado en registro R     |
|        |
| A      | R0X       | Rotar a derecha el contenido del registro R, X veces                                           |
|        |
| B      | RXY       | Saltar a la instrucción con dirección XY si el contenido del registro R es igual al del reg. 0 |
|        |
| C      | 000       | Parar la ejecución.                                                                            |
