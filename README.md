
# Sound-Space API
Proyecto hecho en TypeScript que sirve como API para una aplicación de streaming de música. 

Está realizado con una arquitectura hexagonal, siguiendo los principios de Domain Driven Design.

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

# Diseño y Arquitectura:

<image src="/streaming-api/images/UML Desarrollo - Modelo de Dominio.png" alt="Modelo de Dominio (DDD)">

<image src="/streaming-api/images/UML Desarrollo - Arquitectura Hexagonal.png" alt="Arquitectura Hexagonal">

# Referencias Bibliográficas y Librerías:

## Documentación
  A continuación, se anexa el material que fue utilizado para aplicar todos los patrones tácticos y seguir los lineamientos planteados en la teoría de diseño de una arquitectura hexagonal:

  ```bash
 1) ANICHE, M. (2024). Effective Software Testing A DEVELOPER’S GUIDE. MANNING SHELTER ISLAND.
 2) KHORIKOV, V. (2020). Unit Testing: Principles, Practices, and Patterns. MANNING SHELTER ISLAND.
 3) Millett, S., & Tune, N. (2015). Pattern Principles, and Practices of Domain Driven Design. Wrox.
 4) Plöd, M. (2019). Hands-on Domain-driven Design - by example. LeanPub.
 5) VAN DEURSEN, S., & SEEMANN, M. (2019). Dependency Injection Principles, Practices, and Patterns. MANNING Shelter Island.

```

## Liberías y dependencias externas utilizadas:

  ```bash
 1) Socket.IO: Biblioteca de JavaScript para aplicaciones web en tiempo real que permite la comunicación bidireccional en tiempo real entre clientes web y servidores.Socket.IO permite establecer una conexión en tiempo real entre el servidor y los clientes. Esto es crucial para enviar datos de las canciones de manera fluida y en tiempo real al frontend. 

 2) FireBase: Se utiliza para manejar la autenticación y la autorización de los usuarios. La capacidad de Firebase para generar y validar tokens permite gestionar de forma segura las sesiones de los usuarios y proporcionar acceso personalizado a las colecciones de música, preferencias y configuraciones de los usuarios.

 3) azure/storage-blob: Servicio de almacenamiento de objetos en la nube optimizado para almacenar cantidades masivas de datos no estructurados, como archivos de audio, videos o imágenes.

```    

## Authors

- ### [@Andrés López](https://github.com/andreselc) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andres-lopez-644338281/)
- ### [@Diego Argotte](https://github.com/argotte)  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diego-argotte-2a82441a8/)
- ### [@Luis Gil    ](https://github.com/LuisGil11) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
- ### [@Alejandro Gamboa](https://github.com/gamboaalejandro) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alejandro-gamboa-6140b3228/)



