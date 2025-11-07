
import { SolarDataPoint } from '../types';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateMockData(startDate: Date, endDate: Date): SolarDataPoint[] {
  if (startDate > endDate) {
    throw new Error('Start date cannot be after end date.');
  }

  const data: SolarDataPoint[] = [];
  let currentDate = new Date(startDate);
  
  let sunspotBase = 50 + Math.random() * 50;
  let flareBase = 2 + Math.random() * 5;
  let windBase = 400 + Math.random() * 100;

  while (currentDate <= endDate) {
    sunspotBase += (Math.random() - 0.5) * 10;
    if (sunspotBase < 0) sunspotBase = 0;
    
    flareBase += (Math.random() - 0.45) * 2;
    if (flareBase < 0) flareBase = 0;

    windBase += (Math.random() - 0.5) * 20;
    if (windBase < 300) windBase = 300;

    data.push({
      date: formatDate(currentDate),
      sunspots: Math.round(sunspotBase + Math.sin(currentDate.getTime() / 86400000 * Math.PI/14) * 20),
      flares: Math.round(flareBase + (Math.random() > 0.9 ? Math.random() * 10 : 0)),
      windSpeed: Math.round(windBase + Math.sin(currentDate.getTime() / 86400000 * Math.PI/7) * 50),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}
