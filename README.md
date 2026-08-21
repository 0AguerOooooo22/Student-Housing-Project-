# 🏠 Shaqty - Student Housing Finder

## Project Overview

Shaqty is a RESTful backend API for a student housing platform where students can post available shared accommodation and other students can search for listings and send interest requests.

The system supports:

- User registration and login
- JWT-based authentication
- Role-based authorization for `lister` and `seeker`
- Housing listing management
- Search and filtering
- Interest request management
- Swagger API documentation

## Stack

- Node.js
- TypeScript
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- dotenv
- express-validator
- Swagger / OpenAPI
- ts-node-dev

## Getting Started

### Requirements

- Node.js
- MongoDB
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/0AguerOooooo22/Student-Housing-Project-.git
   ```

2. Enter the project directory:

   ```bash
   cd Student-Housing-Project-
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and configure the required environment variables (see below).

5. Start the development server:

   ```bash
   npm run dev
   ```

The API will run on the configured port.

## Environment Variables

The project uses environment variables for configuration.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

> ⚠️ Do not commit your real `.env` file to the repository.

## Core Architecture

### Entry Points

- `src/server.ts` connects to MongoDB and starts the server.
- `src/app.ts` configures Express, routes, and Swagger.

### Middleware

- `AuthMiddleware.ts` handles JWT authentication and role-based authorization.
- Authentication uses the `Authorization: Bearer <token>` header.
- Validation middleware validates incoming request data.

### Models

- **User** – stores user information and roles.
- **Listing** – stores housing listings and their owners.
- **InterestRequest** – stores requests sent by seekers for listings.

### Routes

- `authRoutes.ts` – registration and login.
- `listingRoutes.ts` – listing management and filtering.
- `requestRoutes.ts` – interest request management.

### Utilities

- `GenerateToken.ts` – generates JWT authentication tokens.

## User Roles

### Lister

A lister is a student who has a place available.

**Permissions:**

- Create listings
- Update their own listings
- Delete their own listings
- View requests on their listings
- Accept or decline requests

### Seeker

A seeker is a student looking for accommodation.

**Permissions:**

- Browse listings
- Search and filter listings
- Send interest requests
- View their own requests
- Cancel their own pending requests

## Authentication & Authorization

### Authentication

- Users can register and login.
- Passwords are hashed using bcrypt.
- JWT tokens are generated after successful login.
- Protected endpoints require a Bearer token.

Example:

```
Authorization: Bearer <token>
```

### Authorization

The API uses role-based access control:

- `lister`
- `seeker`

Resource ownership is also checked where required. For example, a lister can only update or delete their own listings, while a seeker can only manage their own interest requests.

## Important Business Rules

### Listings

- Only listers can create listings.
- Listers can only update their own listings.
- Listers can only delete their own listings.
- Listing prices must be positive.
- Available rooms cannot be negative.
- Listings support an `isAvailable` status.

### Interest Requests

- Only seekers can send interest requests.
- A seeker cannot request their own listing.
- Duplicate requests for the same listing are prevented.
- Only the listing owner can accept or decline requests.
- Seekers can only manage their own requests.
- Only pending requests can be cancelled.
- A listing cannot be deleted if it has pending or accepted requests.

## Search & Filtering

Listings support filtering by:

- Location
- Minimum price
- Maximum price
- Available rooms
- Availability status

Example:

```
GET /api/listings?location=Cairo&minPrice=3000&maxPrice=6000&roomsAvailable=2&isAvailable=true
```

## API Highlights

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Listings

- `GET /api/listings`
- `GET /api/listings/:id`
- `POST /api/listings`
- `PUT /api/listings/:id`
- `DELETE /api/listings/:id`

### Interest Requests

- `POST /api/requests/listing/:listingId`
- `GET /api/requests/my`
- `GET /api/requests/listing/:listingId`
- `PATCH /api/requests/:id`
- `DELETE /api/requests/:id/cancel`

## API Documentation

Swagger / OpenAPI documentation is available at:

```
/api-docs
```

When running locally:

```
http://localhost:3000/api-docs
```

The Swagger documentation provides an interactive interface for testing the API endpoints.

## Project Structure

```
src/
├── Controllers/
├── config/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.ts
└── server.ts
```

## Future Improvements

Possible future improvements include:

- Pagination
- Sorting listings by price or newest
- Favorite / saved listings
- Messaging between listers and seekers
- Dashboard statistics
- Notifications
- Additional automated tests

## License

This project was developed for educational and backend training purposes.
