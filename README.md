# IdeaVault - Frontend

## Overview
This is the frontend component of the IdeaVault project. It provides a user-friendly interface for users to interact with the application, allowing them to create, view, update, and delete notes.

## Preprequisites
- You need to have nodejs installed in your machine. 
- [IdeaVault Backend](https://github.com/sethum3001/IdeaVault-backend): (**This is mandatory**) This is the API for IdeaVault frontend.

## Setup Instructions
- **Clone Repository**: Clone this repository to your local machine.
- **Navigate to Frontend**: Navigate to the frontend directory.
- **Install Dependencies**: Run `npm install` to install dependencies.
- **Start Development Server**: Run `npm start` to start the development server.
- **Open Application**: Open your browser and navigate to `http://localhost:3000` to view the application.
- **Configuration**: In const.js file, change the BASE_URL to your local instance url of IdeaVault backend.
```
    const BASE_URL = "http://localhost:8070";
```

## Folder Structure
- `/src`: Contains the source code of the frontend application.
- `/components`: Contains reusable components used throughout the application.
- `/pages`: Contains page components representing different routes of the application.

## Features
- View a list of existing notes.
- Create new notes with a title and content and label.
- Edit existing notes.
- Delete notes.
- Create, edit and delete labels 
- Error handling for invalid input.

## Technologies Used
- React.js
- Tailwind CSS
- Axios (for HTTP requests)
- React Router (for routing)
- Formik and yup for form validation


## Demo

https://idea-vault-frontend.vercel.app/

