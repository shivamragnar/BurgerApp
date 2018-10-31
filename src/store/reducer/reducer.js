import * as actionTypes from '../action/actionTypes'

const initialState = {
    
    ingredients : {
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0,
    },
    totalPrice : 3,
}
const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 8,
    meat  : 6,
    cheese: 3
}

const reducer = (state =  initialState, action) => {

    switch(action.type){

        case actionTypes.ADD_INGREDIENT :
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        }

        case actionTypes.REMOVE_INGREDIENT :
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        }

        default :
        return state

    }

}

export default reducer