import * as actionTypes from '../action/actionTypes'
import {updateObject} from '../utility'
import { purchaseBurgerStart } from '../action/order';

const initialState = {
    orders : [],
    loading : false,
    purchasing : false

}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchasing : false})
}

const purchseBurgerStart = (state, action) => {
    return updateObject(state, {loading : true})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(state, { ...action.orderData, id : action.orderId})
        const updatedState = {
            orders : state.orders.concat(newOrder),
            loading : false,
            purchasing : true   
        }
    return updateObject(state, updatedState)   
}

const purchaseBurgerFail = (state, action) => {
   
    return updateObject(state, {loading : false})
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {loading : true})
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { 
        orders : action.orders,
        loading : false})
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {loading : false})
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.PURCHASE_INIT : return purchaseInit(state, action)
        
        
        case actionTypes.PURCHASE_BURGER_START : return purchaseBurgerStart(state, action)
       
        
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action)
        

        case actionTypes.PURCHASE_BURGER_FAIL : return purchaseBurgerFail(state, action)
               

        case actionTypes.FETCH_ORDER_START : return fetchOrderStart(state, action)
       
         
        case actionTypes.FETCH_ORDER_SUCCESS : return fetchOrderSuccess(state, action)
       
           
        case actionTypes.FETCH_ORDER_FAIL : return fetchOrderFail(state, action)
        
         
        default : return { ...state }
    }
}

export default reducer