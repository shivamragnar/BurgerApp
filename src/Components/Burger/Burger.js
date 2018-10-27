import React from 'react'
import styles from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const Burger = (props) => {
    
   
            
    let transformedArray = Object.keys(props.ingredients)
    .map(ingkey =>{
        
        return [...Array(props.ingredients[ingkey])]
        .map( ( _ , index ) =>{ 
        return <BurgerIngredients key={ingkey + index} type={ingkey} />})
        }).reduce((accumulator,curr)=>{return accumulator.concat(curr)},[])
       
    if (transformedArray.length===0 ){
        transformedArray = <p>hey add some ingredients</p>
    }
   
      

    return(
            <div className = {styles.Burger}>
                <BurgerIngredients type = 'Bread-Top' />
                {transformedArray}
                <BurgerIngredients type = 'Bread-Bottom' />
            </div>

    )
}

export default Burger