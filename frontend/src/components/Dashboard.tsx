'use client';

import React from 'react';

interface Train {
  id: string;
  name: string;
  route: string;
  status: string;
  currentLocation: string;
  nextStation: string;
}

interface Schedule {
  id: string;
  trainId: string;
  departure: string;
  arrival: string;
  route: string;
}

interface DashboardProps {
  trains: Train[];
  schedules: Schedule[];
}

const Dashboard: React.FC<DashboardProps> = ({ trains, schedules }) => {
  const onTimeTrains = trains.filter(train => train.status === 'On Time').length;
  const delayedTrains = trains.filter(train => train.status === 'Delayed').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🚂</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Trains</p>
              <p className="text-2xl font-semibold text-gray-900">{trains.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">On Time</p>
              <p className="text-2xl font-semibold text-green-600">{onTimeTrains}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delayed</p>
              <p className="text-2xl font-semibold text-red-600">{delayedTrains}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Efficiency</p>
              <p className="text-2xl font-semibold text-purple-600">
                {Math.round((onTimeTrains / trains.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Train Status</h3>
          <div className="space-y-4">
            {trains.slice(0, 5).map((train) => (
              <div key={train.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{train.name}</p>
                  <p className="text-sm text-gray-600">{train.currentLocation} → {train.nextStation}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  train.status === 'On Time' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {train.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Schedule</h3>
          <div className="space-y-4">
            {schedules.slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{schedule.route}</p>
                  <p className="text-sm text-gray-600">Departure: {schedule.departure}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Arrival: {schedule.arrival}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl mb-2 block">📈</span>
            <p className="text-gray-600">Performance charts will be displayed here</p>
            <p className="text-sm text-gray-500 mt-1">Real-time analytics and trend visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;