import axios, { AxiosResponse } from 'axios';
import { Train, Schedule, RouteOptimization, AnalyticsData, APIResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Services
export const trainService = {
  // Get all trains
  getAllTrains: async (params?: { status?: string; route?: string; limit?: number }) => {
    try {
      const response = await api.get('/trains', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching trains:', error);
      throw error;
    }
  },

  // Get train by ID
  getTrainById: async (trainId: string) => {
    try {
      const response = await api.get(`/trains/${trainId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching train:', error);
      throw error;
    }
  },

  // Get train status
  getTrainStatus: async (trainId: string) => {
    try {
      const response = await api.get(`/trains/${trainId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching train status:', error);
      throw error;
    }
  },

  // Create train
    createTrain: async (trainData: Omit<Train, 'id'>): Promise<APIResponse<Train>> => {
    try {
      const response = await api.post('/trains', trainData);
      return response.data;
    } catch (error) {
      console.error('Error creating train:', error);
      throw error;
    }
  },

  // Update train
  updateTrain: async (id: string, trainData: Partial<Train>): Promise<APIResponse<Train>> => {
    try {
      const response = await api.put(`/trains/${id}`, trainData);
      return response.data;
    } catch (error) {
      console.error('Error updating train:', error);
      throw error;
    }
  }
};

export const scheduleService = {
  // Get all schedules
  getAllSchedules: async (params?: { origin?: string; destination?: string; date?: string; trainId?: string; limit?: number }) => {
    try {
      const response = await api.get('/schedules', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  },

  // Get schedule by ID
  getScheduleById: async (scheduleId: string) => {
    try {
      const response = await api.get(`/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  // Search routes
  searchRoutes: async (params: { from: string; to: string; date?: string; class?: string }) => {
    try {
      const response = await api.get('/schedules/search/routes', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching routes:', error);
      throw error;
    }
  },

  // Create schedule
  createSchedule: async (scheduleData: Omit<Schedule, 'id'>): Promise<APIResponse<Schedule>> => {
    try {
      const response = await api.post('/schedules', scheduleData);
      return response.data;
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  },

  // Update schedule
  updateSchedule: async (id: string, scheduleData: Partial<Schedule>): Promise<APIResponse<Schedule>> => {
    try {
      const response = await api.put(`/schedules/${id}`, scheduleData);
      return response.data;
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  },

  // Delete schedule
  deleteSchedule: async (scheduleId: string) => {
    try {
      const response = await api.delete(`/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting schedule:', error);
      throw error;
    }
  }
};

export const optimizationService = {
  // Optimize route
  optimizeRoute: async (data: { origin: string; destination: string; priority?: string; constraints?: Record<string, unknown>; preferences?: Record<string, unknown> }) => {
    try {
      const response = await api.post('/optimization/route', data);
      return response.data;
    } catch (error) {
      console.error('Error optimizing route:', error);
      throw error;
    }
  },

  // Optimize schedule
  optimizeSchedule: async (data: { trainIds?: string[]; timeWindow?: string; objectives?: string[] }) => {
    try {
      const response = await api.post('/optimization/schedule', data);
      return response.data;
    } catch (error) {
      console.error('Error optimizing schedule:', error);
      throw error;
    }
  },

  // Optimize traffic
  optimizeTraffic: async (data: { region?: string; timeframe?: string }) => {
    try {
      const response = await api.post('/optimization/traffic', data);
      return response.data;
    } catch (error) {
      console.error('Error optimizing traffic:', error);
      throw error;
    }
  },

  // Get conflicts
  getConflicts: async () => {
    try {
      const response = await api.get('/optimization/conflicts');
      return response.data;
    } catch (error) {
      console.error('Error fetching conflicts:', error);
      throw error;
    }
  },

  // Get performance insights
  getPerformance: async () => {
    try {
      const response = await api.get('/optimization/performance');
      return response.data;
    } catch (error) {
      console.error('Error fetching performance:', error);
      throw error;
    }
  },

  // AI predictions
  getAIPredictions: async (data: { predictionType?: string; timeHorizon?: string; parameters?: Record<string, unknown> }) => {
    try {
      const response = await api.post('/optimization/ai-predict', data);
      return response.data;
    } catch (error) {
      console.error('Error getting AI predictions:', error);
      throw error;
    }
  }
};

export const analyticsService = {
  // Get dashboard analytics
  getDashboard: async (params?: { timeframe?: string }) => {
    try {
      const response = await api.get('/analytics/dashboard', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard analytics:', error);
      throw error;
    }
  },

  // Get performance analytics
  getPerformance: async (params?: { metric?: string; period?: string }) => {
    try {
      const response = await api.get('/analytics/performance', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching performance analytics:', error);
      throw error;
    }
  },

  // Get ridership analytics
  getRidership: async (params?: { route?: string; timeframe?: string }) => {
    try {
      const response = await api.get('/analytics/ridership', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching ridership analytics:', error);
      throw error;
    }
  },

  // Get financial analytics
  getFinancial: async () => {
    try {
      const response = await api.get('/analytics/financial');
      return response.data;
    } catch (error) {
      console.error('Error fetching financial analytics:', error);
      throw error;
    }
  },

  // Get operational analytics
  getOperational: async () => {
    try {
      const response = await api.get('/analytics/operational');
      return response.data;
    } catch (error) {
      console.error('Error fetching operational analytics:', error);
      throw error;
    }
  },

  // Generate custom report
  generateCustomReport: async (data: { reportType?: string; dateRange?: Record<string, unknown>; metrics?: string[]; filters?: Record<string, unknown> }) => {
    try {
      const response = await api.post('/analytics/custom-report', data);
      return response.data;
    } catch (error) {
      console.error('Error generating custom report:', error);
      throw error;
    }
  },

  // Get real-time analytics
  getRealTime: async () => {
    try {
      const response = await api.get('/analytics/real-time');
      return response.data;
    } catch (error) {
      console.error('Error fetching real-time analytics:', error);
      throw error;
    }
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;