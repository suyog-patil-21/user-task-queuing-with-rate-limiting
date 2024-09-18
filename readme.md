## User Task Queuing with Rate Limiting
A simple Node.js application to demonstrate Rate limiting per userId (customkey) based. Along with Queuing System (i.e Message Queue) to ensure that tasks are processed according to the rate limit for each user ID. For this demo 
we are setting rate limit as - 1 request/sec per User ID & 20 request/sec per User ID

#### What is Rate Limiter?
A rate limiter is a technique that controls the rate at which requests are made to a network, server, or other resource. It's used to: 
* Prevent malicious bot activity 
* Reduce strain on web servers 
* Protect against cyber attacks, such as Denial of Service (DoS) attacks 
* Ensure fair usage of resources among multiple clients 
* Maintain system stability and security 
* Prevent server error 


#### What is Message Queue?
A Message Queue is a form of communication and data transfer mechanism used in computer science and system design. It functions as a temporary storage and routing system for messages exchanged between different components, applications, or systems within a larger software architecture.
example packages- BullMQ, kafka, rabbitMQ, etc 


### How is it working?


```
t=1s                        |
       ---------r1---------------> 
                            |   (SERVER)
User1  ---------r2--------->|   http://localhost:3000/
                            |   api/v1/task
       ---------r3--------->| 
                            |  
                        rate limiter
                (1 request/second) per User
```
When server receive request for our example at time 1sec 
if user1 send 3 request to the server but the server has set 1 request/sec. then server will allow the 1st request to be process but when r2, r3 are being processed as they are greater than ther rate limit the server can do 2 things - drop the request or add it to the queue and process it later (depends upon the requirement of the feature) based on it we will let the client know the http status of the request send by the server i.e 429 (Too Many Requests) or 202 ("Accepted" for processing, but the processing is not complete).

For this Demo we are adding the request to the Queue to process it later using BullMQ.

BullMQ is a Node.js library that implements a fast and robust queue system built on top of Redis that helps in resolving many modern age micro-services architectures.


## Setup
1. Requirements: Install [Nodejs](https://nodejs.org/en) & [git](https://git-scm.com/), [redis](https://redis.io/).

1. using git clone this repository.
    ```
    git clone https://github.com/suyog-patil-21/user-task-queuing-with-rate-limiting.git
    ```

1. cd inside the cloned folder 
    ```
    cd user-task-queuing-with-rate-limiting
    ```

1. Install the dependencies. 

    ```
    npm install
    ```

1. Keep the redis server on.

1. run the application
    ```
    npm run start
    ```
    or 
    ```
    npm run dev
    ```
    *Note: run the application in developement mode use npm run dev*

    the application will run port 3000).
1. To run the apis: `http://localhost:3000/` 