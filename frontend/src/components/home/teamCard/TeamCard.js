import React from 'react'
import { Icon } from 'semantic-ui-react'
import './TeamCard.scss';

export default function TeamCard(props) {
  return (
    <div className="team-card">
      <img src={props.src} className="team-headshot" alt={props.alt}/>
      <h1 className="team-name">{props.name}</h1>
      <h4 className="team-position">{props.position}</h4>
      <h6 className="team-affiliation">{props.affiliation}</h6>
      <a className="team-email" href={"mailto:" + props.email}><Icon name="envelope"/>Email</a>
    </div>
  )
}