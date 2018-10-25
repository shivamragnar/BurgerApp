import React from 'react'
import styles from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
 
const controls = [
    { label : 'Salad', type : 'Salad'},
    { label : 'Meat', type : 'Meat'},
    { label : 'Bacon', type : 'Bacon'},
    { label : 'Cheese', type : 'Cheese'}
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
            onClick={props.ordered}>Order Now</button>

    </div>
)

export default BuildControls
