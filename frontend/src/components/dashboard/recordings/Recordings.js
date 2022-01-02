import React, { useState } from 'react';
import { Transition } from 'semantic-ui-react';
import RecordingsHome from './recordingsHome/RecordingsHome';
import RecordingsDetail from './recordingsDetail/RecordingsDetail';
import './Recordings.scss';

export default function Recordings() {
  const [recordingDetails, setRecordingDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="recordings">
      <Transition visible={!showDetails} animation='fade left' duration={500}>
        <div className='recordings-container'>
          <RecordingsHome showDetails={setShowDetails} setRecordingDetails={setRecordingDetails} />
        </div>
      </Transition>
      <Transition visible={showDetails} animation='fade left' duration={500}>
        <div className='recordings-container'>
          <RecordingsDetail showDetails={setShowDetails} recordingDetails={recordingDetails}/>
        </div>
      </Transition>
    </div>
  );
}