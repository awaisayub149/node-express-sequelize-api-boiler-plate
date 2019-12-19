# Node-Sequelize

Nodejs (express server) with sequelize as ORM and postgres as database. RabitMQ is used to mimic microservices. where as nodemailer is used as mailer. This project gives the basic stucture of application with user CRUD & Signup forgotpassword and login session managment API's.


## Tech stack:
Back-end - Node.js (^10.16.0) 
Package manager - npm (^6.9.0) 
Sequelize 
RabitMQ
nodemailer
aws s3 bucket
fs 
jsonwebtokens

### Prerequisites

1. ```NodeJS```
2. ```NPM```
3. RabitMQ a microService mesaging protocol. Install it if want to use Micro service acrhitechture (else just comment line 52 in app.js)
``` https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47``` 
4. ```postgresql```

### Installing

1. Clone the project.
2. Run ```npm install```  to install node dependencies.
3. In the same terminal/command window, set an environment ```"DEBUG=*" ``` (If you want debugging on)
4. Add data base credentials to server/config/config.json (You can take config.example as reference)
5. Add fill up .env 
6. Run migration ```sequelize db:migrate```
7. Run  ```npm start```  to start dev server.
8. listen to port 8001.

### Linting

1. Run ```npm run lint``` to lint app , server/ , bin/.

## Authors

* **awaisayub149** - *Initial work* - awaisayub149@gmail.com