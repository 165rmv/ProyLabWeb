# Laboratorio de desarrollo de aplicaciones Web
## _Proyecto integrador 2da entrega_

### Rodrigo Gerardo Morán Valencia 
### Eduardo Alejandro García García 
### Diego Aguilar Gutiérrez
### Emiliano Antonio Pineda Hernández

Para poder observar la funcionalidad del proyecto, primero se debe utilizar el comando:

```sh
npm i
```
Así se creará la carpeta de **node_modules**, después se tendrá que crear un archivo **.env** para hacer uso de la base de datos de SQL con knex, este archivo debe estar en la primer capa de carpeta del proyecto y debe tener el siguiente contenido:
 ```sh
NODE_ENV=development

EXPRESS_PORT=3000

DB_DEVELOPMENT_HOST=127.0.0.1
DB_DEVELOPMENT_PORT=3306
DB_DEVELOPMENT_NAME=aesthetic_fashion
DB_DEVELOPMENT_USER=root
DB_DEVELOPMENT_PASSWORD=root

DB_PRODUCTION_HOST=127.0.0.1
DB_PRODUCTION_PORT=3306
DB_PRODUCTION_NAME=aesthetic_fashion
DB_PRODUCTION_USER=root
DB_PRODUCTION_PASSWORD=root
 ```
Se debe de crear la sabe de datos dentro de MySQL, para crear la base de datos se utiliza el siguiente comando:
```sh
create database aesthetic_fashion;
```
Y después de crear la base de datos, se deben de correr los archivos para la creación de las tablas y para utilizar seeds y rellenar las tablas, para esto se utilizan los siguientes dos comandos, se deben de correr en orden, primero la migración y después las seeds:
```sh
knex migrate:latest
knex seed:run 
```
Ahora ya se tiene la base de datos ya lista para su uso. Para correr el prouecto se utiliza el comando:
```sh
npm run devstart
```
Y si se quieren realizar las pruebas, se utiliza el comando:
```sh
npm run test
```
Cabe recalcar que cada que se corran las pruebas, si se desea correr el proyecto, antes se debe de volver a correr la migración de las tablas y sus semillas.

Lo faltante dentro de nuestro proyecto para esta entrega fue el login y la autenticación de los usuarios, pero en general todo lo demás ya se ha realizado, lo que nos falta sería terminar el estilo de la página principal, esto faltante de los usuarios e implementar el express-validation, pues nos ha dado algunos conflictos debido a que al obtener los requirements del body de algunas páginas para agregar usuarios o productos, ventas, etc, nos muestra como undefined y por más que estuvimos buscando no supimos porqué, entonces eso quedaría pendiente igual para una asesoría y ver qué nos pueda decir el profesor.
Lo faltante para el proyecto es la implementación de las APIs, las cuaes tenemos en mente una que es para mostrar las ubicaciones de los locales de ropa y otra que se nos ocurría era para realizar gráficas y el super-admin (dueño) pueda ver estas métricas sobre las ventas que se han realizado.