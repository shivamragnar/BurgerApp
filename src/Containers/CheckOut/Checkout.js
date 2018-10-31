import React, {Component} from 'react'
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'

class CheckOut extends Component {

    cancelButtonHandler = () =>{

        this.props.history.goBack()
    }
    successButtonHandler = () =>{ 
        this.props.history.replace('/checkout/Contact-Data')
    }


    render(){
        console.log(this.props)
        return(
            <div>
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
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut)