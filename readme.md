# Laboratorio de desarrollo de aplicaciones Web
## _Proyecto integrador: Entrega final_

### Rodrigo Gerardo Morán Valencia 
### Eduardo Alejandro García García 
### Diego Aguilar Gutiérrez
### Emiliano Antonio Pineda Hernández

Para poder observar la funcionalidad del proyecto, primero se debe utilizar el comando:

```sh
npm i
```
Así se creará la carpeta de **node_modules**, después, se creará la base de datos en SQL, utilizando el CMD de MySQL o el Workbench, vamos a correr el siguiente comando:
```sh
create database aesthetic_fashion;
```
Con  esto, ya podremos hacer uso de la base de datos local, llamada "aesthetic_fashion". Una vez creada la base de datos, se tendrá que crear un archivo **.env** para hacer uso de la base de datos de SQL con knex, hacer uso de Auth0, y de Firebase. Este archivo debe estar en la primer capa de carpeta del proyecto y debe tener el siguiente contenido:

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

SECRET=alongrandomly-generatedstringstoredinenv
BASEURL=http://localhost:3000
CLIENTID=yC2JCnJAawabquizx1KUTpjKBHmizpOW
ISSUERBASEURL=https://dev-jvsg1n46.us.auth0.com

DBURLFIREBASE=https://aesthetic-fashion-4a9dd-default-rtdb.firebaseio.com/
 ```

Después de crear la base de datos y el archivo .env, se deben de correr los archivos para la creación de las tablas y para utilizar seeds y rellenar las tablas, para esto se utilizan los siguientes dos comandos, se deben de correr en orden, primero la migración y después las seeds:
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

## APIs utilizadas

En total se utilizaron dos APIs, una fue para obtener el cambio de monedas y otra fue para mostrar ubicaciones dentro de un mapa de Google.

## Valor agregado

De valor agregado para la clase, nosotros decidimos utilizar Auth0, una ventaja de Auth0 son que nos brinda simplicidad y a su vez protección de las identidades en nuestra aplicación, es mucho más seguro debido a que las contraseñas se quedan este servicio. Dentro de esta plataforma se realizan las técnicas de hasheo a las contraseñas como lo vimos en clase, aparte que se maneja la autenticación y el login/logout de manera mucho más rápida y sencilla.

Otra cosa que implementamos externo a lo qeu vimos en la clase fue Firebase para el guardado de las imágenes de manera remota, esto con el fin de que se pudiera hacer uso de imágenes de manera remota a nuestro proyecto.

El uso de ambos servicios son desde la cuenta de "Dueño" la cual es:
```sh
aesthfashi.sa@gmail.com
superAdmin22
```