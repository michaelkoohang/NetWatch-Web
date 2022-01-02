import React, { useEffect, useReducer, useRef } from 'react';
import { Checkbox, Dropdown, Icon, Table } from 'semantic-ui-react';
import { filter, keys, map, round, sortBy } from 'lodash';
import { CSVLink } from 'react-csv';
import { makeCSVData, makeJSONData } from '../../../../utils/dash';
import DashBlock from '../../dashBlock/DashBlock';
import './RecordingsHome.scss';

export default function RecordingsHome(props) {
  const initialState = {
    column: null,
    direction: null,
    allChecked: false,
    loading: true,
    data: []
  }

  const ACTIONS = {
    LOAD: 'load',
    SORT: 'sort',
    CHECK: 'check',
    CHECK_ALL: 'check_all'
  }

  const csvLink = useRef(null);
  const jsonLink = useRef(null);
  const [state, dispatch] = useReducer(recordingReduce, initialState);
  const OMITTED_HEADERS = new Set(['checked', 'features']);

  useEffect(() => {
    fetch('/api/dash/recordings')
      .then(response => response.json())
      .then(data => {
        map(data, recording => recording.checked = false);
        setTimeout(() => dispatch({ type: ACTIONS.LOAD, payload: data }), 500);
      });
  }, []);

  function recordingReduce(state, action) {
    switch (action.type) {
      case ACTIONS.LOAD:
        return {
          ...state,
          loading: false,
          data: action.payload
        }
      case ACTIONS.SORT:
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction: state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        }
        return {
          ...state,
          column: action.column,
          data: sortBy(state.data, [action.column]),
          direction: 'ascending',
        };
      case ACTIONS.CHECK:
        state.data[action.cellIndex].checked = action.checked;
        let allChecked = filter(state.data, {checked: true}).length === state.data.length;
        return {
          ...state,
          allChecked,
          data: state.data
        };
      case ACTIONS.CHECK_ALL:
        return {
          ...state,
          allChecked: action.checked,
          data: map(state.data, recording => {
            return {
              ...recording,
              checked: action.checked
            };
          })
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

  function selectRecording(data) {
    props.setRecordingDetails(data);
    props.showDetails(true);
  }

  function formatCell(val) {
    if (typeof(val) === 'number') {
      return round(val, 2);
    } else {
      return val;
    }
  }

  return (
    <div className='recordings-home'>
      <div className='recordings-home-header'>
        <h1 className='recordings-home-title'>Recordings</h1>
        <Dropdown
          text='Export'
          icon='angle down'
          labeled
          button
          disabled={filter(state.data, {checked: true}).length < 1}
          className='icon'
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => downloadCSV()}>
              <Icon name='table'/>CSV
              <CSVLink 
                className='export-csv' 
                data={ makeCSVData(filter(state.data, {checked: true})) } 
                download='netwatch-export.csv' 
                ref={csvLink} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => downloadJSON()}>
              <Icon name='code'/>JSON
              <a 
                className='export-json' 
                ref={jsonLink} 
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(makeJSONData(filter(state.data, {checked: true}))))}`} 
                download='netwatch-export.json'>
                  GeoJSON
              </a>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <DashBlock 
        loading={state.loading}
        animation={'fade up'}
        children={
          <div className='recordings-home-table-container'>
            <Table celled sortable selectable className='recordings-table'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Checkbox checked={state.allChecked} onChange={() => dispatch({ type: ACTIONS.CHECK_ALL, checked: !state.allChecked})}/>
                  </Table.HeaderCell>
                  { map(keys(state.data[0]), (key, i) => {
                      if (!OMITTED_HEADERS.has(key)) {
                        return <Table.HeaderCell 
                                  key={i}
                                  sorted={state.column === key ? state.direction : null}
                                  onClick={() => dispatch({ type: ACTIONS.SORT, column: key })}>
                                  {key}
                                </Table.HeaderCell>
                      }
                    })
                  }
                </Table.Row>
              </Table.Header>
              <Table.Body>
                { map(state.data, (recording, i) => {
                    return <Table.Row key={i} positive={state.data[i].checked}>
                      <Table.Cell>
                        <Checkbox 
                          checked={state.data[i].checked} 
                          onChange={() => dispatch({ type: ACTIONS.CHECK, cellIndex: i, checked: !state.data[i].checked})}
                        />
                      </Table.Cell>
                      { map(recording, (val, key) => {
                          if (!OMITTED_HEADERS.has(key)) {
                            return <Table.Cell 
                                    className='recordings-home-table-cell' 
                                    key={key} 
                                    onClick={() => selectRecording(recording)}>
                                      {formatCell(val)}
                                    </Table.Cell>
                          }
                        })
                      }
                    </Table.Row>
                  })
                }
              </Table.Body>
            </Table>
          </div>
        }
      />
    </div>
  )
}