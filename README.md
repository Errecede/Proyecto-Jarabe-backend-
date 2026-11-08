<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Bank Simulator proyecto de jarabe soft (backend) 

Backend RESTful desarrollado con NestJS, PostgreSQL, TypeORM y JWT que simula un sistema bancario para transferencias de saldo entre usuarios en tiempo real de forma atómica.

---

 Tecnologías Utilizadas

- Framework: NestJS
- Base de Datos: PostgreSQL
- ORM: TypeORM
- Contenedores: Docker & Docker Compose
- Autenticación: Passport JWT & bcrypt
- Gestor de paquetes: Yarn

---

# Pasos para Ejecutar el Proyecto

### Clonar el repositorio

```bash

 yarn install

```
 



```
  cp .env.template .env

```
  PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=bank_db
JWT_SECRET=tu_jwt_secret

```
  docker compose up -d

```
```
yarn start:dev  

```

git clone [https://github.com/Errecede/Proyecto-Jarabe-backend-.git](https://github.com/Errecede/Proyecto-Jarabe-backend-.git)
cd Proyecto-Jarabe-backend-

### By RobCorp Industries 2026. 
