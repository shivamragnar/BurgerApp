import React, {Component} from 'react'
import Aux from '../../../hoc/AuxFolder/lax'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('[OrderSummary] is updated')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingkey=>{
            return (<li key={ingkey}><span style={{textTransform:"capitalize"}}>{ingkey} </span>: {this.props.ingredients[ingkey]}</li>)
        })

        return(
            <Aux>
                <h3>Hii...You have selected a Delicious Order</h3>
                <p>Here are the ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Amount : {this.props.price}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
            </Aux>

        )
    }
} 

export default OrderSummary