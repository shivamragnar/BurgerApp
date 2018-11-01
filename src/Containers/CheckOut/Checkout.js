import React, {Component} from 'react'
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action/index'

class CheckOut extends Component {

   

    cancelButtonHandler = () =>{

        this.props.history.goBack()
    }
    successButtonHandler = () =>{ 
        this.props.history.replace('/checkout/Contact-Data')
    }


    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){
            let purchased = this.props.purchasing ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchased}
                    <CheckOutSummary 
                    ingredients={this.props.ings} 
                    cancel={this.cancelButtonHandler}
                    success={this.successButtonHandler}/>

               <Route 
                    path={this.props.match.path + '/Contact-Data'} 
                    component={ContactData}/>    
                </div>
            )
        }
        return(
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchasing : state.order.purchasing
    }
}




export default connect(mapStateToProps)(CheckOut)