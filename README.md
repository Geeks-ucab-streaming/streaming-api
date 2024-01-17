
# Streaming API
Proyecto hecho en TypeScript que sirve como API para una aplicación de streaming de música. Está realizado con una arquitectura hexagonal, siguiendo los principios de Domain Driven Design.

## ¿Cómo funciona el proyecto?

El proyecto consiste en una API que expone varios endpoints para acceder a los servicios de streaming de música. La API se comunica con una base de datos en la nube (Azure) que almacena la información de las canciones, los artistas, los álbumes, las listas de reproducción, álbumes y los usuarios.
La API sigue una arquitectura hexagonal, donde el núcleo del sistema es el modelo de dominio, que contiene las clases y las interfaces que representan los conceptos del dominio de la música. El modelo de dominio se comunica con el exterior a través de puertos y adaptadores.

Los puertos son las interfaces que definen los contratos de los servicios que ofrece el sistema, como la reproducción de música, la gestión de usuarios, la búsqueda de canciones, etc. Los adaptadores son las implementaciones concretas de los puertos, que pueden variar según la tecnología utilizada.

Por ejemplo, el puerto de reproducción de música puede tener dos adaptadores: uno que usa el protocolo HTTP para comunicarse con la aplicación de streaming de música, y otro que usa el protocolo WebSocket para comunicarse con un reproductor web. De esta forma, el modelo de dominio no depende de los detalles de la implementación, y se puede cambiar fácilmente.

La API también sigue los principios de DDD, utilizando un lenguaje ubicuo para nombrar las clases, los métodos y las variables, de acuerdo con el dominio de la música. Además, el sistema se divide en varios contextos acotados, que son unidades coherentes y consistentes que encapsulan una parte del dominio.

Cada contexto acotado tiene su propio modelo de dominio, que se compone de entidades, objetos de valor, raíces de agregado y servicios de dominio. Las entidades son objetos que tienen una identidad y un ciclo de vida, como los usuarios, las canciones o los álbumes. Los objetos de valor son objetos que describen cosas, como el nombre de un artista, el género de una canción o la duración de un álbum. Las raíces de agregado son entidades que combinan otras entidades y objetos de valor, y que definen los límites de consistencia del sistema. Los servicios de dominio son objetos que modelan operaciones primarias del dominio, como la reproducción de una canción, la creación de una lista de reproducción o la valoración de un álbum.

Los repositorios son los componentes que se encargan de guardar y dispensar las raíces de agregado. Los repositorios abstraen los detalles de la persistencia de los datos, y permiten acceder a ellos mediante una interfaz simple. Los repositorios son los únicos que pueden comunicarse con la base de datos, que en este caso es una base de datos relacional.



## Instalación

Install streaming-api with npm

```bash
 1) Clonar el repositorio del proyecto desde GitHub: git clone https://github.com/Geeks-ucab-streaming/streaming-api.git

 2) Entrar en el directorio del proyecto: cd streaming-api.git

 3) Instalar las dependencias del proyecto: npm install
```

# Opcional:
 Ejecutar el siguiente comando al tener el dockerfile 
docker build -t streaming-app-docker .      
 Ejecutar luego este comando al tener el compose.yml
docker-compose up
    

## Authors

- ### [@Andrés López](https://github.com/andreselc) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
- ### [@Diego Argotte](https://github.com/argotte)  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
- ### [@Luis Gil    ](https://github.com/LuisGil11) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
- ### [@Alejandro Gamboa](https://github.com/gamboaalejandro) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


