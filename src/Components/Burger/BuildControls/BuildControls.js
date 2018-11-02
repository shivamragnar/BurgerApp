import React from 'react'
import styles from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
 
const controls = [
    { label : 'salad', type : 'salad'},
    { label : 'meat', type : 'meat'},
    { label : 'bacon', type : 'bacon'},
    { label : 'cheese', type : 'cheese'}
]

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Total Price : {props.price}</p>
        {controls.map((ctrl,index) =>(
            <BuildControl 
                key={ctrl.label + index } 
                label={ctrl.label} 
                addIng={()=>props.addIngredient(ctrl.type)} 
                removeIng={()=>props.removeIngredient(ctrl.type)}
                disable={props.disableOrNot[ctrl.type]}/>
        ) )}
        <button 
            className={styles.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Sign Up to Order' }</button>

    </div>
)

export default BuildControls
