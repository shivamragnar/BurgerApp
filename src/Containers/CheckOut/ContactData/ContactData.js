import React, {Component} from 'react'
import Button from '../../../Components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'

import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'




class ContactData extends Component {

    state = {
        orderForm :{

                name : {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value : '',
                    touched : false,
                    validation : {
                        required : true
                    },
                    valid : false
                },
                street : {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value : '',
                    touched : false,
                    validation : {
                        required : true
                    },
                    valid : false
                
                },
                zipCode : {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value : '',
                    touched : false,
                    validation : {
                        required : true,
                        minLength: 6,
                        maxLength: 6
                    },
                    valid : false
                },
                country : {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country'
                    },
                    value : '',
                    touched : false,
                    validation : {
                        required : true
                    },
                    valid : false
                },
                email : {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Mail'
                    },
                    value : '',
                    touched : false,
                    validation : {
                        required : true
                    },
                    valid : false
                },
                deliveryMethod : {
                    elementType:'select',
                    elementConfig:{
                      options : [
                          {value:'fastest', displayValue:'Fastest'},
                          {value:'Cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    validation : {},
                    value : '',
                    valid : true
                },
        },
        formIsValid:false,
        loading : false,
        home : false
    }
    orderHandler =  (event) =>{
            event.preventDefault()
            const formData ={}
            for (let formElementIdentifier in this.state.orderForm){
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
            }
            this.setState({loading:true})
               const data = {
                   ingredients : this.props.ings,
                   price : this.props.price,
                   orderData:formData
                }

               axios.post('/orders.json', data)
               .then(response => {
                  
                  this.setState({loading:false, home:true})
                  
               })
               .catch(error => {
                this.setState({loading:false})
                
               })
    }

    onChangeHandler = (event, inputElementIdentifier)=>{
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputElementIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched=true
        updatedForm[inputElementIdentifier] = updatedFormElement
        let isFormValid =true
        for (inputElementIdentifier in updatedForm) {
            isFormValid = updatedForm[inputElementIdentifier].valid && isFormValid
        }
        this.setState({orderForm:updatedForm, formIsValid:isFormValid})
    }


    checkValidity(value, rules){
        if(!rules){
            return true  
        }
        
        
        let isValid = true 
        if(rules.required){
            isValid=value.trim()!==''
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid
        }

        return isValid
    }
    render(){
        let redirect = null
        if(this.state.home){
            redirect = <Redirect to='/' />
        }
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config : this.state.orderForm[key]
            })
        }
       
        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElement=>(
                            <Input 
                                key={formElement.id}
                                invalid={!formElement.config.valid}
                                elementtype={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value} 
                                touched={formElement.config.touched}
                                shouldValidate={formElement.config.validation}
                                change={(event)=>this.onChangeHandler(event, formElement.id)}/>

                        ))}
                         
                         <Button btnType='Success' disabled={!this.state.formIsValid} >Place Order </Button>
                    
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

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData)