import React, { useRef,useState } from 'react';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from '../Layers';
import { mapboxToken } from '../../../../utils/dash';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ClusterMap.scss';

export default function ClusterMap(props) {
  const mapRef = useRef(null);
  const usCenter = {lat: 39.85746, lon: -95.281763}
  const [viewport, setViewport] = useState({
    latitude: usCenter.lat,
    longitude: usCenter.lon,
    zoom: 3
  });

  function _onClick(event) {
    if (event.features.length === 0) {
      return;
    }

    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;
    const mapboxSource = mapRef.current.getMap().getSource('features');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }
      setViewport({
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
      });
    });
  };

  function updateViewport(nextViewport) {
    setViewport(nextViewport)
  }

  return (
    <ReactMapGL
      {...viewport}
      className='cluster-map'
      width="100%"
      height="45vh"
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={mapboxToken}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={_onClick}
      ref={mapRef}
    >
        <Source 
          id='features'
          type='geojson' 
          data={props.data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      <div className='cluster-map-nav'>
        <NavigationControl />
      </div>
    </ReactMapGL>
  )
}