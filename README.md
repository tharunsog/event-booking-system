# Event Booking System

## Overview

The Event Booking System is a RESTful API built using Node.js, TypeScript, Express.js, and MongoDB. This application allows users to create events, book tickets, cancel bookings, and print tickets.

## Installation and Setup

1. **Clone the Repository**

   Open your terminal and run:

   ```bash
   git clone https://github.com/tharunsog/event-booking-system.git
   cd event-booking-system 

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Install the required packages with:
   ```bash
   npm install


3. **Configure Environment Variables**

   Create a .env file in the root directory and add your MongoDB connection string:
   ```bash
   MONGO_URI=mongodb://localhost:27017/event-booking
   PORT=5000


4. **Start MongoDB**

   Make sure MongoDB is installed and running. You can start it with:
   ```bash
   mongod


5. **Start the Server**

   Run the server with:
   ```bash
   npm start

The server will be available at http://localhost:5000.

**API EndPoints**
```bash
1. Create an Event
Endpoint: POST /api/events

Request Body:

json

{
  "name": "Concert",
  "date": "2024-12-31T20:00:00Z",
  "totalTickets": 200
}

Response:

json
{
  "_id": "eventIdHere",
  "name": "Concert",
  "date": "2024-12-31T20:00:00Z",
  "totalTickets": 200,
  "bookedTickets": 0,
  "__v": 0
}

2. Get All Events
Endpoint: GET /api/events

Response:

json

[
  {
    "_id": "eventIdHere",
    "name": "Concert",
    "date": "2024-12-31T20:00:00Z",
    "totalTickets": 200,
    "bookedTickets": 0,
    "__v": 0
  }
]

3. Get Event Details
Endpoint: GET /api/events/:id

Response:

json

{
  "_id": "eventIdHere",
  "name": "Concert",
  "date": "2024-12-31T20:00:00Z",
  "totalTickets": 200,
  "bookedTickets": 0,
  "__v": 0
}

4. Create a Booking
Endpoint: POST /api/bookings

Request Body:

json

{
  "userId": "user123",
  "quantity": 2,
  "eventId": "eventIdHere"
}
Response:

json

{
  "_id": "bookingIdHere",
  "userId": "user123",
  "eventId": "eventIdHere",
  "quantity": 2,
  "__v": 0
}
5. Cancel a Booking
Endpoint: DELETE /api/bookings/:id

Response:

json

{
  "message": "Booking cancelled"
}
6. Print a Ticket
Endpoint: POST /api/print-ticket

Request Body:

json

{
  "bookingId": "bookingIdHere"
}
Response:

json

{
  "event": "Concert",
  "date": "2024-12-31T20:00:00Z",
  "quantity": 2,
  "userId": "user123"
}



**Testing the API**
1. Testing with Postman
Create an Event

Set the method to POST.
Use the URL http://localhost:5000/api/events.
In the Body tab, select raw and JSON, and input the event details.
Click Send.

2. Get All Events

Set the method to GET.
Use the URL http://localhost:5000/api/events.
Click Send.

3. Get Event Details

Set the method to GET.
Use the URL http://localhost:5000/api/events/:id (replace :id with the event ID).
Click Send.

4. Create a Booking

Set the method to POST.
Use the URL http://localhost:5000/api/bookings.
In the Body tab, select raw and JSON, and input the booking details.
Click Send.

5. Cancel a Booking

Set the method to DELETE.
Use the URL http://localhost:5000/api/bookings/:id (replace :id with the booking ID).
Click Send.

6. Print a Ticket

Set the method to POST.
Use the URL http://localhost:5000/api/print-ticket.
In the Body tab, select raw and JSON, and input the booking ID.
Click Send.
