import React, {Component} from 'react'
import Aux from '../AuxFolder/lax'
import styles from './Layout.css'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import {connect} from 'react-redux'
class Layout extends Component {

    state = {
        showSideDrawer : true
    }

    SideDrawerDisplayHandler = () => {
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler = () => {
        const curr = this.state.showSideDrawer
        this.setState({showSideDrawer:!curr}) 
    }

    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} toggle={this.SideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} close={this.SideDrawerDisplayHandler} />
                <main className = {styles.Content}>{this.props.children}</main>
            </Aux>
        
        )
    }
   
}
    
const mapStateToProps =  state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout) 