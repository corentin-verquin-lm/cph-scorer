import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './app/app.config';
import { AppModule } from './app/app.module';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;
const logger = new Logger('Application');

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });

  if (configuration.env !== 'production') setSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: configuration.env === 'production',
    }),
  );

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

function setSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('CPH Scorer api')
    .setVersion('1.0')
    .addTag('Player')
    .addTag('Tournament')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configuration.swaggerPath, app, document);

  logger.log(
    `Swagger mapped on {/${configuration.swaggerPath}, GET} and {/${configuration.swaggerPath}-json, GET}`,
  );
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
