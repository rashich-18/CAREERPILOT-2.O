
# 🚀 CareerPilot

### AI-Powered Career Guidance and Resume Analysis Platform

CareerPilot is an AI-powered career guidance and resume analysis platform designed to help students and job seekers understand their skills, evaluate their suitability for specific career opportunities, identify skill gaps, build personalized roadmaps, practice interviews, and prepare job applications.

The platform uses the user's **profile, resume, target role, company, and job description** to provide personalized career insights and recommendations.

---

## 🎯 Project Objective

The main objective of CareerPilot is to provide users with a single platform where they can:

* Analyze and improve their resume
* Understand their strengths and weaknesses
* Check their suitability for a target job role
* Identify missing skills
* Create and track a personalized career roadmap
* Practice AI-powered interviews
* Understand their interview performance
* Generate personalized job applications
* Manage their career profile and information

CareerPilot aims to make the career preparation process more **personalized, structured, and AI-assisted**.

---

# ✨ Features

## 📄 1. Resume Analysis

Users can upload their resume in **PDF format** and receive an AI-powered analysis.

### Features

* Upload resume
* Extract resume content
* Analyze resume using Generative AI
* Generate resume score
* Identify strengths
* Identify weaknesses
* Analyze skills and experience
* Provide improvement suggestions
* Store previous resume analyses
* View resume analysis history
* Upload multiple resumes
* Delete selected resumes

---

## 🎯 2. Career Match

Career Match helps users understand how suitable their profile is for a particular job opportunity.

Users can:

* Select an existing resume
* Upload a new resume
* Enter target role
* Enter target company
* Enter job description

The AI then analyzes the resume against the target opportunity and provides:

* Match score
* Strong matches
* Partial matches
* Weaknesses
* Skill gaps
* Skills that need improvement
* Career recommendations
* Whether the user should apply
* Personalized roadmap recommendation

Previous Career Match analyses are stored so users can revisit them later.

---

## 🗺️ 3. Career Roadmap

The Career Roadmap feature helps users understand what they need to achieve their target career goal.

The roadmap is generated according to the user's:

* Current skills
* Resume
* Target role
* Identified skill gaps
* Career goal

### Features

* Personalized step-by-step roadmap
* Learning and improvement tasks
* Mark tasks as completed
* Track completed tasks
* Calculate overall progress percentage
* View previous roadmaps
* Continue working on an existing roadmap

This allows users to convert AI recommendations into actionable career goals.

---

## 🎤 4. AI Interview

CareerPilot provides an AI-powered interview practice experience based on the user's target opportunity.

Users provide:

* Target role
* Target company
* Job description

The system generates relevant interview questions and provides an interactive interview environment.

### Interview Features

* AI-generated interview questions
* Role-specific questions
* Interactive interview room
* Microphone option
* Video interface
* Question-by-question interview experience
* Interview completion

After completing the interview, CareerPilot generates an AI-powered interview report containing:

* Performance analysis
* Strengths
* Weaknesses
* Areas for improvement
* Recommendations
* What the user should work on next

Previous interview results are also available through interview history.

> The video and microphone interface is designed to provide an online interview experience and does not represent a real video conference with another person.

---

## 💼 5. Job Application

CareerPilot also helps users prepare a job application for a specific opportunity.

Users enter:

* Target role
* Company
* Job description/details

The AI generates a personalized job application based on the provided information.

The generated application can be **directly copied by the user** and used as a starting point for applying to the job.

---

# 👤 Onboarding

CareerPilot includes an onboarding process for users after their first signup.

Users can provide information such as:

* Name
* Education
* Skills
* GitHub profile
* LinkedIn profile
* Coding profile links
* Other career-related information

This information helps CareerPilot understand the user's background and provide more personalized career guidance.

---

# 👤 Profile Management

Users can manage their career information through the Profile page.

Users can:

* View profile information
* Add information
* Edit information
* Update existing information
* Delete information

The profile information can also be used by the AI to provide more relevant career analysis.

---

# 📚 History & Progress

CareerPilot stores previous user activities so that users can revisit their career preparation journey.

The platform includes history for:

* Resume analyses
* Career Match analyses
* Roadmaps
* AI interviews

Users can access previous results instead of generating everything again.

---

# 📱 Application Pages

CareerPilot currently consists of the following major pages:

1. Landing Page
2. Sign Up
3. Onboarding
4. Login
5. Dashboard
6. Resume Upload & Resume History
7. Resume Analysis
8. Career Match & Career Match History
9. Career Match Analysis
10. Roadmap History
11. Roadmap / To-Do
12. AI Interview & Interview History
13. Interview Room
14. Interview Report
15. Job Application Creation
16. Job Application Result
17. Profile

---

# 🔄 CareerPilot Workflow

