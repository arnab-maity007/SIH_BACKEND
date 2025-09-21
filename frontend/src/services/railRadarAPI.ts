// Mock Rail Radar API Integration
// This demonstrates how the system could integrate with real train data APIs

interface RailRadarTrain {
  train_id: string;
  train_name: string;
  route: string;
  current_position: {
    station: string;
    coordinates: [number, number];
  };
  next_station: string;
  status: 'ON_TIME' | 'DELAYED' | 'RUNNING_LATE';
  current_speed: number;
  delay_minutes: number;
  passenger_count: number;
  total_capacity: number;
  platform: string;
  train_type: string;
}

interface RailRadarResponse {
  trains: RailRadarTrain[];
  timestamp: string;
  total_trains: number;
}

class RailRadarAPI {
  private baseUrl = 'https://api.railradar.in/v1'; // Hypothetical API
  private apiKey = process.env.RAIL_RADAR_API_KEY;

  async getActiveTrains(): Promise<RailRadarResponse> {
    // Mock implementation - in real scenario, this would fetch from actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          trains: [
            {
              train_id: '12345',
              train_name: 'Rajdhani Express',
              route: 'New Delhi - Mumbai Central',
              current_position: {
                station: 'Mathura Junction',
                coordinates: [27.4924, 77.6737]
              },
              next_station: 'Agra Cantt',
              status: 'ON_TIME',
              current_speed: 130,
              delay_minutes: 0,
              passenger_count: 1020,
              total_capacity: 1200,
              platform: '2',
              train_type: 'SUPERFAST'
            },
            {
              train_id: '22691',
              train_name: 'Vande Bharat Express',
              route: 'New Delhi - Varanasi',
              current_position: {
                station: 'Kanpur Central',
                coordinates: [26.4499, 80.3319]
              },
              next_station: 'Lucknow',
              status: 'ON_TIME',
              current_speed: 160,
              delay_minutes: 0,
              passenger_count: 1072,
              total_capacity: 1128,
              platform: '1',
              train_type: 'SEMI_HIGH_SPEED'
            },
            // More trains would be fetched from the real API
          ],
          timestamp: new Date().toISOString(),
          total_trains: 2
        });
      }, 1000); // Simulate API delay
    });
  }

  async getTrainDetails(trainId: string): Promise<RailRadarTrain | null> {
    // Mock implementation for fetching specific train details
    const allTrains = await this.getActiveTrains();
    return allTrains.trains.find(train => train.train_id === trainId) || null;
  }

  // Transform Rail Radar data to our internal format
  transformToInternalFormat(railRadarTrain: RailRadarTrain) {
    return {
      id: railRadarTrain.train_id,
      name: railRadarTrain.train_name,
      route: railRadarTrain.route,
      status: this.mapStatus(railRadarTrain.status),
      currentLocation: railRadarTrain.current_position.station,
      nextStation: railRadarTrain.next_station,
      speed: railRadarTrain.current_speed,
      capacity: railRadarTrain.total_capacity,
      occupancy: Math.round((railRadarTrain.passenger_count / railRadarTrain.total_capacity) * 100),
      delay: railRadarTrain.delay_minutes,
      type: this.mapTrainType(railRadarTrain.train_type),
      platform: railRadarTrain.platform
    };
  }

  private mapStatus(status: RailRadarTrain['status']): string {
    switch (status) {
      case 'ON_TIME': return 'On Time';
      case 'DELAYED': return 'Delayed';
      case 'RUNNING_LATE': return 'Running Late';
      default: return 'Unknown';
    }
  }

  private mapTrainType(type: string): string {
    switch (type) {
      case 'SUPERFAST': return 'Superfast';
      case 'EXPRESS': return 'Express';
      case 'SEMI_HIGH_SPEED': return 'Semi High Speed';
      case 'MAIL_EXPRESS': return 'Mail Express';
      default: return 'Local';
    }
  }
}

// Usage example in the main application:
/*
const railRadarAPI = new RailRadarAPI();

// In your train service:
export const fetchLiveTrainData = async () => {
  try {
    const railRadarData = await railRadarAPI.getActiveTrains();
    return railRadarData.trains.map(train => railRadarAPI.transformToInternalFormat(train));
  } catch (error) {
    console.error('Failed to fetch from Rail Radar API:', error);
    // Fallback to static data
    return getStaticTrainData();
  }
};
*/

export default RailRadarAPI;