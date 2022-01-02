import React, { useEffect, useState } from 'react'
import { map } from 'lodash';
import { Transition } from 'semantic-ui-react';
import netwatchRecord from '../../res/img/app/netwatch-record-ss.png';
import netwatchRecordings from '../../res/img/app/netwatch-recordings-ss.png';
import netwatchDetail from '../../res/img/app/netwatch-detail-ss.png';
import './Screenshots.scss';

export default function Screenshots() {

  const [currentImage, setCurrentImage] = useState(0);
  const images = [netwatchRecord, netwatchRecordings, netwatchDetail];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage === 2) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
    }, 7000);
    return () => {
      clearInterval(interval);
    }
  }, [currentImage]);

  return (
    <div className='screenshots'>
      { map((images), (img, i) => (
          <Transition visible={currentImage === i} animation='fade up' duration={700}>
            <div className='screenshot-container'>
              <img src={img} key={i} className="screenshot-photos" alt="NetWatch screenshot"/>
            </div>
          </Transition>
        ))
      }
    </div>
  )
}


