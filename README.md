# MyFlix

Welcome to MyFlix, a MERN stack application that allows users to explore a collection of movies, manage their favorite movies, and update their user profile.

## Features

- **Main View**: Browse through a list of movies, filter by search, and select a movie for more details.
- **Single Movie View**: View detailed information about a selected movie, including description, genre, director, and add it to your favorites.
- **Login & Signup**: Users can log in with existing credentials or register as new users.
- **Profile View**: Display user registration details, update user information (username, password, email, date of birth), view and manage favorite movies, and deregister.
- **Optional Views (Actors, Genre, Director)**: Explore additional information about actors, genres, and directors.

## Access

You can access the MyFlix app at [https://bflixb.netlify.app](https://bflixb.netlify.app).

## Technical Requirements

- Single-Page Application (SPA) built with React.
- State routing to navigate between views and share URLs.
- Search feature to filter movies.
- Built with ES2015+ and using function components.
- Utilizes Bootstrap for UI styling and responsiveness.
- State management with React Redux for at least one feature (e.g., filtering movies).
- Hosted online for accessibility.

## Project Structure

The project structure follows a typical MERN stack application setup with the following main directories:

- `client`: Contains the React frontend application.
  - `src`: Source files for the React app.
    - `components`: React components used in the app.
    - `redux`: Redux store and slices for state management.
    - `styles`: CSS and Bootstrap styling.
    - `utils`: Utility functions and constants.
- `server`: Contains the Express backend application.
  - `models`: Mongoose models for MongoDB.
  - `routes`: Express routes for API endpoints.
  - `controllers`: Controller functions for handling requests.

## Installation

To install and run the MyFlix application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/myflix.git
   cd myflix
   ```

2. Install the client and server dependencies:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up the database:

   ```bash
   # Instructions for setting up MongoDB
   ```

4. Start the backend server:

   ```bash
   cd server
   npm start
   ```

5. Start the frontend application:
   ```bash
   cd client
   npm start
   ```

## Dependencies

- React
- React Router
- Redux
- Bootstrap
- Express
- Mongoose
- MongoDB

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
