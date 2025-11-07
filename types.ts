
export interface SolarDataPoint {
  date: string;
  sunspots: number;
  flares: number;
  windSpeed: number;
}

export enum Metric {
  SUNSPOTS = 'sunspots',
  FLARES = 'flares',
  WIND_SPEED = 'windSpeed',
}
