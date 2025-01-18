# HR Department Hub - Version 1.0
The HR Department Hub is a centralized platform designed for the Human Resources (HR) Department and residents of the **Young Software Engineer Society (YSES)**. It enhances communication, collaboration, and connection within the organization by providing essential HR services.

## Key Features
1. YSES Family Tree
   - To establish and strengthen relationships among YSES residents.
2. Anonymous HR Chat
   - To provide a secure and confidential channel for residents to raise HR-related questions or concerns.

## User Guidelines
1. Probationary Members/Alumni
   - Partial access to the resident information database
   - Can access trainee information center
3. Resident Members
   - Full access to all non-admin feature 
5. Admin ( Human Resources Department and Executive Department)
   - Administrative privileges over content, databases, and messaging.

## Product Scope
The HR Department Hub is primarily used to serve as a centralized platform for HR-related information within the Young Software Engineer Society (YSES). It aims to enhance collaboration, provide essential HR services, and strengthen resident connections.

## View of the HR Department Hub 
#### User view

![Image](https://github.com/user-attachments/assets/a0ac35f6-ad8a-4798-a7bc-fd2251577557)

![Image](https://github.com/user-attachments/assets/9d8b3e1b-9f46-4f2d-a967-e4f8dbd3be2f)

#### User view (member is clicked)

![Image](https://github.com/user-attachments/assets/abcf159b-80bc-4307-b8cb-9f3b9e0b853f)

#### Search Feature

![Image](https://github.com/user-attachments/assets/2193e1fb-559a-4855-b2f9-82a18ca8cb4b)

#### Login (Admin)

![Image](https://github.com/user-attachments/assets/4fa0557d-12b0-483b-87ae-779405fd6f3f)

#### Admin view (Add mentee or Delete mentor)

![Image](https://github.com/user-attachments/assets/aa12926e-3c7f-4630-bf05-29680f217033)

#### Admin view (Adding a member)

![Image](https://github.com/user-attachments/assets/f3042e46-7e49-4b52-a863-874ff0bf555e)

## How to Run the Project
#### Setup

1. **Clone the Repository**
   - git clone https://github.com/kiefertayawa/hr_dept_hub.git

2. **Request Access**
   - Ask for an invite from the developers to access the MongoDB project.
   - Add your current IP address in the MongoDB network access settings.

3. **Install Dependencies**
   cd backend && npm install
   cd frontend && npm install

#### Environment Variables
Request the necessary credentials from the developers and create the following environment files:

### ./backend/.env
MONGO_URI=<your_mongo_uri>
TOKEN=<your_token>

CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

### ./credentials.env
MONGO_URI=<your_mongo_uri>
TOKEN=<your_token>

CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

#### Running the Project
Open two terminal windows and run the following commands:

##### Backend
cd backend && npm run dev

##### Frontend
cd frontend && npm run dev

Your application should now be running locally!

## References
Repo: https://github.com/bumbeishvili/org-chart
