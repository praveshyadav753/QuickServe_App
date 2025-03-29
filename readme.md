# QuickServe

## Overview
QuickServe is a web-based service booking platform that allows users to register and book various services. The platform includes features for service registration, service booking, an admin panel and service provider dashboard(partners) for managing services efficiently.

## Features
- **User Authentication**: Secure login and registration.
- **Service Registration**: Service providers can register their services.
- **Service Booking**: Users can book available services.
- **Admin Panel**: Manage services, bookings, and user accounts.
- **Business Panel**:Manage Services ,Bookings and earnings.
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
- **MySql** (as database)

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway

## Installation & Setup
### Prerequisites
- Node.js & npm/yarn
- Python & pip


### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/praveshyadav753/QuickServe_App.git
   cd quickserve/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv\Scripts\activate  
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
   cd ../quickserve
   ```
2. Install dependencies:
   ```sh
   npm install  # or `yarn install`
   ```
3. Start the development server:
   ```sh
   npm run dev  # or `yarn start`
   ```

## Admin Panel
    /admin
## Service Provider (Business) Panel
    /business



## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

