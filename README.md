Vibely Educational Social Web
============

The Vibely educational social networking website is an online platform that combines social media features like Facebook (friending, messaging, and posting) with study support tools (viewing study materials, the Pomodoro technique, scheduling timetables, countdown timers for university entrance exams, and taking quizzes). This platform enables students to interact, share knowledge and resources, and support each other throughout their learning journey.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
* * * * *

Table of Contents
-----------------

- [Vibely Educational Social Web](#vibely-educational-social-web)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [**User Features**:](#user-features)
    - [**Admin Features**:](#admin-features)
  - [Tech Stack](#tech-stack)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
  - [Running the Project](#running-the-project)
  - [Build and Deployment](#build-and-deployment)
    - [**Phase 1: Initial Setup and Deployment**](#phase-1-initial-setup-and-deployment)

* * * * *
Features
--------

### **User Features**:
-   Sign up, log in, log out, reset password
-   Create, view and like stories
-   Create, view, edit, delete and interact with posts and videos (react, comment, share)
-   Send and accept friend requests
-   Search for other users
-   View, save and share study materials
-   Countdown timer for university entrance exams
-   View weather forecasts
-   Pomodoro mode for focused study sessions
-   Take quizzes to test knowledge
-   Plan study schedules
-   Chat with friends
-   View notifications
-   View other users' profiles
-   Manage account and profile settings
-   Help center and submit inquiries
-   Interact with AI Chatbot for study support

### **Admin Features**:
-   View statistical reports
-   Manage users
-   Manage posts
-   Manage study materials
-   Manage inquiries
-   Change password
-   Admin account management
* * * * *

Tech Stack
----------

-   **Frontend**: Next.js, React.js, Zustand
-   **Backend**: Node.js, Express.js, JWT (for authentication), Swagger (for API documentation)
-   **Package Manager**: npm (for frontend and backend dependencies), pip (for chatbot backend dependencies)
-   **Database**: MongoDB

* * * * *
Setting Up Environment Variables
----------
* * * * *

Running the Project
----------
* * * * *

Build and Deployment
----------
### **Phase 1: Initial Setup and Deployment**

**Step 1: Launch EC2 (Ubuntu 22.04):**

- Provision an EC2 instance on AWS with Ubuntu 22.04.
- Connect to the instance using SSH.

**Step 2: Clone the Code:**

- Update all the packages and then clone the code.
- Clone your application's code repository onto the EC2 instance:
    
    ```bash
    git clone https://github.com/vonhatphuongahihi/Vibely-study-social-web
    ```

**Step 3: Install Docker and Run the App Using a Container:**

- Set up Docker on the EC2 instance:
    
    ```bash
    
    sudo apt-get update
    sudo apt-get install docker.io -y
    sudo usermod -aG docker $USER  # Replace with your system's username, e.g., 'ubuntu'
    newgrp docker
    sudo chmod 777 /var/run/docker.sock
    ```
    
- Build and run your application using Docker containers:
    
    ```bash
    docker build -t netflix .
    docker run -d --name netflix -p 8081:80 netflix:latest
    
    #to delete
    docker stop <containerid>
    docker rmi -f netflix
    ```
* * * * *
