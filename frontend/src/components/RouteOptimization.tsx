'use client';

import React, { useState } from 'react';

interface AlternativeRoute {
  path: string;
  totalTime: string;
  totalDistance: string;
  fuelEfficiency: string;
  congestionLevel: string;
}

interface RecommendedRoute {
  path: string;
  totalTime: string;
  totalDistance: string;
  fuelEfficiency: string;
  congestionLevel: string;
  estimatedCost: string;
}

interface OptimizationMetrics {
  timeSaved: string;
  fuelSaved: string;
  costSaved: string;
  emissionReduction: string;
}

interface OptimizationResults {
  recommendedRoute: RecommendedRoute;
  alternativeRoutes: AlternativeRoute[];
  optimizationMetrics: OptimizationMetrics;
}

export default function RouteOptimization() {
  const [optimizationData, setOptimizationData] = useState({
    origin: '',
    destination: '',
    priority: 'time',
    constraints: {
      maxStops: 5,
      avoidCongestion: true,
      preferExpressRoutes: false,
    }
  });

  const [optimizationResults, setOptimizationResults] = useState<OptimizationResults | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      const results = {
        recommendedRoute: {
          path: `${optimizationData.origin} → Jhansi → Bhopal → ${optimizationData.destination}`,
          totalTime: '8h 45m',
          totalDistance: '756 km',
          fuelEfficiency: '92%',
          congestionLevel: 'Low',
          estimatedCost: '₹12,450'
        },
        alternativeRoutes: [
          {
            path: `${optimizationData.origin} → Agra → Gwalior → ${optimizationData.destination}`,
            totalTime: '9h 15m',
            totalDistance: '820 km',
            fuelEfficiency: '88%',
            congestionLevel: 'Medium'
          },
          {
            path: `${optimizationData.origin} → Kanpur → Allahabad → ${optimizationData.destination}`,
            totalTime: '10h 30m',
            totalDistance: '890 km',
            fuelEfficiency: '85%',
            congestionLevel: 'High'
          }
        ],
        optimizationMetrics: {
          timeSaved: '2h 15m',
          fuelSaved: '145L',
          costSaved: '₹3,200',
          emissionReduction: '23%'
        }
      };
      
      setOptimizationResults(results);
      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Optimization</h2>
        
        {/* Optimization Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origin Station</label>
              <select
                value={optimizationData.origin}
                onChange={(e) => setOptimizationData({...optimizationData, origin: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Origin</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Station</label>
              <select
                value={optimizationData.destination}
                onChange={(e) => setOptimizationData({...optimizationData, destination: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Destination</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Priority</label>
              <select
                value={optimizationData.priority}
                onChange={(e) => setOptimizationData({...optimizationData, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="time">Minimize Travel Time</option>
                <option value="distance">Minimize Distance</option>
                <option value="fuel">Maximize Fuel Efficiency</option>
                <option value="cost">Minimize Cost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={optimizationData.constraints.avoidCongestion}
                    onChange={(e) => setOptimizationData({
                      ...optimizationData,
                      constraints: { ...optimizationData.constraints, avoidCongestion: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Avoid High Congestion Areas</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={optimizationData.constraints.preferExpressRoutes}
                    onChange={(e) => setOptimizationData({
                      ...optimizationData,
                      constraints: { ...optimizationData.constraints, preferExpressRoutes: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Prefer Express Routes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Max Stops:</span>
                  <input
                    type="number"
                    value={optimizationData.constraints.maxStops}
                    onChange={(e) => setOptimizationData({
                      ...optimizationData,
                      constraints: { ...optimizationData.constraints, maxStops: parseInt(e.target.value) }
                    })}
                    min="1"
                    max="20"
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={!optimizationData.origin || !optimizationData.destination || isOptimizing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors"
            >
              {isOptimizing ? 'Optimizing Route...' : 'Optimize Route'}
            </button>
          </div>

          {/* Optimization Visualization */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Visualization</h3>
            <div className="h-80 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {isOptimizing ? (
                <div className="text-center">
                  <div className="animate-spin text-4xl mb-4">⚙️</div>
                  <p className="text-gray-600">Calculating optimal route...</p>
                  <p className="text-sm text-gray-500 mt-1">Analyzing traffic patterns and constraints</p>
                </div>
              ) : optimizationResults ? (
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🛤️</span>
                  <p className="text-gray-700 font-medium">{optimizationResults.recommendedRoute.path}</p>
                  <p className="text-sm text-gray-600 mt-1">Optimized route visualization</p>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-gray-600">Interactive route map will appear here</p>
                  <p className="text-sm text-gray-500 mt-1">Select origin and destination to start</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Results */}
      {optimizationResults && (
        <div className="space-y-6">
          {/* Recommended Route */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-green-600">
              🎯 Recommended Route
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Route Path</div>
                <div className="font-semibold text-gray-900">{optimizationResults.recommendedRoute.path}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Time</div>
                <div className="font-semibold text-gray-900">{optimizationResults.recommendedRoute.totalTime}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Distance</div>
                <div className="font-semibold text-gray-900">{optimizationResults.recommendedRoute.totalDistance}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Estimated Cost</div>
                <div className="font-semibold text-gray-900">{optimizationResults.recommendedRoute.estimatedCost}</div>
              </div>
            </div>
          </div>

          {/* Alternative Routes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Routes</h3>
            <div className="space-y-4">
              {optimizationResults.alternativeRoutes.map((route: AlternativeRoute, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{route.path}</div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>Time: {route.totalTime}</span>
                        <span>Distance: {route.totalDistance}</span>
                        <span>Efficiency: {route.fuelEfficiency}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          route.congestionLevel === 'Low' ? 'bg-green-100 text-green-800' :
                          route.congestionLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {route.congestionLevel} Congestion
                        </span>
                      </div>
                    </div>
                    <button className="mt-2 md:mt-0 text-blue-600 hover:text-blue-800 text-sm">
                      Select Route
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Benefits</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{optimizationResults.optimizationMetrics.timeSaved}</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{optimizationResults.optimizationMetrics.fuelSaved}</div>
                <div className="text-sm text-gray-600">Fuel Saved</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{optimizationResults.optimizationMetrics.costSaved}</div>
                <div className="text-sm text-gray-600">Cost Saved</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{optimizationResults.optimizationMetrics.emissionReduction}</div>
                <div className="text-sm text-gray-600">Emission Reduction</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}