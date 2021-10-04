import React from 'react';
import { Line } from 'react-chartjs-2';
import DashBlock from '../../dashBlock/DashBlock';
import './LineChart.scss';

export default function LineChart(props) {
  const data = {
    datasets: [{
      label: props.label,
      data: props.data,
      backgroundColor: 'rgba(0, 0, 0, 0.01)',
      borderColor: props.color,
      borderWidth: 2,
      radius: 0,
      hitRadius: 30,
      tension: 0
    }]
  };

  return (
    <DashBlock
      className='line-chart' 
      loading={props.loading}
      animation={'fade'}
      children={
        <Line
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  tooltipFormat: 'll',
                  unit: 'day',
                  displayFormats: {
                    'day': 'MMM DD'
                  }
                }
              }]
            }
          }}
        />
      }
    />
  );
}