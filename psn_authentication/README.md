# psn_authentication
Authentication microservice

1. Entrar a la subcarpeta psn_authentication y ejecutar:

    - ./gradlew clean
    - ./gradlew build

2. Volver a la carpeta raiz y ejecutar:

    - docker-compose up

3. Abrir el cliente phpAdmin en http://localhost:8081

    - Crear el rol: 1 Admin
    - Crear el rol: 2 User

4. Abrir el cliente phpLdapAdmin en http://localhost

    a. Crear una "Organisational Unit" llamada groups

        - Crear el "Posix Group": admins 
        - Crear el "Posix Group": users

    b. Crear una "Organisational Unit" llamada users

5. Mandar peticiones


