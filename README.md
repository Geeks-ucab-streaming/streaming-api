
# Sound-Space API
Proyecto hecho en TypeScript que sirve como API para una aplicación de streaming de música. 

Está realizado con una arquitectura hexagonal, siguiendo los principios de Domain Driven Design.

Modelo de dominio y Arquitectura hexagonal del proyecto en el siguiente link de lucidchart:
https://lucid.app/lucidchart/f9202a4f-fac1-49ae-b385-e59cd17f2d64/edit?viewport_loc=3673%2C-1262%2C4063%2C1857%2CcDu60uZC6Uby&invitationId=inv_7e2b3c3e-ee33-47a9-a8d6-193279445e03

## ¿Cómo funciona el proyecto?

El proyecto consiste en una API que expone varios endpoints para acceder a los servicios de streaming de música. Esta se comunica con una base de datos en la nube (Azure) que almacena la información de las canciones, los artistas, los álbumes, las listas de reproducción, álbumes y los usuarios.


La estructura de este proyecto sigue una arquitectura hexagonal, donde el núcleo del sistema es el modelo de dominio, que contiene las clases y las interfaces que representan los conceptos del dominio de la música. El modelo de dominio se comunica con el exterior a través de puertos y adaptadores. 

Los puertos son las interfaces que definen los contratos de los servicios que ofrece el sistema, como la reproducción de música, la gestión de usuarios, la búsqueda de canciones, etc. 

Los adaptadores son las implementaciones concretas de los puertos, que pueden variar según la tecnología utilizada.

La API también sigue los principios de DDD, utilizando un lenguaje ubicuo para nombrar las clases, los métodos y las variables, de acuerdo con el dominio de la música. Además, el sistema se divide en varios contextos acotados, que son unidades coherentes y consistentes que encapsulan una parte del dominio.

## Instalación

Install streaming-api with npm

```bash
 1) Clonar el repositorio del proyecto desde GitHub: git clone https://github.com/Geeks-ucab-streaming/streaming-api.git

 2) Entrar en el directorio del proyecto: cd streaming-api.git

 3) Instalar las dependencias del proyecto: npm install

 4) Para poner a ejecutar el servidor localmente: npm run start:dev

```

# Opcional:
 Ejecutar el siguiente comando al tener el dockerfile 
docker build -t streaming-app-docker .      
 Ejecutar luego este comando al tener el compose.yml
docker-compose up
    

## Authors

- ### [@Andrés López](https://github.com/andreselc) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andres-lopez-644338281/)
- ### [@Diego Argotte](https://github.com/argotte)  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diego-argotte-2a82441a8/)
- ### [@Luis Gil    ](https://github.com/LuisGil11) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
- ### [@Alejandro Gamboa](https://github.com/gamboaalejandro) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alejandro-gamboa-6140b3228/)