```text
                    ┌──────────────────┐
                    │     Sign Up      │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │    Onboarding    │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │    Dashboard     │
                    └────────┬─────────┘
                             ↓
             ┌───────────────┼────────────────┐
             ↓               ↓                ↓
       Resume Analysis  Career Match     AI Interview
             │               │                │
             │               ↓                ↓
             │          Skill Gap       Interview Report
             │               │
             │               ↓
             │           Roadmap
             │               │
             │               ↓
             │        Track Progress
             │
             └───────────────┬────────────────┘
                             ↓
                    Job Application
                             ↓
                    Generated Application
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios
* Framer Motion
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* Mongoose
* JWT Authentication
* REST APIs

## Database

* MongoDB Atlas

## AI

* Google Gemini Generative AI

## Development Tools

* VS Code
* Git
* GitHub
* npm
* Thunder Client

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │    React + Vite     │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ↓
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │       Backend       │
                    └───────┬─────┬───────┘
                            │     │
                 ┌──────────┘     └──────────┐
                 ↓                           ↓
        ┌─────────────────┐        ┌─────────────────┐
        │   MongoDB Atlas │        │   Gemini AI     │
        │     Database    │        │     API         │
        └─────────────────┘        └─────────────────┘
```

---

# 📁 Project Structure

```text
CAREERPILOT-2.O/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

# 🚀 How to Run CareerPilot

## 1. Prerequisites

Install the following:

* [Node.js](https://nodejs.org/)
* Git
* VS Code

---

## 2. Clone the Repository

```bash
git clone https://github.com/rashich-18/CAREERPILOT-2.O.git
```

Move into the project:

```bash
cd CAREERPILOT-2.O
```

---

## 3. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 4. Install Backend Dependencies

Move to the server folder:

```bash
cd ../server
```

Install dependencies:

```bash
npm install
```

---

# 🗄️ MongoDB Atlas Setup

CareerPilot uses **MongoDB Atlas** to store user and application data.

### Steps

1. Create or log in to MongoDB Atlas.
2. Create your own cluster.
3. Create a database user.
4. Go to **Network Access**.
5. Add your current IP address.
6. Copy your MongoDB connection string.

Your connection string will look similar to:

```text
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

---

# 🤖 Gemini AI Setup

CareerPilot uses **Google Gemini Generative AI** for its AI-powered features.

### Steps

1. Open Google AI Studio.
2. Log in with your Google account.
3. Create your own Gemini API key.
4. Keep your API key private.

**Do not use or share another person's API key.**

---

# 🔐 Environment Variables

Inside the `server` folder, create a file named:

```text
.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/careerpilot
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

### ⚠️ Important

Never upload or share your `.env` file.

Never expose:

* MongoDB username
* MongoDB password
* MongoDB connection string
* Gemini API key
* JWT secret

Each person running CareerPilot locally should create their **own MongoDB Atlas database and Gemini API key**.

---

# ▶️ Start the Backend

From the `server` directory:

```bash
npm run dev
```

Keep this terminal running.

---

# 💻 Start the Frontend

Open another terminal.

From the project root:

```bash
cd CAREERPILOT-2.O/client
```

Start the frontend:

```bash
npm run dev
```

---

# 🌐 Open the Application

Vite will show the local URL in the terminal.

Usually:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🧪 Testing CareerPilot

A basic testing flow is:

```text
Create Account
      ↓
Complete Onboarding
      ↓
Upload Resume
      ↓
Resume Analysis
      ↓
Career Match
      ↓
View Skill Gap
      ↓
Generate Roadmap
      ↓
Track Roadmap Progress
      ↓
Practice AI Interview
      ↓
View Interview Report
      ↓
Generate Job Application
      ↓
Manage Profile
```

---

# 🔐 Authentication

CareerPilot uses authentication to protect user-specific information.

The application includes:

* User registration
* Login
* JWT-based authentication
* Protected routes
* User-specific data
* Profile management
* Resume history
* Career Match history
* Roadmap history
* Interview history

---

# 🎯 Why CareerPilot?

Students and job seekers often use multiple platforms for different stages of career preparation.

For example:

```text
Resume Tool
     +
Career Guidance
     +
Skill Gap Analysis
     +
Learning Roadmap
     +
Interview Practice
     +
Job Application
```

CareerPilot brings these activities together into **one platform**.

The goal is not only to analyze a user's current profile, but also to guide them toward their desired career through personalized AI-generated recommendations.

---

# 🔮 Future Scope

Potential future improvements include:

* More advanced ATS analysis
* Real-time job recommendations
* Job portal integrations
* LinkedIn profile analysis
* GitHub profile analysis
* Coding profile analysis
* Advanced speech analysis during interviews
* Interview difficulty customization
* Personalized learning resources
* Career progress analytics
* Job application tracking
* Email integration
* Production deployment

---

# 👩‍💻 Developer

### CareerPilot

**AI-Powered Career Guidance and Resume Analysis Platform**

GitHub Repository:

[https://github.com/rashich-18/CAREERPILOT-2.O.git](https://github.com/rashich-18/CAREERPILOT-2.O.git)

---

# 📜 License

This project is developed for educational and academic project purposes.

---

## 🚀 CareerPilot

### Understand your profile. Discover your path. Prepare for your career.
