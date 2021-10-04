import { filter, keys, min, max, map, round, values } from 'lodash';

// Data categories for overview page
const dataTypes = { 
  RECORDINGS: "recordings",
  FEATURES: "features",
  DEVICES: "devices"
};

// Time frames for overview page
const timeFrames = {
  ALL_TIME: "All Time",
  SIX_MONTHS: "6 Months",
  THREE_MONTHS: "3 Months",
  MONTH: "1 Month",
  WEEK: "7 days"
};

// Colors for donut chart
const colors = {
  yellow: "#ffd700",
  mango: "#ffb14e",
  orange: "#fa8775",
  salmon: "#ea5f94",
  magenta: "#cd34b5",
  violet: "#9d02d7",
  blue: "#0000ff"
};

// API token for Mapbox maps on the overview and recordings pages
const mapboxToken = 'pk.eyJ1IjoibWljaGFlbGtvb2hhbmciLCJhIjoiY2tra29wMzMxMTZ2cTJucWtzbHgxd2oxYSJ9.JXrEwzOxZkKEDeyby75yLQ'

// Binary search algorithm for creating temporal recordings data.
// This algorithm takes the temporal dataset and the recording in question as input.
// The (sorted) temporal dataset is just an array of dates based on the time scale selected by the user.
// The algorithm searches the array for the date that matches the date of the item in question and
// increments the counter for that date. This is how the data is generated for the line charts.
function binarySearchTime(data, item, low, high) {
  if (high < low) return -1;

  let mid = Math.floor((high + low) / 2);

  let itemDate = new Date(item);
  itemDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());

  let dataDate = new Date(data[mid].x);
  dataDate = new Date(dataDate.getFullYear(), dataDate.getMonth(), dataDate.getDate());

  if (+itemDate === +dataDate) return mid;

  if (+itemDate > +dataDate) {
    return binarySearchTime(data, item, mid+1, high);
  } else {
    return binarySearchTime(data, item, low, mid-1);
  }
};

// Returns an object with a start and end date based on the time frame selected by the user.
function getTimeScale(data, timeFrame) {
  let start;
  let end;
  switch (timeFrame) {
    case timeFrames.ALL_TIME:
      start = new Date(min(map(data, 'timestamp')));
      start.setDate(start.getDate() - 3);
      end = new Date(max(map(data, 'timestamp')));
      end.setDate(end.getDate() + 3);
      break;
    case timeFrames.SIX_MONTHS:
      end = new Date();
      start = new Date();
      start.setMonth(start.getMonth() - 6);
      start.setDate(start.getDate() + 1);
      break;
    case timeFrames.THREE_MONTHS:
      end = new Date();
      start = new Date();
      start.setMonth(start.getMonth() - 3);
      start.setDate(start.getDate() + 1);
      break;
    case timeFrames.MONTH:
      end = new Date();
      start = new Date();
      start.setMonth(start.getMonth() - 1);
      start.setDate(start.getDate() + 1);
      break;
    case timeFrames.WEEK:
      end = new Date();
      start = new Date();
      start.setDate(start.getDate() - 6);
      break;
    default:
      return { start: 'null', end: 'null' };
  }
  return { start, end };
};

// Creates CSV data for exporting
function makeCSVData(data) {
  if (data.length > 0) {
    if (keys(data[0]).length > 0) {
      let recordingHeaders = map(keys(data[0]), header => {
        if (header !== 'checked' && header !== 'features') {
          return header
        }
      });
      let featureHeaders = keys(data[0].features[0]);
      let recordings = [];
      let features = [];
  
      map(data, recording => {
        const {features, checked, ...newRecording} = recording;
        recordings.push(values(newRecording));
      });
      map(data, recording => {
        map(recording.features, feature => {
          features.push(values(feature));
        });
      });
      return [
        recordingHeaders,
        ...recordings,
        [[]],
        featureHeaders,
        ...features
      ];
    }
  }
  return [];
}

// Creates JSON data for exporting
function makeJSONData(data) {
  if (data.length > 0) {
    if (keys(data[0]).length > 0) {
      let recordings = [];
      map(data, recording => {
        const {checked, ...newRecording} = recording;
        recordings.push(newRecording);
      });
      return recordings;
    }
  }
  return [];
}

// Creates GeoJSON data for the maps
function makeGeoJSONData(data) {
  let result = {
    type: 'FeatureCollection',
    features: []
  };
  map(data, (feature, i) => {
    result.features.push(
      {
        id: i,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [feature.lon, feature.lat]
        },
        properties: {
          http: feature.http
        }
      }
    )
  });
  return result;
}

// Creates a description for a recording based on its start date
function getRecordingDescription(date) {
  date = new Date(date);
  let weekdayString;
  let timeOfDayString;
  let weekday = date.getDay();
  let timeOfDay = date.getHours();

  switch (weekday) {
    case 0:
      weekdayString = 'Sunday';
      break;
    case 1:
      weekdayString = 'Monday';
      break;
    case 2:
      weekdayString = 'Tuesday';
      break;
    case 3:
      weekdayString = 'Wednesday';
      break;
    case 4:
      weekdayString = 'Thursday';
      break;
    case 5:
      weekdayString = 'Friday';
      break;
    case 6:
      weekdayString = 'Saturday';
      break;
    default:
      break;
  }

  if (timeOfDay < 12) {
    timeOfDayString = 'Morning';
  } else if (timeOfDay < 18) {
    timeOfDayString = 'Afternoon';
  } else {
    timeOfDayString = 'Evening';
  }

  return `${weekdayString} ${timeOfDayString} recording`;
}

// Creates a stopwatch time based on the number of elapsed seconds
function getStopWatchTime(duration) {
  let seconds = Math.floor(duration % 60)
  let minutes = Math.floor(duration % 3600 / 60)
  let hours = Math.floor(duration / 3600)

  if (hours > 0) {
      return `${hours.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
  }
  return `${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
}

// Creates a pretty date string for a recording
function getRecordingDate(start, end) {
  return `${new Date(start).toLocaleDateString()} | ${new Date(start).toLocaleTimeString()} - ${new Date(end).toLocaleTimeString()}`
}

// Gets connectivity for a recording
function getConnectivity(features) {
  let connected = filter(features, feature => feature.http === 1).length
  return round(connected / features.length * 100);
}

// Gets a string for the distance of a recording
function getDistance(val) {
  return `${round(val, 2)} km`
}

export { 
  dataTypes, 
  timeFrames, 
  colors, 
  mapboxToken,
  binarySearchTime, 
  getTimeScale, 
  makeCSVData, 
  makeJSONData,
  makeGeoJSONData,
  getRecordingDescription,
  getStopWatchTime,
  getRecordingDate,
  getConnectivity,
  getDistance
};