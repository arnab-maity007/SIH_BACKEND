# Frontend Deployment

This directory contains the Next.js frontend application for the Train Traffic Optimization System.

## Deployment

This frontend is configured to deploy on Vercel with the following settings:

- **Framework**: Next.js
- **Node Version**: 18.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Environment Variables

Set the following environment variable in your deployment platform:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

## Local Development

```bash
npm install
npm run dev
```