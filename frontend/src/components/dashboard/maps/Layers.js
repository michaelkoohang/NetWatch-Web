
const networkLayer = {
  id: 'network-layer',
  type: 'circle',
  source: 'features',
  paint: {
    'circle-color': [
      'case',
      ['==', ['get', 'http'], 1], '#509CFF',
      ['==', ['get', 'http'], 0], '#ff3b30',
      '#fff'
    ],
    'circle-radius': 4,
    'circle-stroke-color': '#fff',
    'circle-stroke-width': 1,
  },
}

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'features',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#85C78C', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'features',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'features',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#85C78C',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

export { networkLayer, clusterLayer, clusterCountLayer, unclusteredPointLayer };