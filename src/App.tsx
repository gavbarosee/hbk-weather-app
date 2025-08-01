import { useEffect } from 'react';
import './App.css';
import { fetchWeatherAlerts } from './services/weatherService';

function App() {
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertsData = await fetchWeatherAlerts();
        console.log('Weather alerts response:', alertsData);
        console.log(`${alertsData.features.length} alerts`);
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
