# IDATA2301_IDATA2306_GROUP_7

---

## Project Overview
This project is a full-stack web application using Spring Boot for the backend and React for the frontend. It provides a REST API for data management and a user-friendly interface for interacting with the application.

---

## Project members
| Name    | GitHub-Username  |
|---------|------------------|
| Adrian  | Osterie          |
| Daniel  | Pizzaester       |
| Tobias  | TobyJavascript   |

---

## Installing dependencies

#### Installing Maven
1. Download Maven from the official website: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
2. Extract the downloaded archive and add the `bin` directory to your system's `PATH`.
3. Verify the installation by running:
   ```sh
   mvn -version
   ```

### Java (version 21 or higher)
1. Download and install Java 21 or a newer version from the official website: [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)
2. Set the `JAVA_HOME` environment variable to point to your Java installation.
3. Verify the installation by running:
   ```sh
   java -version
   ```

---

## Enviroment variables

### Backend

Below are the required environment variables for the backend:

| Variable Name        | Description                     |
|----------------------|---------------------------------|
| `DATABASE_HOST`      | Hostname or IP of the database  |
| `DATABASE_USERNAME`  | Username to connect to database |
| `DATABASE_PASSWORD`  | Password for the database user  |
| `DATABASE_PORT`      | Database port number            |
| `DATABASE_NAME`      | Name of the database            |
| `JWT_SECRET_KEY`     | Secret key for JWT signing      |

---

## Launching project

#### Launching Spring Boot
1. Open a terminal at the **pom.xml** level.
2. Run the following command:
   ```sh
   mvn spring-boot:run
   ```