# Train Traffic Optimization System - Frontend

This is the frontend application for the Train Traffic Optimization System built for Smart India Hackathon.

## Tech Stack
- Next.js 15.5.3
- React 19
- TypeScript
- Tailwind CSS
- Socket.io Client
- Axios for API calls

## Features
- Real-time train tracking dashboard
- Route optimization visualization
- Schedule management interface
- Traffic coordination dashboard
- Conflict resolution system
- Performance analytics
- Responsive design

## Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_WEBSOCKET_URL=your_websocket_url
```

## Deployment
This frontend is optimized for deployment on Vercel with automatic GitHub integration.

## Local Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build for Production
```bash
npm run build
npm start
```

## Components
- Dashboard - Main control center
- TrainTracking - Real-time train monitoring
- ScheduleManagement - Train schedule coordination
- RouteOptimization - Route planning and optimization
- Sidebar - Navigation component
