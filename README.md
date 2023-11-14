# Proyecto Increíble con Nest.js y RabbitMQ

Este es un proyecto Nest.js que se comunica con RabbitMQ.
¡Vamos a ejecutar el proyecto!

## Requisitos

- Docker
- Docker Compose

## Instalación

1. **Crea el contenedor con el Dockerfile:**

```bash
   docker build -t nestjs-app .
```

2. **Levanta el entorno:**

```bash
  docker-compose up
```

   Esto construirá tu aplicación Nest.js y lanzará RabbitMQ.

## Uso

La aplicación está en marcha! Accede a [http://localhost:3000](http://localhost:3000) y empieza a explorar. 🚀

## Detener

Cuando hayas tenido suficiente por el día, detén la aplicación con:

```bash
  docker-compose down
```

¡Eso es todo! ¡Diviértete hackeando!
