// src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crea una aplicación NestJS normal para ejecutar el script

  // Crea un cliente proxy para conectarse al microservicio de la hora
  const timeMicroserviceClient = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost', // La IP donde está corriendo el time-microservice (tu propia máquina)
      port: 3001,        // El puerto donde el time-microservice está escuchando
    },
  });

  // Asegúrate de que el cliente proxy se conecte al microservicio
  await timeMicroserviceClient.connect();
  console.log('Cliente conectado al microservicio de la Hora.');

  try {
    console.log('\n--- Solicitando la hora actual al microservicio ---');
    // Envía el comando 'get_time' al microservicio de la hora
    // El segundo argumento es el payload. Para 'get_time', no necesitamos enviar datos, así que pasamos un objeto vacío.
    const currentTime = await timeMicroserviceClient.send('get_time', {}).toPromise();
    console.log(`Hora recibida del microservicio: ${currentTime}`);

  } catch (error) {
    console.error('Error al comunicarse con el microservicio de la Hora:', error.message);
  } finally {
    // Cierra la conexión del cliente proxy y la aplicación de prueba
    await timeMicroserviceClient.close();
    await app.close();
    console.log('\nCliente desconectado y aplicación de prueba cerrada.');
  }
}
bootstrap();