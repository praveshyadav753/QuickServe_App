# QuickServe

## Overview
QuickServe is a web-based service booking platform that allows users to register and book various services. The platform includes features for service registration, service booking, and an admin panel for managing services efficiently.

## Features
- **User Authentication**: Secure login and registration.
- **Service Registration**: Service providers can register their services.
- **Service Booking**: Users can book available services.
- **Admin Panel**: Manage services, bookings, and user accounts.
- **Category & Subcategory Management**: Services are categorized for better organization.
- **Availability Scheduling**: Define service availability by day and time.
- **Responsive UI**: Mobile-friendly design using Tailwind CSS.

## Tech Stack
### Frontend
- **React.js** (with React Router for navigation)
- **Tailwind CSS** (for styling)
- **Redux** (for state management)

### Backend
- **Django & Django REST Framework** (for APIs and backend logic)
- **PostgreSQL / SQLite** (as database)

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway

## Installation & Setup
### Prerequisites
- Node.js & npm/yarn
- Python & pip
- PostgreSQL (if using in production)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quickserve.git
   cd quickserve/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```sh
   python manage.py migrate
   ```
5. Create a superuser (for admin panel):
   ```sh
   python manage.py createsuperuser
   ```
6. Run the server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or `yarn install`
   ```
3. Start the development server:
   ```sh
   npm start  # or `yarn start`
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user

### Services
- `GET /api/services/` - Fetch all services
- `POST /api/services/` - Add a new service
- `GET /api/services/{id}/` - Get details of a specific service
- `PUT /api/services/{id}/` - Update a service
- `DELETE /api/services/{id}/` - Delete a service

### Bookings
- `POST /api/bookings/` - Create a new booking
- `GET /api/bookings/user/` - Get bookings for a user
- `GET /api/bookings/admin/` - Get all bookings (admin only)

## Deployment
1. Deploy the frontend on **Vercel**
2. Deploy the backend on **Railway**
3. Update environment variables accordingly

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

