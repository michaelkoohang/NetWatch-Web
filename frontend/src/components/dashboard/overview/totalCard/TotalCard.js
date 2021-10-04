import React from 'react';
import DashBlock from '../../dashBlock/DashBlock';
import './TotalCard.scss';

export default function TotalCard(props) {

  function formatNumber(num) {
    if (num < 1000) {
      return num
    } else if (num < 1000000) {
      let numString = `${num}`
      let newNum = parseInt(numString.slice(0, numString.length - 3));
      return `${newNum}K`
    } else if (num < 1000000000) {
      let numString = `${num}`
      let newNum = parseInt(numString.slice(0, numString.length - 6));
      return `${newNum}M`
    }
  }
  
  return (
    <DashBlock
      className='total-card' 
      loading={props.loading}
      animation={'fade left'}
      children={
        <div>
          <h1 className={'total-card-num ' + props.color}>
            {formatNumber(props.total)}
          </h1>
          <h5 className='total-card-title'>{props.title}</h5>
        </div>
      }
    />
  );
}