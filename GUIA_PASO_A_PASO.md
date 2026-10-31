# Guía para principiantes — Práctica 7 de Docker y MySQL

**Esta guía contiene todo el proceso para referencia. Durante nuestra conversación avanzaremos una sola instrucción a la vez y esperaremos tu confirmación `Listo` o una captura.**

## Paso 1 — Descargar y extraer

Guarda `Practica-7-Docker-MySQL.zip`. En Windows, haz clic derecho sobre el ZIP y selecciona **Extraer todo...**. El resultado debe ser la carpeta `Practica-7-Docker-MySQL` con `src`, `Dockerfile` y `docker-compose.yml` dentro.

## Paso 2 — Abrir la carpeta en VS Code

Abre **Visual Studio Code**. Ve a **File > Open Folder...** (Archivo > Abrir carpeta...). Selecciona la carpeta extraída `Practica-7-Docker-MySQL` y confirma. Si VS Code pregunta si confías en los autores, acepta solo porque es tu proyecto y conoces su origen.

## Paso 3 — Abrir Docker Desktop

Abre **Docker Desktop** en Windows y comprueba que el motor está ejecutándose. No necesitas instalar MySQL ni Node.js fuera de Docker.

## Paso 4 — Abrir la terminal correcta

En VS Code, selecciona **Terminal > New Terminal**. Debe abrirse dentro de la carpeta `Practica-7-Docker-MySQL` (donde está `docker-compose.yml`).

## Paso 5 — Levantar la aplicación y la base de datos

Copia y ejecuta en la terminal:

```powershell
docker compose up -d --build
```

Este comando descarga la imagen de MySQL, construye la imagen Node.js y crea/inicia ambos contenedores. La primera vez necesita Internet y puede tardar.

## Paso 6 — Verificar los servicios

Ejecuta:

```powershell
docker compose ps
```

Debes ver `app` ejecutándose y `db` saludable (`healthy`). Si alguno falla, envía una captura. Para leer registros:

```powershell
docker compose logs --tail=50
```

## Paso 7 — Ver la página y comprobar MySQL

En Chrome/Edge, abre:

**http://localhost:3000**

Debe aparecer **¡Hola Mundo!**, el texto **Conectada ✓** y un número de visitas. Haz clic en **Registrar otra visita**: el contador debe aumentar. Eso demuestra que Node.js está insertando y leyendo datos de MySQL.

También puedes abrir **http://localhost:3000/health** para verificar la conexión. No basta con ver el HTML: debemos comprobar la base de datos.

## Paso 8 — Publicar en GitHub desde VS Code

Abre **Source Control** en el lateral de VS Code. Selecciona **Initialize Repository**, agrega archivos con `+`, escribe un mensaje de commit y elige **Commit**. Después selecciona **Publish Branch** / **Publish to GitHub**, elige repositorio **público**, y comprueba que los archivos aparecen en tu GitHub. Copia el enlace del repositorio para la entrega.

**No es necesario publicar el ZIP**: debes publicar los archivos originales dentro del repositorio. La carpeta `.git` se crea con Source Control.

## Paso 9 — Apagar sin borrar los archivos

```powershell
docker compose stop
```

Para volver a iniciarlos:

```powershell
docker compose start
```

`docker compose down` elimina los contenedores y la red, **no** el código, GitHub ni el volumen de MySQL. Evita `docker compose down -v`, porque ese parámetro sí borra el volumen y los datos guardados.

## Problemas frecuentes

- **No conecta con Docker:** asegúrate de que Docker Desktop esté abierto y el motor iniciado.
- **Port is already allocated:** el puerto 3000 está ocupado. Cambia `3000:3000` por `3001:3000` en `docker-compose.yml`, vuelve a levantar los servicios y visita `http://localhost:3001`.
- **Página no carga:** ejecuta `docker compose ps` y `docker compose logs --tail=50 app` y comparte los resultados.
- **MySQL tarda:** deja que pase su primera inicialización y revisa `docker compose ps`; el servicio de aplicación depende de que MySQL esté saludable.
- **Cambiaste las claves después de ejecutar por primera vez:** las credenciales de MySQL inicializadas se conservan en el volumen; no basta con modificar las variables para cambiar un usuario existente. Antes de modificar claves, consúltanos para evitar pérdida de datos.
- **GitHub no abre localhost:** es normal; `localhost:3000` es tu equipo, mientras GitHub guarda el código fuente.
