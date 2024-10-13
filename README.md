
# News App with User Authentication and Preferences

This project is a Node.js application that allows users to register, log in, and update their news preferences (categories, languages). Users can then fetch news articles based on their preferences from an external API (e.g., NewsAPI). The application uses JWT tokens for authentication, and it also includes input validation and error handling.

## Features

- User Registration with Input Validation
- User Login with JWT Token Authentication
- Update User Preferences (Categories, Languages)
- Fetch News Based on User Preferences from an External API
- Secure Password Storage (using bcrypt)
- Error Handling for Invalid Inputs and Unauthorized Access

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token) for authentication
- Bcrypt for password hashing
- Axios for external API requests
- express-validator for input validation
- dotenv for environment variables


## API Endpoints

### User Registration

**POST** `/register`

- Registers a new user.
- Requires `name`, `email`, `password` and `role` in the request body.

**Request Example**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword",
  "role": "admin"
}
```

### User Login

**POST** `/login`

- Authenticates a user and returns a JWT token.
- Requires `email` and `password` in the request body.

**Request Example**:
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response Example**:
```json
{
  "token": "your-jwt-token"
}
```

### Update User Preferences

**PUT** `/preferences`

- Updates the logged-in user's news preferences.
- Requires `categories` (array of strings) and `languages` (array of strings).
- Requires a valid JWT token for authentication.

**Request Example**:
```json
{
  "categories": "technology",
  "languages": "en"
}
```

**Authorization Header**:
```
Bearer <your-jwt-token>
```

### Fetch News Based on Preferences

**GET** `/news`

- Fetches news articles based on the user's preferences.
- Requires a valid JWT token for authentication.

**Authorization Header**:
```
Bearer <your-jwt-token>
```

**Response Example**:
```json
[
  {
    "title": "Latest Tech News",
    "description": "The latest news in technology...",
    "url": "https://example.com/latest-tech-news"
  },
  ...
]
```
