import React, {Component} from 'react'
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
class CheckOut extends Component {

    state ={
        ingredients: null,
        totalPrice : 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients={}
        let price =0
        for(let param of query.entries()){
            if(param[0]==='totalPrice'){
                price = +param[1]
            }else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients, totalPrice : price})
    }

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
                    ingredients={this.state.ingredients} 
                    cancel={this.cancelButtonHandler}
                    success={this.successButtonHandler}/>

               <Route 
                    path={this.props.match.path + '/Contact-Data'} 
                    render={()=> (
                                <ContactData 
                                    ingredients={this.state.ingredients}
                                    price={this.state.totalPrice}/>)}/>    


            </div>
        )
    }
}

export default CheckOut