# posts-upvotes
Posts and Upvotes wrote in Java and ReactJS

Steps to deploy

This project uses ReactJS to frontend, for run application type:
 * $ cd ./frontend
 * $ npm install
 * $ npm run start

The database used in this application is H2 storage in file, to access connection:
* Access: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) 
* JDBC URL: jdbc:h2:file:./segwaredb
* Username: sa
* Password: password

Backend application is wrote in Java8 + Spring Boot, to run application do:
* $ cd ./backend
* $ mvn clean install
* $ mvn spring-boot:run

Run tests:
* $ mvn test

The backend URL is:
http://localhost:8080

The frontend URL is:
http://localhost:3000/

The (Postman) resources can be found: 
* [Postman Collection](https://github.com/lrapelliboni/posts-upvotes/blob/master/backend/Posts.postman_collection.json)
