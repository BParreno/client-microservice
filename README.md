# 🧑‍💻 Microservicio Cliente de la Hora (Cliente TCP)

Este proyecto implementa un microservicio que actúa como cliente. Su función principal es conectarse al `time-microservice` (servidor de la hora) a través de TCP, solicitar la hora actual y mostrarla en la consola.##

**🚀 Tecnologías Utilizadas**

* **NestJS:** Un framework progresivo de Node.js, utilizado para construir la aplicación cliente.
* **TCP (Transmission Control Protocol):** El protocolo de comunicación base utilizado para interactuar con el `time-microservice`.##

**📡 Detalles del Microservicio**

* **Rol:** Cliente de la hora. Solicita la hora actual a otro microservicio.
* **Host del Servidor de la Hora:** `localhost` (o la IP de la máquina donde corra `time-microservice`)
* **Puerto del Servidor de la Hora:** `3001`
* **Método de Comunicación:** Protocolo TCP de NestJS (Request-Response basado en patrones de mensaje).
* **Servidor de Ejemplo:** `time-microservice` (debe estar corriendo para que este cliente funcione).##

**📦 Estructura Interna**

La lógica principal de este microservicio cliente se encuentra en `src/main.ts`:

* **`src/main.ts`:** Configura un `ClientProxy` para conectarse al `time-microservice`. Envía el comando `get_time` y procesa la respuesta.
* **`src/app.module.ts`:** Módulo raíz mínimo, ya que la lógica principal de este cliente de prueba reside en `main.ts`.##

**⚙️ Funcionalidades Consumidas (Patrones de Mensaje TCP)**

Este microservicio consume la siguiente funcionalidad del `time-microservice`:

| `cmd`       | Descripción                          | Payload Enviado (`data`) | Retorno Esperado (`Promise<...`) |
| :---------- | :----------------------------------- | :----------------------- | :------------------------------- |
| `get_time`  | Solicita la hora actual del servidor. | `{}` (Objeto vacío)     | `string` (ej. `"10:15:30"`)      |

## 🚀 Cómo Poner en Marcha el Microservicio

Sigue estos pasos para configurar y ejecutar el microservicio cliente en tu entorno de desarrollo.

**Prerrequisitos**

Asegúrate de tener instalados los siguientes componentes:

* Node.js (versión 16.x o superior recomendada) y npm
* NestJS CLI (instalado globalmente: npm i -g @nestjs/cli)
* **El `time-microservice` debe estar corriendo** en `localhost:3001`.

### Configuración del Entorno

* Crear el Proyecto NestJS:
  Abre una **nueva terminal** (sin cerrar la del `time-microservice`) y ejecuta:

  ```bash
  nest new client-microservice