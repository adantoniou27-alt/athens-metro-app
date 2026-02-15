import axios from 'axios';
import * as cheerio from 'cheerio';

const ATHENS_METRO_URL = 'https://www.stasy.gr/'; // Athens Public Transport Authority

// Fetch metro stations and lines data
export const fetchMetroData = async () => {
  try {
    const response = await axios.get(ATHENS_METRO_URL);
    const $ = cheerio.load(response.data);

    // Mock data structure - in production, parse actual HTML
    const stations = [
      { id: 1, name: 'Syntagma', latitude: 37.9753, longitude: 23.7329, line: 'Line 3 (Blue)' },
      { id: 2, name: 'Omonia', latitude: 37.9855, longitude: 23.7275, line: 'Line 2 (Red)' },
      { id: 3, name: 'Monastiraki', latitude: 37.9743, longitude: 23.7246, line: 'Line 1 (Green)' },
      { id: 4, name: 'Acropoli', latitude: 37.9706, longitude: 23.7258, line: 'Line 2 (Red)' },
      { id: 5, name: 'Katehaki', latitude: 37.9838, longitude: 23.7275, line: 'Line 3 (Blue)' },
    ];

    const lines = [
      { id: 1, name: 'Line 1 (Green)', color: '#00AA00', stations: [1, 3] },
      { id: 2, name: 'Line 2 (Red)', color: '#CC0000', stations: [2, 4] },
      { id: 3, name: 'Line 3 (Blue)', color: '#0066FF', stations: [1, 5] },
    ];

    return { stations, lines };
  } catch (error) {
    console.error('Error fetching metro data:', error);
    throw error;
  }
};

// Get real-time train information for a station
export const getRealtimeInfo = async (stationId) => {
  try {
    // Mock real-time data
    const trains = [
      { line: 'Line 3 (Blue)', destination: 'Agia Marina', minutesUntilArrival: 3 },
      { line: 'Line 3 (Blue)', destination: 'Agia Marina', minutesUntilArrival: 8 },
      { line: 'Line 3 (Blue)', destination: 'Agia Marina', minutesUntilArrival: 13 },
    ];

    return { trains };
  } catch (error) {
    console.error('Error fetching real-time info:', error);
    throw error;
  }
};

// Get detailed information about a specific station
export const getStationDetails = async (stationId) => {
  try {
    // Mock station details
    const details = {
      lines: ['Line 3 (Blue)'],
      wheelchairAccess: true,
      lift: true,
      escalator: true,
      amenities: ['Ticket Machines', 'Restrooms', 'Food Services'],
    };

    return details;
  } catch (error) {
    console.error('Error fetching station details:', error);
    throw error;
  }
};

// Calculate route between two stations using Dijkstra's algorithm
export const calculateRoute = async (startStationName, endStationName) => {
  try {
    // Fetch all metro data
    const { stations, lines } = await fetchMetroData();

    // Find start and end stations
    const startStation = stations.find(s => s.name.toLowerCase() === startStationName.toLowerCase());
    const endStation = stations.find(s => s.name.toLowerCase() === endStationName.toLowerCase());

    if (!startStation || !endStation) {
      throw new Error('One or both stations not found');
    }

    // Simple route calculation (mock)
    const routeStations = [startStation, endStation];
    const duration = Math.abs(startStation.id - endStation.id) * 3; // Mock duration calculation

    return {
      stations: routeStations,
      duration,
      lines: ['Line 3 (Blue)'], // Mock line info
    };
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};

// Scrape station accessibility information
export const scrapeAccessibilityInfo = async () => {
  try {
    const response = await axios.get(`${ATHENS_METRO_URL}/en/stations`);
    const $ = cheerio.load(response.data);

    const accessibilityData = [];
    $('table.stations').each((index, element) => {
      const stationName = $(element).find('td.station-name').text();
      const wheelchairAccess = $(element).find('td.wheelchair').text() === 'Yes';
      const lift = $(element).find('td.lift').text() === 'Yes';
      const escalator = $(element).find('td.escalator').text() === 'Yes';

      accessibilityData.push({
        name: stationName,
        wheelchairAccess,
        lift,
        escalator,
      });
    });

    return accessibilityData;
  } catch (error) {
    console.error('Error scraping accessibility info:', error);
    throw error;
  }
};

// Scrape timetable information
export const scrapeTimetables = async (stationId) => {
  try {
    const response = await axios.get(`${ATHENS_METRO_URL}/en/station/${stationId}`);
    const $ = cheerio.load(response.data);

    const timetables = [];
    $('table.timetable tr').each((index, element) => {
      const time = $(element).find('td.time').text();
      const destination = $(element).find('td.destination').text();
      const line = $(element).find('td.line').text();

      if (time && destination) {
        timetables.push({ time, destination, line });
      }
    });

    return timetables;
  } catch (error) {
    console.error('Error scraping timetables:', error);
    throw error;
  }
};