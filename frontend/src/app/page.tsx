'use client';

import { useState, useEffect, useCallback } from 'react';
import Dashboard from '@/components/Dashboard';
import TrainTracking from '@/components/TrainTracking';
import ScheduleManagement from '@/components/ScheduleManagement';
import RouteOptimization from '@/components/RouteOptimization';
import Sidebar from '@/components/Sidebar';
import { trainService, scheduleService, healthCheck } from '@/services/api';
import { Train, Schedule } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trains, setTrains] = useState<Train[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const loadMockData = useCallback(() => {
    // Fallback to mock data if API is not available
    const sampleTrains: Train[] = [
      { id: 'T001', name: 'Express 101', route: 'Delhi-Mumbai', status: 'On Time', currentLocation: 'Gwalior', nextStation: 'Bhopal' },
      { id: 'T002', name: 'Rajdhani Express', route: 'Delhi-Chennai', status: 'Delayed', currentLocation: 'Nagpur', nextStation: 'Hyderabad' },
      { id: 'T003', name: 'Shatabdi Express', route: 'Mumbai-Pune', status: 'On Time', currentLocation: 'Lonavala', nextStation: 'Pune' },
    ];

    const sampleSchedules: Schedule[] = [
      { id: 'S001', trainId: 'T001', departure: '08:00', arrival: '20:00', route: 'Delhi-Mumbai' },
      { id: 'S002', trainId: 'T002', departure: '14:30', arrival: '10:15+1', route: 'Delhi-Chennai' },
      { id: 'S003', trainId: 'T003', departure: '06:15', arrival: '09:45', route: 'Mumbai-Pune' },
    ];

    setTrains(sampleTrains);
    setSchedules(sampleSchedules);
  }, []);

  const initializeApp = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check API health
      try {
        await healthCheck();
        setApiConnected(true);
        console.log('✅ Successfully connected to backend API');
        
        // Fetch real data from API
        const [trainsResponse, schedulesResponse] = await Promise.all([
          trainService.getAllTrains(),
          scheduleService.getAllSchedules()
        ]);
        
        if (trainsResponse.success) {
          setTrains(trainsResponse.data);
        }
        
        if (schedulesResponse.success) {
          setSchedules(schedulesResponse.data);
        }
        
      } catch {
        console.warn('⚠️ API not available, using mock data');
        setApiConnected(false);
        loadMockData();
      }
      
    } catch (error) {
      console.error('Error initializing app:', error);
      loadMockData();
    } finally {
      setLoading(false);
    }
  }, [loadMockData]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⚙️</div>
            <p className="text-gray-600">Loading Train Traffic Optimization System...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard trains={trains} schedules={schedules} />;
      case 'tracking':
        return <TrainTracking trains={trains} />;
      case 'schedules':
        return <ScheduleManagement schedules={schedules} setSchedules={setSchedules} />;
      case 'optimization':
        return <RouteOptimization />;
      default:
        return <Dashboard trains={trains} schedules={schedules} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Train Traffic Optimization System</h1>
              <p className="text-gray-600 mt-2">Smart India Hackathon - Real-time Railway Management</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${apiConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${apiConnected ? 'text-green-600' : 'text-red-600'}`}>
                {apiConnected ? 'API Connected' : 'Using Mock Data'}
              </span>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
