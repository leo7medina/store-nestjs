import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    /**
     * Config Swagger.
     */
    const config = new DocumentBuilder()
        .setTitle('STORE NESTJS EXAMPLE')
        .setDescription('The store API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);

    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


/**
 * whitelist: true  => Elimina automáticamente las propiedades que no están definidas en el DTO
 *
 *
 * forbidNonWhitelisted: true => Si el cliente envía propiedades que no están permitidas (no están en el DTO),
 * en lugar de ignorarlas silenciosamente, se lanza una excepción (BadRequestException).
 *
 *
 * enableImplicitConversion: true  => convertir automáticamente los tipos primitivos en las propiedades del DTO según lo declarado en TypeScript,
 * sin necesidad de usar decoradores como @Type(() => Number).
 * GET /users?id=123
 * Nest automáticamente convierte "123" en 123 (tipo number), gracias a esa opción. Así mejora la usabilidad de las validaciones sin escribir código adicional.
 */
