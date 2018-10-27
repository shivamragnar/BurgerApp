import React, {Component} from 'react'
import Button from '../../../Components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'

import {Redirect} from 'react-router-dom'



class ContactData extends Component {

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            pinCode :'',
        },
        loading : false,
        home : false
    }

    redirect = ()=>(<Redirect to='/' />)
    orderHandler =  (event) =>{
            event.preventDefault()
            console.log(this.props.ingredients)

               this.setState({loading:true})
               const data = {
                   ingredients : this.props.ingredients,
                   price : this.props.price,
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
                   console.log(response)
                  this.setState({loading:false, home:true})
                  
               })
               .catch(error => {
                this.setState({loading:false})
                
               })
    }

    render(){
        let redirect = null
        if(this.state.home){
            redirect = <Redirect to='/' />
        }
        let form = (<form>
                        <input className={styles.Input} type='text' name='name' placeholder='Your Name'  />
                        <input className={styles.Input} type='email' name='email' placeholder='Your Email' />
                        <input className={styles.Input} type='text' name='street' placeholder='Your Street' />
                        <input className={styles.Input} type='text' name='pinCode' placeholder='Your Pincode' />
                        <Button btnType='Success' clicked={this.orderHandler}>Place Order </Button>
                    </form> 
                    )
        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={styles.ContactData}>
                <h3>Please Enter Your Contact Details</h3>
                {form}
                {redirect}           
            </div>
        )
    }
}


export default ContactData