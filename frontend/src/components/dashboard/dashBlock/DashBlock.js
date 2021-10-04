import React from 'react'
import { Loader, Transition } from 'semantic-ui-react'

export default function DashBlock(props) {
  return (
    <div className={props.className}>
      <Transition visible={props.loading} animation='fade' duration={500}>
        <Loader />
      </Transition>
      <Transition visible={!props.loading} animation={props.animation} duration={500}>
        {props.children}
      </Transition>
    </div>
  )
}
