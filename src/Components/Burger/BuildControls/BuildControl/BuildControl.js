import React from 'react'
import classes from './BuildControl.css'

const BuildControl = (props) => (
 <div className={classes.BuildControl}>
    <div className={classes.label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removeIng} disabled={props.disable}>Less</button>
    <button className={classes.More} onClick={props.addIng}>More</button>
 </div>
)

export default BuildControl