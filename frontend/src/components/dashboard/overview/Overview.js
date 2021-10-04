import React, { useEffect, useState } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import TotalCard from './totalCard/TotalCard';
import ClusterMap from '../maps/clusterMap/ClusterMap';
import LineChart from './lineChart/LineChart';
import DonutChart from './donutChart/DonutChart';
import { has, isNil, map, keys, values } from 'lodash';
import { dataTypes, timeFrames, binarySearchTime, getTimeScale, makeGeoJSONData } from '../../../utils/dash';
import './Overview.scss';

export default function Overview() {
  // Hook for time scale of data
  const [timeFrame, setTimeFrame] = useState(localStorage.getItem('current_time_frame'));

  // Hooks for data
  const [recordings, setRecordings] = useState([]);
  const [features, setFeatures] = useState([]);
  const [devices, setDevices] = useState([]);

  // Hooks for filtered data
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);

  // Hooks for line chart data
  const [recordingsOverTime, setRecordingsOverTime] = useState([]);
  const [featuresOverTime, setFeaturesOverTime] = useState([]);
  const [devicesOverTime, setDevicesOverTime] = useState([]);

  // Hooks for donut chart data
  const [carriers, setCarriers] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);

  // Hooks for showing/hiding loading indicators
  const [recordingsLoading, setRecordingsLoading] = useState(true);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [devicesLoading, setDevicesLoading] = useState(true);

  // Hooks for showing/hiding loading indicators on charts
  const [recordingChartsLoading, setRecordingChartsLoading] = useState(true);
  const [featureChartsLoading, setFeatureChartsLoading] = useState(true);
  const [deviceChartsLoading, setDeviceChartsLoading] = useState(true);

  const totals = {
    Recordings: {
      total: filteredRecordings.length,
      title: 'Recordings',
      color: 'green',
      loading: recordingsLoading
    },
    features: {
      total: filteredFeatures.length,
      title: 'features',
      color: 'blue',
      loading: featuresLoading
    },
    devices: {
      total: filteredDevices.length,
      title: 'devices',
      color: 'red',
      loading: devicesLoading
    }
  }

  useEffect(() => {
    const currentTimeFrame = localStorage.getItem('current_time_frame');
    if (currentTimeFrame === null) {
      setTimeFrame(timeFrames.ALL_TIME);
      localStorage.setItem('current_time_frame', timeFrames.ALL_TIME);
    }

    fetch('/api/dash/recordings')
      .then(response => response.json())
      .then(data => {
        map(data, (recording, i) => {
          data[i].timestamp = recording.start;
          delete data[i].start;
        });
        setRecordings(data);
        setFilteredRecordings(data);
        makeTimeData(data, dataTypes.RECORDINGS);
        setTimeout(() => {
          setRecordingsLoading(false);
          setRecordingChartsLoading(false);
        }, 500);
      });

    fetch('/api/dash/features')
      .then(response => response.json())
      .then(data => {
        setFeatures(data);
        setFilteredFeatures(data);
        makeTimeData(data, dataTypes.FEATURES);
        setTimeout(() => {
          setFeaturesLoading(false);
          setFeatureChartsLoading(false);
        }, 500);
      });

    fetch('/api/dash/devices')
      .then(response => response.json())
      .then(data => {
        setDevices(data); 
        setFilteredDevices(data);
        makeTimeData(data, dataTypes.DEVICES);
        setTimeout(() => {
          setDevicesLoading(false);
          setDeviceChartsLoading(false);
        }, 500);
      });
  }, []);

  // Whenever the time frame changes, we need to reconstruct the data
  // for the charts so they display properly. This effect is responsible
  // for listening to when the time frame changes and creating a new dataset
  // for each chart to reflect the data within that time frame.
  useEffect(() => {
    makeTimeData(recordings, dataTypes.RECORDINGS);
    makeTimeData(features, dataTypes.FEATURES);
    makeTimeData(devices, dataTypes.DEVICES);
    localStorage.setItem('current_time_frame', timeFrame);
  }, [recordings, features, devices, timeFrame]);

  useEffect(() => {
    makeCarrierData(filteredDevices);
    makeOperatingSystemData(filteredDevices);
  }, [filteredDevices]);

  // Creates data for time charts
  function makeTimeData(data, type) {
    let chartData = [];
    let filterData = [];
    let scale = getTimeScale(data, timeFrame);
    // Generate chart data template in the following format [{x: date, y: count}...] where x
    // is a JavaScript date and y is the count for the number of items timestamped on that
    // date's same day. The array will include all days between the specified time frame.
    for (var d = scale.start; d <= scale.end; d.setDate(d.getDate() + 1)) {
      let oldDate = new Date(d);
      let newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate());
      chartData.push({ x: newDate, y: 0 });
    }
    // Loop through each data item (Recording, feature, device) and increment the appropriate counter
    // for the corresponding date in the chartData array. This algorithm uses binary search
    // and runs in O(m log (n)) time where m is the number of items and n is the length of 
    // the chartData array.
    map(data, item => {
      let index = binarySearchTime(chartData, new Date(item.timestamp), 0, chartData.length - 1);
      if (index !== -1) {
        filterData.push(item);
        chartData[index].y++;
      } 
    });
    switch (type) {
      case dataTypes.RECORDINGS:
        setRecordingsOverTime(chartData);
        setFilteredRecordings(filterData);
        break;
      case dataTypes.FEATURES:
        setFeaturesOverTime(chartData);
        setFilteredFeatures(filterData);
        break;
      case dataTypes.DEVICES:
        setDevicesOverTime(chartData);
        setFilteredDevices(filterData);
        break;
      default:
        break;
    }
  }

  // Creates data for carrier donut chart
  function makeCarrierData(data) {
    let result = {};
    let seenCarriers = new Set();
    map(data, device => {
      if (has(seenCarriers, device.carrier)) {
        result[device.carrier]++;
      } else {
        result[device.carrier] = 1;
        seenCarriers.add(device.carrier);
      }
    });
    setCarriers(result);
  }

  // Creates data for operating system donut chart
  function makeOperatingSystemData(data) {
    let result = {
      Android: 0,
      iOS: 0,
      Unknown: 0
    };
    map(data, device => {
      if (isNil(device.manufacturer)) {
        result.Unknown++;
      } else if (device.manufacturer === 'Apple') {
        result.iOS++;
      } else {
        result.Android++;
      }
    });
    setOperatingSystems(result);
  }

  return (
    <div className="overview">
      <div className='overview-header'>
        <h1 className='overview-title'>Overview</h1>
        <Dropdown 
          text={timeFrame}
          icon='calendar'
          labeled
          button
          className='icon'
          >
          <Dropdown.Menu>
          { map(timeFrames, (time, i) => (
              <Dropdown.Item key={i} text={time} onClick={() => setTimeFrame(time)} />
            ))
          }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Grid className='overview-grid'>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <div className='overview-totals'>
              { map(totals, card => (
                  <TotalCard 
                    total={card.total} 
                    title={card.title} 
                    color={card.color} 
                    loading={card.loading}
                  />
                ))
              }
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <ClusterMap data={makeGeoJSONData(map(filteredRecordings, recording => recording.features[0]))}/>
          </Grid.Column>
        </Grid.Row>
        <h1 className='overview-heading'>Recordings</h1>
        <Grid.Row>
          <Grid.Column>
            <LineChart
              label='Recordings'
              data={recordingsOverTime}
              color={'#85C78C'}
              loading={recordingChartsLoading}
            />
          </Grid.Column>
        </Grid.Row>
        <h1 className='overview-heading'>Features</h1>
        <Grid.Row>
          <Grid.Column>
            <LineChart
              label='Features'
              data={featuresOverTime}
              color={'#509CFF'}
              loading={featureChartsLoading}
            />
          </Grid.Column>
        </Grid.Row>
        <h1 className='overview-heading'>Devices</h1>
        <Grid.Row>
          <Grid.Column>
            <LineChart
              label='Devices Registered'
              data={devicesOverTime}
              color={'#ff3b30'}
              loading={deviceChartsLoading}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <DonutChart
              labels={keys(carriers)}
              data={values(carriers)}
              loading={deviceChartsLoading}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <DonutChart
              labels={keys(operatingSystems)}
              data={values(operatingSystems)}
              loading={deviceChartsLoading}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}