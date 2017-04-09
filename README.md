# Nodepop
# Introducción

Práctica consistente en la creacción de un API en Node para la consulta de anuncios de la plataforma Nodepop. El API devuelve los anuncios existentes en la base de datos y permite opciones de filtrado y paginación.

# Requisitos

Lo primero de todo después de clonar el proyecto en el disco duro, es hacer un npm install para instalar las dependencias necesarias. Por otro lado es necesario tener una instalación previa de MongoDB, para poder guardar y consultar documentos de la base de datos.

# Uso del API

Si cumplimos lo requisitos previos, ya podremos usar el API una buenas manera de comenzar de abrir una terminal en la carpeta del proyecto Nodepop y escribir:

npm run-script installDB

Este comando inicializará la base de datos con 3 anuncios y 2 usuarios, para poder empezar a usar el API.

Por último para terminar de arrancar nuestro proyecto, desde la carpeta donde lo hemos clonado teclearemos nodemon(necesitamos una instalación previa del mismo), esto arrancara nuestra app.

El API solo permite la consulta de anuncios a usuarios registrados y logeados usando jsonwebtoken. Podemos pasar el token que se nos proporciona al logearnos, por ejemplo mediante el programa postman, en la querystring de esta manera:

http://localhost:3000/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNThlNjE2YzM5ZjRhNzgzMzA0NTM4N2ExIiwiaWF0IjoxNDkxNDc0Mjk3LCJleHAiOjE0OTE2NDcwOTd9.P27E3QL0HugETC7y4ms3EbqyCPcDPxzX3QuwEofZOPA

Estome devolvera un listado por defecto en JSON con todos los anuncios presentes en la plataforma:

{
"success": true,
"result": [
{
"_id": "58e616c39f4a7833045387a3",
"__v": 0,
"nombre": "Bicicleta",
"precio": 230.15,
"tags": [
"lifstyle",
"motor"
],
"foto": "bici.jpg",
"venta": true
},
{
"_id": "58e616c39f4a7833045387a4",
"__v": 0,
"nombre": "Iphone 3GS",
"precio": 50,
"tags": [
"lifstyle",
"mobile"
],
"foto": "iphone.jpg",
"venta": false
},
{
"_id": "58e616c39f4a7833045387a5",
"__v": 0,
"nombre": "Porche",
"precio": 5550,
"tags": [
"motor",
"mobile"
],
"foto": "porche.jpg",
"venta": true
}
]
}


Podemos acceder a los tagas de cada anuncio, previamente autenticados en:

http://localhost:3000/apiv1/anuncios/tags?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNThlNjE2YzM5ZjRhNzgzMzA0NTM4N2ExIiwiaWF0IjoxNDkxNDc0Mjk3LCJleHAiOjE0OTE2NDcwOTd9.P27E3QL0HugETC7y4ms3EbqyCPcDPxzX3QuwEofZOPA

Ento nos devolvera los tags existentes en cada anuncio.

# Resgitro y autenticación de usuarios

El registro de nuevos usuarios lo podemos realizar en el endpoint del api:

http://localhost:3000/apiv1/users/

Proporcionando en el cuerpo de la petición POST: nombre, email, y password.


Para la autenticación de usuarios disponemos de la url del API: 

http://localhost:3000/apiv1/users/authenticate

Introduciremos nuestro usuario y constraseña, Usuario de ejemplo:

nombre: Miguel
password: 1234

Al logearnos se nos proporciona el token para autenticarnos en la plataforma

# Opciones de filrado y paginación

Tenemos varias opciones de filtrado entre ellas:

Precio: que permite máximos y mínimos con un guión entre ambos
Venta: Permite los valores true o false para mostrarnos si se vende o no el artículo.
nombre: Me muestra solo aquellos articulos que comiencen con el valor dado.
tags: Me permite el filtrado por tags.
Skip: Nos permite saltanos artículos. Con un valor de 1 saltaría el primer artículo mostrado, con un 2 los dos primeros y así sucesivamente.
Limit: Me limita la salida al numero proporcionado. Es útil para paginación.
Sort: Nos permite ordenar los resultados de la petición.

Ejm de petición:

http://localhost:3000/apiv1/anuncios?nombre=Porche&venta=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNThlNjE2YzM5ZjRhNzgzMzA0NTM4N2ExIiwiaWF0IjoxNDkxNDc0Mjk3LCJleHAiOjE0OTE2NDcwOTd9.P27E3QL0HugETC7y4ms3EbqyCPcDPxzX3QuwEofZOPA





