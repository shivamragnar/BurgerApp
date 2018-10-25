import React from 'react'
import styles from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const Burger = (props) => {
    console.log(props.ingredients)
    console.log(Object.keys(props.ingredients)
    .map(ingkey =>{
        console.log("converting into array",props.ingredients[ingkey],ingkey,[...Array(props.ingredients[ingkey])])
        return [...Array(props.ingredients[ingkey])]}))
            
    let transformedArray = Object.keys(props.ingredients)
    .map(ingkey =>{
        console.log("converting into array",props.ingredients[ingkey],ingkey,[...Array(props.ingredients[ingkey])])
        return [...Array(props.ingredients[ingkey])]
        .map( ( _ , index ) =>{ 
        return <BurgerIngredients key={ingkey + index} type={ingkey} />})
        }).reduce((accumulator,curr)=>{return accumulator.concat(curr)},[])
        console.log("transformed array",transformedArray) 
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