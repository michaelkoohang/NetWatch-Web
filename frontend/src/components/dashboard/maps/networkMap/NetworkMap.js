import React, {useState, useEffect} from 'react';
import ReactMapGL, { Source, Layer, NavigationControl} from 'react-map-gl';
import { networkLayer } from '../Layers';
import { mapboxToken } from '../../../../utils/dash';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NetworkMap.scss';

export default function NetworkMap(props) {
  const [viewport, setViewport] = useState({});

  useEffect(() => {
    if (props.data.features.length > 0) {
      setViewport({
        longitude: props.data.features[0].geometry.coordinates[0],
        latitude: props.data.features[0].geometry.coordinates[1],
        zoom: 13,
        transitionDuration: 500
      });
    }
  }, [props]);

  function updateViewport(nextViewport) {
    setViewport(nextViewport)
  }

  return (
    <ReactMapGL
      {...viewport}
      className='network-map'
      width="100%"
      height="40vh"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={mapboxToken}
    >
      { props.data && 
        <Source 
          id='network-data'
          type='geojson' 
          data={props.data}
        >
          <Layer {...networkLayer} />
        </Source>
      }
      <div className='network-map-nav'>
        <NavigationControl />
      </div>
    </ReactMapGL>
  )
}