# oneDotCom

Steps to run the project

1> clone the project
2> Added the .env file in git but it is not recommended
3> RUN the command `NPM install`
4> RUN `node index.js`
5> For API please refer to the postman url


http://localhost:8080/user/signup
POST

{
  "first_name" : "Anurag",
  "last_name":"Agarwal",
  "email" : "ac@gssdmail.com",
  "password": "Anurag@1234",
  "userName":"Onsddse@123",
  "role":"admin"
}


{
    "message": "User created successfully",
    "data": {
        "firstName": "Anurag",
        "lastName": "Agarwal",
        "email": "ac@gssdmail.com",
        "userName": "Onsddse@123",
        "role": "admin",
        "updatedAt": "2023-04-26T12:33:06.943Z",
        "createdAt": "2023-04-26T12:33:06.943Z"
    }
}

2>  http://localhost:8080/user/1
GET

{
    "message": "User not found!",
    "data": {}
}
