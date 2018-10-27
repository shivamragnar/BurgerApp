import React from 'react'
import styles from './Order.css'

const Order = (props) => {
    let ingredients =[]
    for (let ingName in props.ingredients) {
        ingredients.push(
            {
                name : ingName,
                amount : props.ingredients[ingName]
            }
        )
    }
    let ingOutput = ingredients.map(ig=>{
        return( <span 
                    style={{
                        textTransform:'capitalize',
                        margin: '0 5px',
                        padding:'5px',
                        border : '1px solid #eee',
                        boxSizing:'border-box'
                    }}
                    key={ig.name}>
            {ig.name} ({ig.amount}) </span>)
    })
    return(
        <div className={styles.Order}>
        <p>Ingredients: {ingOutput}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
    </div>
    )
    
}


export default Order
