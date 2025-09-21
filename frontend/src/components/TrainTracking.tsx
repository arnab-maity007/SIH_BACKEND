'use client';

import React, { useState } from 'react';

interface Train {
  id: string;
  name: string;
  route: string;
  status: string;
  currentLocation: string;
  nextStation: string;
}

interface TrainTrackingProps {
  trains: Train[];
}

const TrainTracking: React.FC<TrainTrackingProps> = ({ trains }) => {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredTrains = trains.filter(train => {
    if (filter === 'all') return true;
    return train.status.toLowerCase().replace(' ', '-') === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Real-time Train Tracking</h2>
          
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Trains</option>
              <option value="on-time">On Time</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Train Map Visualization */}
        <div className="mb-8">
          <div className="bg-blue-50 h-64 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🗺️</span>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Railway Map</h3>
                <p className="text-gray-600">Real-time train positions and route visualization</p>
                <p className="text-sm text-gray-500 mt-2">Map integration will show live train locations</p>
              </div>
            </div>
            
            {/* Simulated train positions */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-md">
              <div className="text-xs text-gray-600">🚂 Express 101</div>
              <div className="text-xs text-green-600">On Route</div>
            </div>
            
            <div className="absolute bottom-8 right-8 bg-white p-2 rounded shadow-md">
              <div className="text-xs text-gray-600">🚂 Rajdhani Express</div>
              <div className="text-xs text-red-600">Delayed</div>
            </div>
          </div>
        </div>

        {/* Train List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTrains.map((train) => (
            <div
              key={train.id}
              onClick={() => setSelectedTrain(selectedTrain === train.id ? null : train.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedTrain === train.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{train.name}</h3>
                  <p className="text-sm text-gray-600">{train.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(train.status)}`}>
                  {train.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-20">Route:</span>
                  <span className="text-gray-900">{train.route}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-20">Current:</span>
                  <span className="text-gray-900">{train.currentLocation}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-20">Next:</span>
                  <span className="text-gray-900">{train.nextStation}</span>
                </div>
              </div>

              {selectedTrain === train.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Detailed Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Speed:</span>
                      <span className="text-gray-900">120 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ETA:</span>
                      <span className="text-gray-900">2 hours 15 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Passengers:</span>
                      <span className="text-gray-900">420/500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform:</span>
                      <span className="text-gray-900">Platform 3</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      View Route
                    </button>
                    <button className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
                      Send Alert
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTrains.length === 0 && (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">🔍</span>
            <p className="text-gray-600">No trains found with the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainTracking;