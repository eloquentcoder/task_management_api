# Task Management API System

## Overview
The **Task Management API System** is a backend application built with Node.js, Express, and MySQL. It provides a RESTful API for managing tasks, including creating, updating, and deleting tasks. The system also integrates Redis for caching frequently accessed tasks and uses WebSockets for real-time notifications.

This project is fully dockerized, making it easy to set up and run in any environment.

## Features
- **User Authentication**: Register and authenticate users.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Redis Caching**: Store frequently accessed tasks in Redis for faster retrieval.
- **WebSockets**: Real-time notifications for task updates.
- **MySQL Database**: Persistent storage for users and tasks.
- **Dockerized Setup**: Easily deploy the system using Docker.

---

## Technologies Used
- Node.js
- Express.js
- MySQL
- Redis
- WebSockets (Socket.io)
- Docker & Docker Compose

---

## Prerequisites
Before running the application, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/eloquentcoder/task-management-api.git
cd task-management-api
```

### 2. Create a `.env` File
Create a `.env` file in the root directory and configure the environment variables. Also populate the JWT_SECRET as well:

```env
PORT=3000
JWT_SECRET=

DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=task_manager

REDIS_HOST=redis
REDIS_PORT=6379
```

### 3. Run the Application with Docker
To build and start all services (API, MySQL, Redis) using Docker Compose, run:
```bash
docker-compose up --build
```

This will:
- Build and start the Node.js API server.
- Set up a MySQL database for storing tasks and users.
- Start a Redis server for caching.
- Start a WebSocket server for real-time updates.

### 4. Verify Running Containers
After running `docker-compose up`, verify that all containers are running:
```bash
docker ps
```
You should see services for the API, MySQL, and Redis running.

---

## API Endpoints

### **Authentication**
| Method | Endpoint            | Description         |
|--------|--------------------|---------------------|
| POST   | `/api/register`     | Register a user    |
| POST   | `/api/login`        | Authenticate user  |

### **Tasks**
| Method | Endpoint            | Description            |
|--------|--------------------|------------------------|
| POST   | `/api/tasks`       | Create a new task      |
| GET    | `/api/tasks`       | Retrieve all tasks     |
| GET    | `/api/tasks/:id`   | Get task by ID         |
| PUT    | `/api/tasks/:id/update`   | Update task by ID      |
| DELETE | `/api/tasks/:id/delete`   | Delete task by ID      |

---

## Stopping the Application
To stop all running containers, press `Ctrl + C` in the terminal or run:
```bash
docker-compose down
```

To remove volumes and cached data:
```bash
docker-compose down -v
```

---

## License
This project is licensed under the MIT License.

