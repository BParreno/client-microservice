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

  Navega al directorio del proyecto:

Bash

cd client-microservice
Instalar Dependencias del Proyecto:

Bash

npm install @nestjs/microservices
Configurar src/main.ts:
Abre el archivo src/main.ts y reemplaza su contenido con la lógica del cliente:

TypeScript

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const timeMicroserviceClient = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  await timeMicroserviceClient.connect();
  console.log('Cliente conectado al microservicio de la Hora.');

  try {
    console.log('\n--- Solicitando la hora actual al microservicio ---');
    const currentTime = await timeMicroserviceClient.send('get_time', {}).toPromise();
    console.log(`Hora recibida del microservicio: ${currentTime}`);

  } catch (error) {
    console.error('Error al comunicarse con el microservicio de la Hora:', error.message);
  } finally {
    await timeMicroserviceClient.close();
    await app.close();
    console.log('\nCliente desconectado y aplicación de prueba cerrada.');
  }
}
bootstrap();
src/app.module.ts (Opcional, dejar por defecto):
Puedes dejar src/app.module.ts como está por defecto (o eliminar AppController y AppService si quieres un módulo más limpio):

TypeScript

// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
Iniciar el Microservicio Cliente
Asegúrate de que el time-microservice esté corriendo en su propia terminal. Luego, en la terminal de tu proyecto client-microservice, ejecuta:

Bash

npm run start
🧪 Cómo Probar el Funcionamiento
Asegúrate de que el time-microservice esté corriendo en una terminal (con npm run start:dev).

En otra terminal, navega al directorio client-microservice y ejecuta npm run start.

Observa la salida en ambas terminales:

En la terminal de client-microservice, deberías ver mensajes de conexión, la solicitud de la hora y la hora recibida.

En la terminal de time-microservice, deberías ver un mensaje indicando que recibió el comando get_time.