# TODO API
 A Demo Project that showcases how quick and easy it is to create a restful api in nodejs

#### Getting started 

1. Build Docker image using the docker file
``` 
run docker build -t todo-api 
```

2. run the docker container
``` 
run docker run -d --restart=always -p 8080:8080 todo-api
```

3. now consume the api from port 8080 
