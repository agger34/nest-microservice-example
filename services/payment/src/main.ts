import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
import { QueueConst } from './modules/shared/constants/queue.const';
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('RABBITMQ_URL')],
        queue: QueueConst.PAYMENT_QUEUE,
      },
  });

  const options = new DocumentBuilder()
    .setTitle('Payments example')
    .setDescription('The payments API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservicesAsync();

  await app.listen(configService.get('PORT'), () => console.log(`Application is listening on port ${configService.get('PORT')}.`));
}
bootstrap();
