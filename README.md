# Parking Reservation System - Client

## Project Description

This project is a web-based parking reservation system built with React and Vite. It provides a user-friendly interface for managing parking zones, tickets, employees, and subscriptions. The application features multiple pages, reusable components, and a clean, maintainable code structure. It is designed for both desktop and mobile use, with responsive layouts and real-time updates via WebSocket.

## Features

- Employee and admin dashboards
- Live zone status and ticket management
- Subscription and visitor parking workflows
- Real-time updates using WebSocket
- Responsive layouts
- Error handling and user feedback

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AymanEldawy/parking-reservation-system-client.git
   cd parking-reservation-system-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app in your browser**
   - Visit [http://localhost:5173](http://localhost:5173)

5. **You can use any of these login data to login**
   - Visit [http://localhost:5173/login](http://localhost:5173/login)

```json
// login as admin
   Username: superadmin
   Password: superpass

// login as user
   Username: `emp1`
   Password: `pass1`
```

##  Project Structure

- `src/pages/` — Main application pages (Admin, Employee, NotFound, etc.)
- `src/components/` — Reusable UI components and layout elements
- `src/services/` — API and WebSocket service logic
- `src/store/` — State management (e.g. user and zone stores)
- `src/types/` — TypeScript type definitions
- `src/HOC/` — Guards for `admin`, `user`

## Notes

- Make sure your backend API and WebSocket server are running and accessible.
- For production build, use:
  ```bash
  npm run build
  ```

## Project screens

!Login Page
### Gates Page
![Gates Page](/src/assets/screens/gates.png)
### Zone Status
![Zone Status](/src/assets/screens/zones.png)
### Tickets
![Tickets](/src/assets/screens/ticket.png)
### Ticket form
![Ticket form](/src/assets/screens/ticket%20form.png)
### Subscribers
![Subscribers](/src/assets/screens/subscription.png)
### Admin Dashboard
![Admin / Control panel](/src/assets/screens/control%20panel.png)
### Employee Dashboard
![Admin / Employee](/src/assets/screens/users.png)
### Logs Dashboard
![Admin / Logs ](/src/assets/screens/logs.png)
### Parking state
![Admin / Parking state](/src/assets/screens/parking%20state.png)
