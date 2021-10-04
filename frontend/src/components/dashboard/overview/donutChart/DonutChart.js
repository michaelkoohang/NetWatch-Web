import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { values } from 'lodash';
import Lottie from 'react-lottie';
import campfire from '../../../../res/lottie/campfire.json'
import { colors } from '../../../../utils/dash';
import DashBlock from '../../dashBlock/DashBlock';
import './DonutChart.scss';

export default function DonutChart(props) {
  const campfireOptions = {
    loop: true,
    autoplay: true, 
    animationData: campfire
  };

  const data = {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: values(colors)
    }]
  };

  return (
    <DashBlock
      className='donut-chart' 
      loading={props.loading}
      animation={'fade'}
      children={
        props.data.length < 1 
        ?
        <div className='donut-error'>
          <div className='donut-error-animation'>
            <Lottie options={campfireOptions}/>
          </div>
          <h1 className='donut-error-title'>No Data</h1>
          <p className='donut-error-text'>There doesn't seem to be any data for this time frame!</p>
        </div>
        :
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true
          }}
        />
      }
    />
  );
}