import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Shaqty API",
            version: "1.0.0",
            description: "Student Housing Finder API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [
        "./src/routes/*.ts",
        "./src/controllers/*.ts"
    ]
};

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: User unique identifier
 *         fullName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: User full name
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         role:
 *           type: string
 *           enum:
 *             - lister
 *             - seeker
 *           description: User role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last account update date
 *       example:
 *         _id: "64f123456789abcdef123456"
 *         fullName: "Youssef Wael"
 *         email: "youssef@example.com"
 *         role: "seeker"
 *         createdAt: "2026-08-20T10:00:00.000Z"
 *         updatedAt: "2026-08-20T10:00:00.000Z"
 *
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: User full name
 *         email:
 *           type: string
 *           format: email
 *           description: Valid email address
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: User password
 *         role:
 *           type: string
 *           enum:
 *             - lister
 *             - seeker
 *           description: User role
 *       example:
 *         fullName: "Youssef Wael"
 *         email: "youssef@example.com"
 *         password: "StrongPass123"
 *         role: "seeker"
 *
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *       example:
 *         email: "youssef@example.com"
 *         password: "StrongPass123"
 *
 *
 *     Listing:
 *       type: object
 *       required:
 *         - location
 *         - price
 *         - roomsAvailable
 *         - description
 *         - owner
 *         - isAvailable
 *       properties:
 *         _id:
 *           type: string
 *           description: Listing unique identifier
 *         location:
 *           type: string
 *           description: Listing location
 *         price:
 *           type: number
 *           minimum: 0.01
 *           description: Listing price
 *         roomsAvailable:
 *           type: integer
 *           minimum: 0
 *           description: Number of available rooms
 *         description:
 *           type: string
 *           maxLength: 2000
 *           description: Listing description
 *         owner:
 *           type: string
 *           description: ID of the user who owns the listing
 *         isAvailable:
 *           type: boolean
 *           description: Whether the listing is currently available
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Listing creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last listing update date
 *       example:
 *         _id: "64f123456789abcdef123456"
 *         location: "Cairo"
 *         price: 5000
 *         roomsAvailable: 2
 *         description: "Furnished apartment near Ain Shams University"
 *         owner: "64f987654321abcdef654321"
 *         isAvailable: true
 *         createdAt: "2026-08-20T10:00:00.000Z"
 *         updatedAt: "2026-08-20T10:00:00.000Z"
 *
 *
 *     CreateListingRequest:
 *       type: object
 *       required:
 *         - location
 *         - price
 *         - roomsAvailable
 *         - description
 *       properties:
 *         location:
 *           type: string
 *           description: Listing location
 *         price:
 *           type: number
 *           minimum: 0.01
 *           description: Listing price
 *         roomsAvailable:
 *           type: integer
 *           minimum: 0
 *           description: Number of available rooms
 *         description:
 *           type: string
 *           maxLength: 2000
 *           description: Listing description
 *         isAvailable:
 *           type: boolean
 *           description: Listing availability
 *       example:
 *         location: "Cairo"
 *         price: 5000
 *         roomsAvailable: 2
 *         description: "Furnished apartment near Ain Shams University"
 *         isAvailable: true
 *
 *
 *     InterestRequest:
 *       type: object
 *       required:
 *         - listing
 *         - seeker
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: Interest request unique identifier
 *         listing:
 *           type: string
 *           description: ID of the requested listing
 *         seeker:
 *           type: string
 *           description: ID of the seeker who sent the request
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - declined
 *           description: Current status of the interest request
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Request creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last request update date
 *       example:
 *         _id: "64f123456789abcdef123456"
 *         listing: "64f987654321abcdef654321"
 *         seeker: "64f111111111abcdef111111"
 *         status: "pending"
 *         createdAt: "2026-08-20T10:00:00.000Z"
 *         updatedAt: "2026-08-20T10:00:00.000Z"
 *
 *
 *     UpdateRequestStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - accepted
 *             - declined
 *           description: New status for the interest request
 *       example:
 *         status: "accepted"
 */




/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User registration and login
 *
 *   - name: Listings
 *     description: Housing listing operations
 *
 *   - name: Requests
 *     description: Interest request operations
 */



export const swaggerSpec = swaggerJsdoc(options);
