# Skyloft Kandy Booking System
A full-stack booking management system for Skyloft Kandy luxury apartments, featuring a .NET Core Web API backend and React TypeScript frontend.

## About Skyloft Kandy
Skyloft Kandy offers luxury accommodations with breathtaking mountain views in the heart of Kandy, Sri Lanka. This booking system manages reservations for our two premium apartments.

## Technology Stack
### Backend (.NET Core 8)

- Framework: ASP.NET Core Web API
- Database: SQLite with Entity Framework Core
- Authentication: JWT (planned)
- Documentation: Swagger/OpenAPI

### Frontend (React 18)

- Framework: React with TypeScript
- UI Library: React Bootstrap
- HTTP Client: Axios
- Routing: React Router
- Form Handling: React Hook Form

## Project Structure
<pre>skyloft-booking/
├── SkyloftBooking.API/         # .NET Web API
│   ├── Controllers/            # API Controllers
│   ├── Models/                 # Data Models
│   ├── Data/                   # Database Context
│   └── skyloft.db              # SQLite Database
├── skyloft-frontend/           # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable Components
│   │   ├── pages/              # Page Components
│   │   ├── services/           # API Services
│   │   ├── types/              # TypeScript Interfaces
│   │   └── utils/              # Utility Functions
│   └── public/                 # Static Assets
└── README.md</pre>

## Setup Instructions
### Prerequisites

- .NET 8 SDK
- Node.js (v18+)
- Git

### Backend Setup
<pre>bashcd SkyloftBooking.API
dotnet restore
dotnet run</pre>
API will be available at http://localhost:5132

### Frontend Setup
<pre>bashcd skyloft-frontend
npm install
npm start</pre>
Frontend will be available at http://localhost:3000

## Database Schema
### Rooms Table

- Mountain View Suite (2 guests, $150/night)
- Deluxe Apartment (4 guests, $120/night)

### Features

- Room availability checking
- Booking management
- Guest information storage
- Pricing calculations

## Current Features
- Room listing and details
- Availability checking
- Responsive design with Bootstrap
- TypeScript for type safety
- SQLite database with seed data

## Planned Features
- Booking form with validation
- Calendar integration
- Payment processing (Stripe)
- Email confirmations
- Admin dashboard
- User authentication

## Development
### API Endpoints

`GET /api/rooms` - Get all available rooms</br>
`GET /api/rooms/{id}` - Get specific room details</br>
`GET /api/rooms/availability` - Check room availability</br>
`POST /api/bookings` - Create new booking (planned)</br>

### Development Workflow

1. Start API: dotnet run (in SkyloftBooking.API folder)
2. Start Frontend: npm start (in skyloft-frontend folder)
3. Access Swagger UI: http://localhost:5132/swagger

## Learning Journey
This project was built to learn:

- Full-stack development with .NET and React
- RESTful API design
- Entity Framework Core
- TypeScript integration
- Git version control

## Contributing
This is a personal learning project for Skyloft Kandy. Contributions and suggestions are welcome!
## License
Private project for Skyloft Kandy.
