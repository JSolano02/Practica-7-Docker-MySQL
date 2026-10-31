# Práctica 7 — Aplicación web con Dockerfile, Docker Compose y MySQL

Proyecto **original** de una aplicación web *Hola Mundo* desarrollada con **Node.js + Express** y conectada a **MySQL**. Utiliza un `Dockerfile` para construir la aplicación y `docker-compose.yml` para levantar dos servicios independientes.



## Estructura

```text
Practica-7-Docker-MySQL/
├── src/
│   ├── index.html          # Página Hola Mundo y estado de MySQL
│   └── server.js           # Servidor Express con conexión a MySQL
├── .dockerignore
├── .env.example            # Ejemplo opcional de configuración local
├── .gitignore
├── Dockerfile              # Imagen de la aplicación web
├── docker-compose.yml      # Servicios app y db
├── package.json            # Dependencias Node.js
├── GUIA_PASO_A_PASO.md     # Tutorial completo para principiantes
└── README.md
```

## Requisitos

- Docker Desktop **abierto y funcionando**.
- VS Code, para visualizar y editar el proyecto.
- Internet para descargar las imágenes y dependencias en la primera ejecución.
- **No necesitas instalar Node.js ni MySQL en Windows**: Docker se encarga de ambos.

## Ejecutar desde la terminal de VS Code

Abre la carpeta raíz del proyecto y ejecuta:

```powershell
docker compose up -d --build
```

La primera ejecución puede tardar porque descarga Node.js/MySQL e instala dependencias. Comprueba:

```powershell
docker compose ps
```

El servicio `db` debe estar `healthy` y `app` debe estar en ejecución. Abre **http://localhost:3000** y verifica que aparezca:

- **¡Hola Mundo!**
- **Conectada ✓**
- Un contador de visitas que aumenta al pulsar *Registrar otra visita*.

También puedes comprobar la API y la base de datos en **http://localhost:3000/api/saludo** y **http://localhost:3000/health**.

## Comandos de diagnóstico

```powershell
docker compose logs --tail=50 app
docker compose logs --tail=50 db
```

Si el puerto 3000 ya está ocupado, modifica **solo el puerto del lado izquierdo** en `docker-compose.yml` de `"3000:3000"` a `"3001:3000"`. La web quedará en `http://localhost:3001`.

## Detener y reactivar sin perder archivos

```powershell
docker compose stop
```

Para reactivar contenedores detenidos:

```powershell
docker compose start
```

Para detener y eliminar contenedores/redes del proyecto (conserva los archivos locales y el volumen MySQL):

```powershell
docker compose down
```

Para volver a crear los servicios tras `down`:

```powershell
docker compose up -d
```


