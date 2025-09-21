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

  const loadMockData = useCallback(() => {
    // Enhanced fallback data with realistic Indian Railway information
    const sampleTrains: Train[] = [
      { 
        id: '12345', 
        name: 'Rajdhani Express', 
        route: 'New Delhi - Mumbai Central', 
        status: 'On Time', 
        currentLocation: 'Mathura Junction', 
        nextStation: 'Agra Cantt',
        speed: 130,
        capacity: 1200,
        occupancy: 85,
        delay: 0,
        type: 'Superfast',
        platform: '2'
      },
      { 
        id: '12650', 
        name: 'Karnataka Express', 
        route: 'New Delhi - Bangalore', 
        status: 'Delayed', 
        currentLocation: 'Gwalior', 
        nextStation: 'Jhansi',
        speed: 0,
        capacity: 1400,
        occupancy: 72,
        delay: 15,
        type: 'Express',
        platform: '4'
      },
      { 
        id: '22691', 
        name: 'Vande Bharat Express', 
        route: 'New Delhi - Varanasi', 
        status: 'On Time', 
        currentLocation: 'Kanpur Central', 
        nextStation: 'Lucknow',
        speed: 160,
        capacity: 1128,
        occupancy: 95,
        delay: 0,
        type: 'Semi High Speed',
        platform: '1'
      },
      { 
        id: '12002', 
        name: 'Shatabdi Express', 
        route: 'New Delhi - Bhopal', 
        status: 'On Time', 
        currentLocation: 'Gwalior', 
        nextStation: 'Jhansi',
        speed: 150,
        capacity: 1200,
        occupancy: 88,
        delay: 0,
        type: 'Superfast',
        platform: '3'
      },
      { 
        id: '12951', 
        name: 'Mumbai Rajdhani', 
        route: 'Mumbai Central - New Delhi', 
        status: 'Running Late', 
        currentLocation: 'Ratlam', 
        nextStation: 'Ujjain',
        speed: 110,
        capacity: 1200,
        occupancy: 91,
        delay: 25,
        type: 'Superfast',
        platform: '6'
      },
      { 
        id: '20501', 
        name: 'Gatimaan Express', 
        route: 'New Delhi - Agra Cantt', 
        status: 'On Time', 
        currentLocation: 'Faridabad', 
        nextStation: 'Palwal',
        speed: 160,
        capacity: 756,
        occupancy: 78,
        delay: 0,
        type: 'Semi High Speed',
        platform: '8'
      },
      { 
        id: '18237', 
        name: 'Chhattisgarh Express', 
        route: 'Amritsar - Bilaspur', 
        status: 'On Time', 
        currentLocation: 'Nagpur', 
        nextStation: 'Gondia',
        speed: 95,
        capacity: 1800,
        occupancy: 65,
        delay: 0,
        type: 'Express',
        platform: '5'
      },
      { 
        id: '12009', 
        name: 'Deccan Queen', 
        route: 'Mumbai CST - Pune', 
        status: 'On Time', 
        currentLocation: 'Lonavala', 
        nextStation: 'Pune',
        speed: 85,
        capacity: 1200,
        occupancy: 82,
        delay: 0,
        type: 'Express',
        platform: '1'
      },
    ];

    const sampleSchedules: Schedule[] = [
      { id: 'sch1', trainId: '12345', departure: '16:55', arrival: '08:35+1', route: 'NDLS - MMCT', platform: '2', status: 'On Time' },
      { id: 'sch2', trainId: '12650', departure: '21:50', arrival: '22:00+1', route: 'NDLS - SBC', platform: '4', status: 'Delayed' },
      { id: 'sch3', trainId: '22691', departure: '06:00', arrival: '14:00', route: 'NDLS - BSB', platform: '1', status: 'On Time' },
      { id: 'sch4', trainId: '12002', departure: '06:30', arrival: '14:45', route: 'NDLS - BPL', platform: '3', status: 'On Time' },
      { id: 'sch5', trainId: '12951', departure: '17:20', arrival: '09:55+1', route: 'MMCT - NDLS', platform: '6', status: 'Running Late' },
      { id: 'sch6', trainId: '20501', departure: '08:10', arrival: '12:30', route: 'NDLS - AGC', platform: '8', status: 'On Time' },
      { id: 'sch7', trainId: '18237', departure: '22:40', arrival: '18:15+2', route: 'ASR - BSP', platform: '5', status: 'On Time' },
      { id: 'sch8', trainId: '12009', departure: '07:15', arrival: '10:40', route: 'CSMT - PUNE', platform: '1', status: 'On Time' },
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
