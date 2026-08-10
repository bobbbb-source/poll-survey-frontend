# Poll & Survey Builder – Frontend

React frontend for the AMD201 Poll & Survey Builder project.

The application allows users to create multiple-choice polls, share a unique poll link, vote without creating an account, view live results, and close polls.

## Live Application

Frontend:
https://poll-survey-frontend.vercel.app

Backend API:
https://poll-survey-backend-production.up.railway.app

## Backend Repository

https://github.com/bobbbb-source/poll-survey-backend

## Technologies

- React
- Vite
- React Router
- Axios
- SignalR
- Chart.js
- Bootstrap

## Main Pages

- Home – application landing page
- Create Poll – create a poll with 2–6 options
- Vote Poll – open a poll using its unique code and submit a vote
- Results – display poll results and receive real-time updates

## Architecture

User  
↓  
React + Vite Frontend  
↓  
REST API + SignalR  
↓  
ASP.NET Core Backend  
↓  
Entity Framework Core  
↓  
PostgreSQL

The frontend communicates with the ASP.NET Core backend using REST API requests through Axios.

SignalR is used on the results page so updated vote counts can be received without refreshing the page.

## Local Setup

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open the local URL shown by Vite in your browser.
Production Build

To create a production build:

```bash
npm run build
```

Deployment

The frontend is deployed on Vercel.

Direct React Router URLs are handled using the rewrite configuration in vercel.json.

Source Repositories

Frontend:
https://github.com/bobbbb-source/poll-survey-frontend

Backend:
https://github.com/bobbbb-source/poll-survey-backend


