import React, {Component} from 'react'
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/action/index'
import {connect } from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component {

   

    componentDidMount(){
        this.props.onfetchOrders(this.props.token, this.props.userId)
    }

        render(){
            let order = <Spinner />
            if(!this.props.loading) {
                order = this.props.orders.map(order => (  
                                                        <Order 
                                                            key={order.id}          
                                                            price={order.price} 
                                                            ingredients={order.ingredients}/>))
            }
            return(
                <div>
                   {order}
                </div>
            )
        }
}

const mapStateToProps = (state) => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders : (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios))