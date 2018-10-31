import React from 'react'
import styles from './Input.css'


const Input = (props) =>{
    let inputElement = null
    let classes = [styles.InputElement]
    if(props.invalid && props.shouldValidate && props.touched ){
        classes.push(styles.Invalid)
    }
    

    switch(props.elementtype){
        case('input'):
            inputElement = <input 
            className={classes.join(' ')} 
            {...props.elementConfig}  
            value={props.value}
            onChange={props.change} />
        break
        case('textarea'):
            inputElement = <textarea 
            className={classes.join(' ')} 
            {...props.elementConfig}  
            value={props.value}
            onChange={props.change} />
        break
        case('select'):
            inputElement = (<select 
            className={classes.join(' ')} 
            value={props.value}
            onChange={props.change} >
            {props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}
                
            </select>)
        break
        default:
            inputElement = <input 
            className={classes.join(' ')} 
            {...props.elementConfig}  
            value={props.value} />
       
    }

    return(
        <div className={styles.Input}>
        <label className={styles.Label}>{props.label}</label>
        {inputElement}
        </div>
    )
}
export default Input