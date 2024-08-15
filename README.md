
# InstituteManager

Institute Management System (IMS) is built to modernize and streamline the administrative tasks of small-scale institutes. It offers a comprehensive platform that leverages modularity, scalability, and system architecture security by integrating the three user panels: Admin, Faculty, and Student. This project was made to improve the efficiency of educational management by automating critical administrative tasks, including academic records management, attendance management, and announcements. The Institute Management System aims to replace traditional manual learning methods with an automated solution with improved accuracy, efficiency, and accessibility. This system provides better academic information management and improves communication between administrators, faculty, and students.

## Features

- **Admin Panel:** 
  - Centralized dashboard for administrators to manage academic records, student information, and faculty data.
  - Manage user authentication and access permissions.
  - **Key Features:**
    - Dashboard
    - Student Inquiry
    - Student Admission
    - Manage Faculty
    - Class Schedule
    - Attendance Management
    - Fees Management
    - Generate Certificate
    - Notice Management
    - Event Management
    - Submissions

- **Faculty Panel:** 
  - Platform for teachers to track attendance, input grades, and communicate with students.
  - Access student profiles and academic records.
  - **Key Features:**
    - Dashboard
    - View Profile
    - View Student Information
    - Take Attendance
    - Handle Inquiries
    - Student Announcements
    - Capstone Submission

- **Student Panel:** 
  - Interface for students to view attendance, grades, and upcoming events.
  - Communicate with teachers and submit inquiries or grievances.
  - **Key Features:**
    - Dashboard
    - View Profile
    - Attendance
    - Class Schedule
    - Events
    - Notice Board
    - Fees
    - Generate Certificate
    - Capstone Submission

## Technologies Used

- **Frontend:** React.js for dynamic user interfaces.
- **Backend:** Node.js and Express.js for server-side logic and API development.
- **Database:** MongoDB for flexible and scalable data storage.
- **Authentication:** JSON Web Tokens (JWT) for secure authentication and authorization.

## Installation

### Clone the Repository
To get started, clone the repository using the following command:
```bash
git clone https://github.com/raghu4033/IMS.git
```

### Backend Setup
Navigate to the backend directory:
```bash
cd IMS-Backend
```

Install the required dependencies:
```bash
npm install
```

Start the backend server:
```bash
npm run dev
```
The backend will run on port 3000.

### Frontend Setup
Navigate to the frontend directory:
```bash
cd IMS-Frontend
```

Install the required dependencies:
```bash
npm install
```

Start the frontend server:
```bash
npm run dev
```
The frontend will run on port 5173.

## Database Access

To access the database in MongoDB Compass, use the following credentials:
```bash
Connection String: mongodb+srv://harshad:Raghu4033@ims.wu6ftn2.mongodb.net/
Database Name: institute_master
User: harshad
Pass: Raghu4033
```

## Deployment

### Frontend Deployment
To deploy the frontend, use the following command:
```bash
npm run deploy
```
Or alternatively:
```bash
vite build && node deploy.cjs
```

### Backend Deployment
For backend deployment, when code is merged from the `develop` branch to the `main` branch, the `.github/workflows/deploy.yml` file will automatically trigger a deployment to the database server.

## Live Application

You can access the live applications using the following URLs:

- **Frontend Application:** [https://capstone.harshadsatasiya.com/](https://capstone.harshadsatasiya.com/)
- **Backend API:** [https://api.capstone.harshadsatasiya.com/](https://api.capstone.harshadsatasiya.com/)

## Admin Credentials

To access the admin panel, use the following credentials:
```bash
User: admin@admin.com
Pass: Admin@123
```

## Student Credentials

To access the student panel, use the following credentials:
```bash
User: student@student.com
Pass: Admin@123
```

## Faculty Credentials

To access the faculty panel, use the following credentials:
```bash
User: faculty@faculty.com
Pass: Admin@123
```

## UI Components

For the UI part, you can see all the UI components in the `UI` folder.
