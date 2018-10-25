import React, {Component} from 'react'
import Aux from '../../hoc/AuxFolder/lax';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
        Salad : 0.5,
        Bacon : 8,
        Meat  : 6,
        Cheese: 3
}


class BurgerBuilder extends Component {

    
    state = {
        ingredients : {
            Salad : 0,
            Bacon : 0,
            Meat  : 0,
            Cheese: 0
        },
        totalPrice : 3,
        purchasable : false,
        purchasing : false,
        loading : false
         
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.totalPrice
        const priceAddition = INGREDIENT_PRICES[type]
        const newPrice = oldPrice + priceAddition
        this.setState({ingredients : updatedIngredients, totalPrice : newPrice})
        this.purchasableHandler(updatedIngredients)
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        }
        const newCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.totalPrice
        const priceSubtraction = INGREDIENT_PRICES[type]
        const newPrice = oldPrice - priceSubtraction
        this.setState({ingredients : updatedIngredients, totalPrice : newPrice})
        this.purchasableHandler(updatedIngredients)
    }

    purchasableHandler = (ingredients) =>{
        
        const sum = Object.keys(ingredients).map(ingkey=>{
            return ingredients[ingkey]
        }).reduce((sum,el)=>{
            return sum+el
        },0)
        this.setState({purchasable:sum>0})
    }

    purchaseHandler=()=>{
        this.setState({purchasing : true})
    }
    modalHandler = () => {
        this.setState({purchasing : false})
    }
    purchaseContinueHandler=()=>{
       // alert('You will continue soon')
       this.setState({loading:true})
       const data = {
           ingredients : this.state.ingredients,
           price : this.state.totalPrice,
           customer : {
                    name : 'Shivam Sharma',
                    address : {
                        zipCode : 505050,
                        state : 'Delhi',
                        country : 'INDIA'
                    },
                    email : 'test-email.com'            
            },
            deliveryMethod : 'fastest'
        }

       axios.post('/orders.json', data)
       .then(response => {
          this.setState({loading:false})
          this.modalHandler()
       })
       .catch(error => {
        this.setState({loading:false})
        this.modalHandler()
       })
        
    }


    render(){
                const disabledInfo = {
                    ...this.state.ingredients
                }
                for(let key in disabledInfo){
                    disabledInfo[key] = disabledInfo[key] <= 0
                }

                let orderSummary = <OrderSummary 
                                        ingredients={this.state.ingredients}
                                        cancel={this.modalHandler}
                                        continue={this.purchaseContinueHandler}
                                        price={this.state.totalPrice}/>
                if(this.state.loading){
                   
                    orderSummary = <Spinner />
                } 
                
                
        return (
                <Aux>
                    <Modal  show={this.state.purchasing} modalClosed={this.modalHandler}>
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableOrNot={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                </Aux>
        )
    }

}

export default BurgerBuilder