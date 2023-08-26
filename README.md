# A Centralized Encrypted Content Repository

## Description

A Centralized Encrypted Content Repository is a web application that allows users to securely store and manage various types of content, such as PDFs and images, in a centralized repository. The content is encrypted to ensure data security.

The application consists of both a frontend and a backend, and it can be containerized using Docker.

## Features

- User registration and login
- Secure content storage with encryption
- Filter and categorize content by type
- Logout confirmation modal
- Frontend and backend components

## Technologies Used

- React.js for the frontend
- Spring Boot for the backend
- Docker for containerization

## Setup Instructions

### Frontend

1. Clone the repository: `git clone https://github.com/yourusername/A-Centralized-Encrypted-Content-Repository.git`
2. Navigate to the frontend directory: `cd A-Centralized-Encrypted-Content-Repository/frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Access the frontend at: `http://localhost:3000`

### Backend

1. Navigate to the backend directory: `cd A-Centralized-Encrypted-Content-Repository/backend`
2. Build the backend: `mvn clean install`
3. Run the backend: `java -jar target/backend.jar`
4. The backend will be accessible at: `http://localhost:8080`

### Docker

1. Ensure Docker is installed on your system.
2. Build the Docker image: `docker build -t content-repo-app .`
3. Run the Docker container: `docker run -p 3000:3000 -p 8080:8080 content-repo-app`

## Usage

- Visit `http://localhost:3000` in your browser to access the application.
- Register a new user or log in with existing credentials.
- Upload and manage your encrypted content.
- Use the filters to view content based on type.
- Click the "Logout" button to initiate the logout confirmation modal.

## Screenshots

![Screenshot 1](/screenshots/screenshot1.png)
![Screenshot 2](/screenshots/screenshot2.png)



## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

