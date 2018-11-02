import React, {Component} from 'react'
import Aux from '../../hoc/AuxFolder/lax';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'

import * as burgerBuilderActions from '../../store/action/index'




class BurgerBuilder extends Component {

    
    state = {
        
       
        purchasable : false,
        purchasing : false,
        
         
    }

    componentDidMount(){
       this.props.onInitIngredient()
    }


    // addIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type]
    //     const newCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = newCount
    //     const oldPrice = this.state.totalPrice
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({ingredients : updatedIngredients, totalPrice : newPrice})
    //     this.purchasableHandler(updatedIngredients)
    // }

    // removeIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0) {
    //         return
    //     }
    //     const newCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = newCount
    //     const oldPrice = this.state.totalPrice
    //     const priceSubtraction = INGREDIENT_PRICES[type]
    //     const newPrice = oldPrice - priceSubtraction
    //     this.setState({ingredients : updatedIngredients, totalPrice : newPrice})
    //     this.purchasableHandler(updatedIngredients)
    // }

    purchasableHandler = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(ingkey=>{
            return ingredients[ingkey]
        }).reduce((sum,el)=>{
            return sum+el
        },0)
        return sum>0
    }

    purchaseHandler=()=>{

        if(this.props.isAuthenticated)
        {this.setState({purchasing : true})}
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }
    modalHandler = () => {
        this.setState({purchasing : false})
    }
    purchaseContinueHandler=()=>{
        /*********************************Old Definition of the Function ************************************************/
        //   const orderParams = []
        //   for (let i in this.state.ingredients) {
        //       orderParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        //   }
        //   orderParams.push('totalPrice=' + this.state.totalPrice)
        //   const paramsData = orderParams.join('&')
        //   this.props.history.push({
        //       pathname : '/CheckOut',
        //       search :'?'+paramsData
        //   })
            this.props.onInitPurchase()
            this.props.history.push('/checkout')

    } 


    render(){
                const disabledInfo = {
                    ...this.props.ings
                }
                for(let key in disabledInfo){
                    disabledInfo[key] = disabledInfo[key] <= 0
                }

                let orderSummary = null
                let burger = this.props.error ?<p>Ingredients can not be displayed </p> : <Spinner />

                if(this.props.ings){

                    burger = (
                        <Aux>
                            <Burger ingredients={this.props.ings} />
                            <BuildControls 
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            disableOrNot={disabledInfo}
                            price={this.props.price}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}
                            purchasable={this.purchasableHandler(this.props.ings)}/>
                        </Aux>
                    )
                    orderSummary = <OrderSummary 
                                        ingredients={this.props.ings}
                                        cancel={this.modalHandler}
                                        continue={this.purchaseContinueHandler}
                                        price={this.props.price}/>
                    
                }
               
                
                
        return (
                <Aux>
                    <Modal  show={this.state.purchasing} modalClosed={this.modalHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
                   
                </Aux>
        )
    }

}

const mapStateToProps = state => {
    
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch (burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))