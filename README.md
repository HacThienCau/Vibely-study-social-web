Vibely Educational Social Web
============

The Vibely educational social networking website is an online platform that combines social media features like Facebook (friending, messaging, and posting) with study support tools (viewing study materials, the Pomodoro technique, scheduling timetables, countdown timers for university entrance exams, and taking quizzes). This platform enables students to interact, share knowledge and resources, and support each other throughout their learning journey.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
* * * * *

Table of Contents
-----------------

-   [Features](#features)
-   [System Architecture Overview](#system-architecture-overview)
-   [Future Scope](#future-scope)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Setting Up Environment Variables](#setting-up-environment-variables)
-   [Running the Project](#running-the-project)
    -   [Frontend](#frontend)
    -   [Backend](#backend)
-   [Build and Deployment](#build-and-deployment)
-   [Contributing](#contributing)
-   [License](#license)

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

Diagram
----------
```mermaid
flowchart TD
    %% Frontend Layer
    subgraph "Frontend Layer"
        FE_USER["Frontend-User"]:::frontend
        FE_ADMIN["Frontend-Admin"]:::frontend
    end

    %% Backend Layer
    subgraph "Backend Layer"
        BE_API["Backend API"]:::backend
        API_DOC["API Documentation (Swagger)"]:::backend
    end

    %% Data & External Services
    subgraph "Data & External"
        DB["Database (MongoDB)"]:::database
        CLOUD["Cloudinary Integration"]:::external
    end

    %% Real-Time & AI Services
    subgraph "Real-Time & AI Services"
        SOCKET["Socket Server"]:::socket
        CHATBOT["Chatbot Service"]:::chatbot
        AI["External AI Providers"]:::external
    end

    %% CI/CD & Testing
    CI_CD["CI/CD & Testing"]:::ciCD

    %% Connections
    FE_USER -->|"calls"| BE_API
    FE_ADMIN -->|"calls"| BE_API
    BE_API -->|"docs-in"| API_DOC
    BE_API -->|"reads/writes"| DB
    BE_API -->|"media"| CLOUD
    BE_API <-->|"real-time"| SOCKET
    BE_API -->|"AIquery"| CHATBOT
    CHATBOT -->|"calls"| AI
    SOCKET -->|"updates"| FE_USER
    SOCKET -->|"updates"| FE_ADMIN
    CI_CD --- FE_USER
    CI_CD --- FE_ADMIN
    CI_CD --- BE_API
    CI_CD --- SOCKET
    CI_CD --- CHATBOT

    %% Click Events
    click FE_USER "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/frontend-user"
    click FE_ADMIN "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/frontend-admin"
    click BE_API "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/backend"
    click CHATBOT "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/chatbot-backend"
    click SOCKET "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/socket"
    click DB "https://github.com/vonhatphuongahihi/vibely-study-social-web/blob/main/backend/config/db.js"
    click CLOUD "https://github.com/vonhatphuongahihi/vibely-study-social-web/blob/main/backend/config/cloudinary.js"
    click API_DOC "https://github.com/vonhatphuongahihi/vibely-study-social-web/blob/main/backend/API/swagger.yaml"
    click CI_CD "https://github.com/vonhatphuongahihi/vibely-study-social-web/tree/main/tests"

    %% Styles
    classDef frontend fill:#ADD8E6,stroke:#000,stroke-width:2px;
    classDef backend fill:#90EE90,stroke:#000,stroke-width:2px;
    classDef chatbot fill:#FFDAB9,stroke:#000,stroke-width:2px;
    classDef socket fill:#E6E6FA,stroke:#000,stroke-width:2px;
    classDef database fill:#FFFACD,stroke:#000,stroke-width:2px;
    classDef external fill:#FFB6C1,stroke:#000,stroke-width:2px;
    classDef ciCD fill:#D3D3D3,stroke:#000,stroke-width:2px;
