import React, {Component} from 'react'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import styles from './Auth.css'
import * as actions from '../../store/action/index'
import {connect} from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'



class Auth extends Component {
    
    state = {
        controls : {
            email : {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email Address'
                },
                value : '',
                touched : false,
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false
            },
            password : {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value : '',
                touched : false,
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false
            }
        },
        isSignUp : true,
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/" ){
           
            this.props.onSetAuthRedirectPath()
        }
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

    inputChangeHandler = (event, controlName) => {
     const   updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true
            }
        }
        this.setState({controls : updatedControls})
    }

    submitHandler = (event) => {
       
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthMode = () => {
        this.setState(prevState => {
        return  {isSignUp : !prevState.isSignUp }
        })
    }
   
   
    render() {
        const formElementsArray = []
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config : this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                invalid={!formElement.config.valid}
                elementtype={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                change={(event)=>this.inputChangeHandler(event, formElement.id)}/>
        ))
        
        if(this.props.loading){
            form = <Spinner />
        }

        

        let errorMessage = null 

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null
       
        if(this.props.isAuthenticated) {
           authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthMode} btnType="Danger"> Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)