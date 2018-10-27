import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckOutSummary.css'


const CheckOutSummary = (props) =>{

    return(
        <div className={styles.CheckOutSummary}>
            <h1>Hi this is your order</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.success}>SUCCESS</Button>
        </div>
    )
}

export default CheckOutSummary