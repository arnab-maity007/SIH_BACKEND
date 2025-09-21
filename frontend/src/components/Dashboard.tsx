'use client';

import React, { useState, useEffect } from 'react';
import { Train, Schedule } from '@/types';

interface DashboardProps {
  trains?: Train[];
  schedules?: Schedule[];
}

// Much more comprehensive Indian Railway data
const enhancedTrainData: Train[] = [
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
  }
];

const enhancedScheduleData: Schedule[] = [
  {
    id: 'sch1',
    trainId: '12345',
    departure: '16:55',
    arrival: '08:35+1',
    route: 'NDLS - MMCT',
    platform: '2',
    status: 'On Time'
  },
  {
    id: 'sch2',
    trainId: '12650',
    departure: '21:50',
    arrival: '22:00+1',
    route: 'NDLS - SBC',
    platform: '4',
    status: 'Delayed'
  },
  {
    id: 'sch3',
    trainId: '22691',
    departure: '06:00',
    arrival: '14:00',
    route: 'NDLS - BSB',
    platform: '1',
    status: 'On Time'
  },
  {
    id: 'sch4',
    trainId: '12002',
    departure: '06:30',
    arrival: '14:45',
    route: 'NDLS - BPL',
    platform: '3',
    status: 'On Time'
  },
  {
    id: 'sch5',
    trainId: '12951',
    departure: '17:20',
    arrival: '09:55+1',
    route: 'MMCT - NDLS',
    platform: '6',
    status: 'Running Late'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ trains = enhancedTrainData, schedules = enhancedScheduleData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    activeTrains: trains.length,
    onTimePerformance: 0,
    avgDelay: 0,
    systemLoad: 0,
    totalPassengers: 0,
    avgSpeed: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Calculate enhanced statistics
    const onTimeTrains = trains.filter(train => train.status === 'On Time').length;
    const onTimePerformance = Math.round((onTimeTrains / trains.length) * 100);
    const avgDelay = trains.reduce((sum, train) => sum + (train.delay || 0), 0) / trains.length;
    const totalPassengers = trains.reduce((sum, train) => {
      const capacity = train.capacity || 0;
      const occupancy = train.occupancy || 0;
      return sum + Math.round((capacity * occupancy) / 100);
    }, 0);
    const avgSpeed = Math.round(trains.reduce((sum, train) => sum + (train.speed || 0), 0) / trains.length);
    const systemLoad = Math.round(Math.random() * 30 + 70); // Simulated system load

    setSystemStats({
      activeTrains: trains.length,
      onTimePerformance,
      avgDelay: Math.round(avgDelay * 10) / 10,
      systemLoad,
      totalPassengers,
      avgSpeed
    });

    return () => clearInterval(timer);
  }, [trains]);

  const onTimeTrains = trains.filter(train => train.status === 'On Time').length;
  const delayedTrains = trains.filter(train => train.status === 'Delayed' || train.status === 'Running Late').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Rail Command Center
                  </h1>
                  <p className="text-gray-600 font-medium">Advanced Traffic Optimization System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="font-medium">{currentTime.toLocaleTimeString()}</div>
                  <div className="text-xs">{currentTime.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Trains</p>
                <p className="text-3xl font-bold text-blue-600">{systemStats.activeTrains}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time %</p>
                <p className="text-3xl font-bold text-green-600">{systemStats.onTimePerformance}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Delay</p>
                <p className="text-3xl font-bold text-yellow-600">{systemStats.avgDelay}m</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Load</p>
                <p className="text-3xl font-bold text-purple-600">{systemStats.systemLoad}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passengers</p>
                <p className="text-3xl font-bold text-indigo-600">{systemStats.totalPassengers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Speed</p>
                <p className="text-3xl font-bold text-orange-600">{systemStats.avgSpeed} km/h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Live Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Train Status */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Live Train Status</h3>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Real-time updates</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {trains.map((train) => (
                <div key={train.id} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900">{train.name}</h4>
                        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                          {train.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{train.route}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>📍 {train.currentLocation}</span>
                        <span>➡️ {train.nextStation}</span>
                        <span>🚄 {train.speed || 0} km/h</span>
                        <span>Platform {train.platform || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        train.status === 'On Time' 
                          ? 'bg-green-100 text-green-800' 
                          : train.status === 'Delayed'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {train.status}
                      </span>
                      {(train.delay || 0) > 0 && (
                        <span className="text-xs text-red-600 font-medium">+{train.delay}m</span>
                      )}
                      <div className="text-xs text-gray-500">
                        {Math.round(((train.occupancy || 0) / 100) * (train.capacity || 0))}/{train.capacity || 0} passengers
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${train.occupancy || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Schedule Panel */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900">Today&apos;s Schedule</h3>
              <p className="text-sm text-gray-600 mt-1">Live departure & arrival times</p>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">{schedule.route}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      schedule.status === 'On Time' 
                        ? 'bg-green-100 text-green-800' 
                        : schedule.status === 'Delayed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-gray-600">Departure</p>
                      <p className="font-semibold text-blue-600">{schedule.departure}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Arrival</p>
                      <p className="font-semibold text-green-600">{schedule.arrival}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Platform {schedule.platform} • Train #{schedule.trainId}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Performance Analytics */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Performance Analytics</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Live</button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Historical</button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{onTimeTrains}</p>
                <p className="text-sm text-gray-600">On Time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{delayedTrains}</p>
                <p className="text-sm text-gray-600">Delayed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{systemStats.onTimePerformance}%</p>
                <p className="text-sm text-gray-600">Efficiency</p>
              </div>
            </div>
            
            <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-200/30">
              <div className="text-center">
                <span className="text-4xl mb-3 block">📈</span>
                <p className="text-gray-700 font-medium">Real-time Performance Chart</p>
                <p className="text-sm text-gray-500 mt-1">Live analytics and trend visualization</p>
                <div className="mt-4 flex justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>On Time</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Delayed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;