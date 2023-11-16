import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
export const swagger = (app) => {
    const options = new DocumentBuilder()
    .setTitle('Streaming API')
    .setDescription('API para streming de canciones geeks ucab ')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://streaming-api.eastus.azurecontainer.io:3000')
    .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs',app,document,{
        explorer:true,
        swaggerOptions:{
            filter:true,
            showRequestDuration:true,  

        }
    });

}
