'use client';

import React, { useState } from 'react';
import { Schedule } from '@/types';

interface ScheduleManagementProps {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({ schedules, setSchedules }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState({
    trainId: '',
    departure: '',
    arrival: '',
    route: '',
    platform: '',
    status: 'On Time' as 'On Time' | 'Scheduled' | 'Delayed' | 'Cancelled' | 'Running Late'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSchedule) {
      // Update existing schedule
      const updatedSchedules = schedules.map(schedule =>
        schedule.id === editingSchedule.id
          ? { ...schedule, ...formData }
          : schedule
      );
      setSchedules(updatedSchedules);
      setEditingSchedule(null);
    } else {
      // Add new schedule
      const newSchedule: Schedule = {
        id: `S${String(schedules.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setSchedules([...schedules, newSchedule]);
    }
    
    setFormData({ trainId: '', departure: '', arrival: '', route: '', platform: '', status: 'On Time' });
    setShowAddForm(false);
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      trainId: schedule.trainId,
      departure: schedule.departure,
      arrival: schedule.arrival,
      route: schedule.route,
      platform: schedule.platform,
      status: schedule.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (scheduleId: string) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
    setSchedules(updatedSchedules);
  };

  const resetForm = () => {
    setFormData({ trainId: '', departure: '', arrival: '', route: '', platform: '', status: 'On Time' });
    setEditingSchedule(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add Schedule'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Train ID</label>
                <input
                  type="text"
                  value={formData.trainId}
                  onChange={(e) => setFormData({ ...formData, trainId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                <input
                  type="text"
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  placeholder="e.g., 14:30 or 10:15+1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="e.g., 1, 2A, 3B"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'On Time' | 'Scheduled' | 'Delayed' | 'Running Late' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="On Time">On Time</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Running Late">Running Late</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Schedules Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Train ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {schedule.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.trainId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.departure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.arrival}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {schedules.length === 0 && (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">📅</span>
            <p className="text-gray-600">No schedules found</p>
            <p className="text-sm text-gray-500 mt-1">Add your first schedule to get started</p>
          </div>
        )}
      </div>

      {/* Schedule Analytics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
            <div className="text-sm text-gray-600">Total Schedules</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {schedules.filter(s => !s.arrival.includes('+')).length}
            </div>
            <div className="text-sm text-gray-600">Same Day Arrivals</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(schedules.map(s => s.route.split('-')[0])).size}
            </div>
            <div className="text-sm text-gray-600">Origin Stations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;