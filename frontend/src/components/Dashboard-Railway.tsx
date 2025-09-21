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
    nextStation: 'Ballabgarh',
    speed: 160,
    capacity: 786,
    occupancy: 78,
    delay: 0,
    type: 'Semi High Speed',
    platform: '8'
  },
  {
    id: '12019',
    name: 'Howrah Shatabdi',
    route: 'Howrah - New Delhi',
    status: 'On Time',
    currentLocation: 'Kanpur Central',
    nextStation: 'Aligarh',
    speed: 140,
    capacity: 1200,
    occupancy: 83,
    delay: 0,
    type: 'Superfast',
    platform: '5'
  },
  {
    id: '22413',
    name: 'Vande Bharat Express',
    route: 'New Delhi - Chandigarh',
    status: 'On Time',
    currentLocation: 'Ambala Cantt',
    nextStation: 'Chandigarh',
    speed: 130,
    capacity: 1128,
    occupancy: 92,
    delay: 0,
    type: 'Semi High Speed',
    platform: '7'
  },
  {
    id: '12626',
    name: 'Kerala Express',
    route: 'New Delhi - Thiruvananthapuram',
    status: 'Delayed',
    currentLocation: 'Nagpur',
    nextStation: 'Balharshah',
    speed: 95,
    capacity: 1500,
    occupancy: 89,
    delay: 45,
    type: 'Express',
    platform: '9'
  },
  {
    id: '12621',
    name: 'Tamil Nadu Express',
    route: 'New Delhi - Chennai Central',
    status: 'On Time',
    currentLocation: 'Bhopal',
    nextStation: 'Itarsi',
    speed: 105,
    capacity: 1450,
    occupancy: 76,
    delay: 0,
    type: 'Express',
    platform: '10'
  },
  {
    id: '12903',
    name: 'Golden Temple Mail',
    route: 'Mumbai Central - Amritsar',
    status: 'Running Late',
    currentLocation: 'Jaipur',
    nextStation: 'Sikar',
    speed: 85,
    capacity: 1350,
    occupancy: 68,
    delay: 30,
    type: 'Mail Express',
    platform: '11'
  },
  {
    id: '22222',
    name: 'Vande Bharat Express',
    route: 'Mumbai Central - Ahmedabad',
    status: 'On Time',
    currentLocation: 'Vadodara',
    nextStation: 'Anand',
    speed: 180,
    capacity: 1128,
    occupancy: 94,
    delay: 0,
    type: 'Semi High Speed',
    platform: '12'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Railway Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Railway Track Pattern */}
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
            <defs>
              <pattern id="tracks" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="8" width="100" height="4" fill="currentColor" opacity="0.3"/>
                <rect x="0" y="16" width="100" height="1" fill="currentColor" opacity="0.2"/>
                <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                <circle cx="60" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                <circle cx="80" cy="10" r="2" fill="currentColor" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tracks)" className="text-amber-400"/>
          </svg>
        </div>
        {/* Train Silhouette */}
        <div className="absolute bottom-0 right-0 w-96 h-32 opacity-10">
          <svg viewBox="0 0 400 120" fill="currentColor" className="w-full h-full text-amber-500">
            <path d="M20 80 L60 80 L60 60 L80 60 L80 40 L320 40 L320 60 L340 60 L340 80 L380 80 L380 100 L20 100 Z M40 90 A5 5 0 1 1 40 90 M80 90 A5 5 0 1 1 80 90 M320 90 A5 5 0 1 1 320 90 M360 90 A5 5 0 1 1 360 90"/>
            <rect x="90" y="50" width="15" height="15" rx="2"/>
            <rect x="120" y="50" width="15" height="15" rx="2"/>
            <rect x="150" y="50" width="15" height="15" rx="2"/>
            <rect x="180" y="50" width="15" height="15" rx="2"/>
            <rect x="210" y="50" width="15" height="15" rx="2"/>
            <rect x="240" y="50" width="15" height="15" rx="2"/>
            <rect x="270" y="50" width="15" height="15" rx="2"/>
            <rect x="300" y="50" width="15" height="15" rx="2"/>
          </svg>
        </div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl border-b border-amber-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl border border-amber-400/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    RailZenith
                  </h1>
                  <p className="text-gray-300 font-medium">Advanced Railway Traffic Command Center</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span>Railway System Online</span>
                </div>
                <div className="text-sm text-gray-300 bg-gray-700/80 border border-gray-600/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <div className="font-medium text-amber-300">{currentTime.toLocaleTimeString()}</div>
                  <div className="text-xs text-gray-400">{currentTime.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20 shadow-xl hover:shadow-2xl hover:border-amber-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Trains</p>
                <p className="text-3xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">{systemStats.activeTrains}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 shadow-xl hover:shadow-2xl hover:border-green-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">On-Time %</p>
                <p className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">{systemStats.onTimePerformance}%</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-all">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 shadow-xl hover:shadow-2xl hover:border-yellow-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg Delay</p>
                <p className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{systemStats.avgDelay}m</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-all">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">System Load</p>
                <p className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{systemStats.systemLoad}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 shadow-xl hover:shadow-2xl hover:border-blue-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Passengers</p>
                <p className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{systemStats.totalPassengers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 shadow-xl hover:shadow-2xl hover:border-orange-400/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg Speed</p>
                <p className="text-3xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors">{systemStats.avgSpeed}</p>
                <p className="text-xs text-gray-500">km/h</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Live Train Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Trains Panel */}
          <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-amber-500/20 shadow-xl">
            <div className="p-6 border-b border-amber-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-100 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span>Live Train Status</span>
                </h2>
                <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {trains.length} Active
                </span>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {trains.slice(0, 6).map((train) => (
                  <div key={train.id} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-4 border border-gray-600/30 hover:border-amber-500/30 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-100 text-lg group-hover:text-amber-300 transition-colors">{train.name}</h3>
                        <p className="text-sm text-gray-400 font-medium">#{train.id} • {train.type}</p>
                        <p className="text-sm text-gray-500">{train.route}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                          <span>📍 {train.currentLocation}</span>
                          <span>➡️ {train.nextStation}</span>
                          <span>🚄 {train.speed || 0} km/h</span>
                          <span>Platform {train.platform || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          train.status === 'On Time' 
                            ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                            : train.status === 'Delayed'
                            ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                            : 'bg-red-500/20 border-red-500/30 text-red-400'
                        }`}>
                          {train.status}
                        </span>
                        {(train.delay || 0) > 0 && (
                          <span className="text-xs text-red-400 font-medium">+{train.delay}m</span>
                        )}
                        <div className="text-xs text-gray-400">
                          {Math.round(((train.occupancy || 0) / 100) * (train.capacity || 0))}/{train.capacity || 0} passengers
                        </div>
                        <div className="w-20 bg-gray-600/50 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full transition-all" 
                            style={{ width: `${train.occupancy || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Schedule Panel */}
          <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-amber-500/20 shadow-xl">
            <div className="p-6 border-b border-amber-500/20">
              <h2 className="text-xl font-bold text-gray-100 flex items-center space-x-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Today&apos;s Schedule</span>
              </h2>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {schedules.map((schedule) => {
                  const train = trains.find(t => t.id === schedule.trainId);
                  return (
                    <div key={schedule.id} className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/20 hover:border-amber-400/40 transition-all group">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-100 group-hover:text-amber-300 transition-colors">{train?.name || 'Unknown Train'}</h4>
                          <p className="text-sm text-gray-400">#{schedule.trainId}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                            <span>🚆 {schedule.route}</span>
                            <span>Platform {schedule.platform}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-200">
                            {schedule.departure} → {schedule.arrival}
                          </div>
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 border ${
                            schedule.status === 'On Time' 
                              ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                              : schedule.status === 'Delayed'
                              ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                              : 'bg-red-500/20 border-red-500/30 text-red-400'
                          }`}>
                            {schedule.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-amber-500/20 shadow-xl">
          <div className="p-6 border-b border-amber-500/20">
            <h2 className="text-xl font-bold text-gray-100 flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Network Performance</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-green-500/25 transition-all">
                  <span className="text-2xl font-bold text-green-400">{onTimeTrains}</span>
                </div>
                <h3 className="font-semibold text-gray-100">On Time</h3>
                <p className="text-sm text-gray-400">Trains running on schedule</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-yellow-500/25 transition-all">
                  <span className="text-2xl font-bold text-yellow-400">{delayedTrains}</span>
                </div>
                <h3 className="font-semibold text-gray-100">Delayed</h3>
                <p className="text-sm text-gray-400">Trains with delays</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-amber-500/25 transition-all">
                  <span className="text-2xl font-bold text-amber-400">{systemStats.onTimePerformance}%</span>
                </div>
                <h3 className="font-semibold text-gray-100">Efficiency</h3>
                <p className="text-sm text-gray-400">Overall network performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;