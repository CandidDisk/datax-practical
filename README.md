# DataX practical assignment


## Prerequisites

#### Npm v8.19.2 or compatible

Refer to https://www.npmjs.com/get-npm

#### Docker v24.0.2 or compatible

Refer to https://docs.docker.com/engine/install/

## Instructions

``` bash
# Clone the repo w/ 
$ git clone https://github.com/CandidDisk/closer-test.git closer-test

# Navigate to the generated directory & install dependencies w/
$ npm install

# Setup the neccesary redis docker container w/
$ docker run -d --name datax-practical -p 127.0.0.1:6379:6379 redis

# If the docker container is not yet running, start the container w/
$ docker start datax-practical

# Optionally, to access the container after starting it
$ docker exec -it datax-practical sh

# Start the app w/
$ npm run start:dev

# Run jest unit tests w/
$ npm test 
or
$ npm run test
```

Data documentation

``` bash
# Task model
{ 
  "taskId": string,
  "data": string,
}

# Example task object
{ 
  "taskId": "1",
  "data": "Test task",
}
```
