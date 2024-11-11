## Pasos para compilar la aplicación en paquete SCORM:

Este documento explica los pasos necesarios para compilar y generar un paquete SCORM listo para subir a SCORM Cloud u otra plataforma compatible.

### Requisitos previos

Asegúrate de tener instalado **Node.js** y **npm** (Node Package Manager). Si no los tienes instalados, puedes descargarlos desde [aquí](https://nodejs.org/).

### Pasos para generar el paquete SCORM

1. Instalar dependencias:

Antes de compilar, asegúrate de que todas las dependencias estén instaladas. Para ello, ejecuta el siguiente comando en la raíz del proyecto:

```
npm install
```

2. Compilar la aplicación:

Una vez que las dependencias estén instaladas, compila la aplicación con el siguiente comando:

```
npm run build
```

Este comando generará los archivos necesarios para el paquete SCORM en la carpeta build.

3. Generar el paquete SCORM:

Luego, comprime el contenido de la carpeta `build` en un archivo `.zip`. Asegúrate de incluir todos los archivos dentro de la carpeta, sin incluir la carpeta misma.

4. Subir el archivo zip a SCORM Cloud:

El archivo .zip que has creado es ahora el paquete SCORM. Puedes subirlo a SCORM Cloud o cualquier plataforma compatible con SCORM para verificar su funcionamiento.
