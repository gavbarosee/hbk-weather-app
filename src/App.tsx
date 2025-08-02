import { useEffect } from 'react';
import './App.css';
import { weatherService } from './services/weatherService';

function App() {
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertsData = await weatherService.getActiveAlerts();
        console.log('Weather alerts response:', alertsData);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        const weekAlerts = await weatherService.getAlertsByDateRange(
          startDate,
          endDate
        );
        console.log('Week alerts:', weekAlerts);

        const alertDetails = await weatherService.getAlertById(
          'urn:oid:2.49.0.1.840.0.a6837c1eb77c1ef15c8c7423314cbbd8367e0504.001.1'
        );
        console.log(`Retrieved: ${alertDetails?.event || 'Alert not found'}`);
      } catch (error) {
        console.error('Error fetching weather alerts:', error);
      }
    };

    loadAlerts();
  }, []);

  return (
    <>
      <div>Weather app</div>
    </>
  );
}

export default App;
