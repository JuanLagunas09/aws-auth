
# Este proyecto busca la mostrar la configuracion a traves del SDK de aws y node js, utilizando su capa gratuita, creanbdo una api de autenticacion con algunos de los servicios brindados por aws

# Puedes ver la descripcion dellada en: 

# Versiones 
<!-- 
node: 20.18.0
mysql: Ver 15.1 Distrib 10.4.32-MariaDB
"express": "4.21.0",
"joi": "^17.13.3", 
"mysql2": "^3.11.3"
"@aws-sdk/client-cognito-identity-provider": "^3.675.0",
-->
# Instalacion de dependencias con: npm i | npm install

# Correr el proyecto: npm run dev

# Crear migraciones: npm run migration:generate src/migration/nombre_migracion

# Ejecutar las migraciones npm run migration:run

# Rutas principales 
<!-- 
GET
/hello-banana -> Respuesta de que la api esta funcionando, ruta  sin proteccion

POST
/auth/signup -> Registro de usuario, recibe un objeto json del tipo 
{
    "name": "",
    "lastname": "", 
    "username": "",
    "email": "", -> debe de ser un correo real para verrificarlo
    "password": "1234Abc#", -> tipo numero, mayuscula y caracter especial, 8 caracteres minimo
    "repeat_password": "1234Abc#",
    "phone": "",
    "adress": ""
    
}

POST
/auth/verify -> Verificacion de codigo, llega al correo de registro, recibe un objeto json del tipo 
{
    "username": "",
    "code": ""
}

POST
/auth/signin -> Inicio de sesion,  recibe un objeto json del tipo 
{
    "username": "", 
    "password": ""
}

GET
/auth/logout -> ruta validada, necesita el token de acceso del inico de sesion

GET
/user/show -> muestra informacion del usuario loggeado
 -->


# Lamda tutorial con github actions
https://youtu.be/N_7lO4oyg0c?si=mpfkEy-YNfumWAYu

# Cognito docs para JS
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_cognito-identity-provider_code_examples.html#actions

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/

https://www.youtube.com/watch?v=Mvcv-AM23R4

# ElastiCache Redis tutorial
https://youtu.be/H8S6G6_Ha_Y?si=KBUvxNMVsQ5rRB5h

# CLI aws tutrial
https://youtu.be/5Ek9TxluVd8?si=_jr1jb_jCTI1rWNl

# Lambda y gateway de AWS
https://youtu.be/oFGYoWXR17g?si=xyx6cfDE15MJSZ6V
