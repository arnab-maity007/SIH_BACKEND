# Backend Deployment

This directory contains the Node.js Express backend API for the Train Traffic Optimization System.

## Deployment on Railway

This backend is configured to deploy on Railway with the following settings:

- **Start Command**: `node server-simple.js`
- **Build Command**: `npm install`
- **Node Version**: 18.x

## Environment Variables

Set the following environment variables in Railway:

```
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/train_optimization?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

## Local Development

```bash
npm install
npm start
```