import React, { useEffect, useReducer, useRef } from 'react';
import { Button, Dropdown, Grid, Icon, Progress, Table } from 'semantic-ui-react';
import { keys, map, sortBy } from 'lodash';
import { CSVLink } from 'react-csv';
import NetworkMap from '../../maps/networkMap/NetworkMap';
import './RecordingDetail.scss';
import { 
  getRecordingDate, 
  getRecordingDescription, 
  getStopWatchTime, 
  makeGeoJSONData, 
  makeCSVData,
  makeJSONData,
  getConnectivity,
  getDistance
} from '../../../../utils/dash';

export default function RecordingDetail(props) {
  const initialState = {
    column: null,
    direction: null,
    data: {}
  }
  const ACTIONS = {
    LOAD: 'load',
    SORT: 'sort'
  }
  const csvLink = useRef(null);
  const jsonLink = useRef(null);
  const [state, dispatch] = useReducer(featureReduce, initialState);

  function featureReduce(state, action) {
    switch (action.type) {
      case ACTIONS.LOAD:
        return {
          ...state,
          data: action.payload
        }
      // This toggles the sort for whichever column is being clicked
      case ACTIONS.SORT:
        if (state.column === action.column) {
          return {
            ...state,
            data: {
              ...state.data,
              features: state.data.features.slice().reverse()
            },
            direction: state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        }
        return {
          ...state,
          column: action.column,
          data: {
            ...state.data,
            features: sortBy(state.data.features, [action.column])
          },
          direction: 'ascending',
        };
      default:
        throw new Error();
    }
  }

  function downloadCSV() {
    csvLink.current.link.click();
  }

  function downloadJSON() {
    jsonLink.current.click();
  }

  useEffect(() => {
    dispatch({type: ACTIONS.LOAD, payload: props.recordingDetails});
  }, [props])
  
  return (
    <div className="recordings-detail">
      <div className='recordings-detail-header'>
        <Button 
          icon 
          labelPosition='left'
          onClick={() => props.showDetails(false)}
        >
          <Icon name='left arrow' />
          Back
        </Button>
        <Dropdown
          text='Export'
          icon='angle down'
          labeled
          button
          className='icon'
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => downloadCSV()}>
              <Icon name='table' />
              CSV
              <CSVLink 
                className='export-csv' 
                data={ makeCSVData([state.data]) } 
                download='netwatch-export.csv' 
                ref={csvLink} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => downloadJSON()}>
              <Icon name='code' />
              JSON
              <a 
                className='export-json' 
                ref={jsonLink} 
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(makeJSONData([state.data])))}`} 
                download='netwatch-export.json'>
              </a>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='recording-info'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3 className='recording-info-date'>{getRecordingDate(state.data.start, state.data.end)}</h3>
              <h1 className='recording-info-description'>{getRecordingDescription(state.data.start)}</h1>
              { state.data.features &&
                <Progress 
                  className='recording-info-connectivity' 
                  percent={getConnectivity(state.data.features)} 
                  color={getConnectivity(state.data.features) >= 50 ? 'green' : 'red'} 
                  progress 
                />
              }
              <h4 className='recording-info-label'>connectivity</h4>
              <div className='recording-info-meta'>
                <div>
                  <h3 className='recording-info-meta-value'>{getDistance(state.data.distance)}</h3>
                  <h4 className='recording-info-label'>distance</h4>
                </div>
                <div>
                  <h3 className='recording-info-meta-value'>{getStopWatchTime(state.data.duration)}</h3>
                  <h4 className='recording-info-label'>time</h4>
                </div>
                <div>
                  <h3 className='recording-info-meta-value'>{state.data.carrier}</h3>
                  <h4 className='recording-info-label'>carrier</h4>
                </div>
                <div>
                  <Icon 
                    className='recording-info-device-icon' 
                    name={state.data.manufacturer === 'Apple' ? 'apple' : 'android'}
                    color='black'
                  />
                  <h4 className='recording-info-label'>device</h4>
                </div> 
                <div>
                  <h3 className='recording-info-meta-value'>{state.data.os}</h3>
                  <h4 className='recording-info-label'>os</h4>
                </div>  
                <div>
                  <h3 className='recording-info-meta-value'>{state.data.manufacturer}</h3>
                  <h4 className='recording-info-label'>manufacturer</h4>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column className='network-map'>
              <NetworkMap data={makeGeoJSONData(state.data.features)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='recordings-detail-table-container'>
                <Table celled sortable selectable className='features-table'>
                  <Table.Header>
                    <Table.Row>
                      { state.data.features &&
                        map(keys(state.data.features[0]), (val, i) => {
                          return <Table.HeaderCell 
                                    key={i}
                                    sorted={state.column === val ? state.direction : null}
                                    onClick={() => dispatch({ type: ACTIONS.SORT, column: val })}>
                                    {val}
                                  </Table.HeaderCell>
                        })
                      }
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { state.data.features &&
                      map(state.data.features, (feature, i) => {
                        return <Table.Row key={i} positive={feature.http === 1} negative={feature.http === 0}>
                          { map(feature, (val, key) => {
                              return <Table.Cell key={key}>{val}</Table.Cell>
                            })
                          }
                        </Table.Row>
                      })
                    }
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}