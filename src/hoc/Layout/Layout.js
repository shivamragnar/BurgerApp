import React, {Component} from 'react'
import Aux from '../AuxFolder/lax'
import styles from './Layout.css'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'

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
                <Toolbar toggle={this.SideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} close={this.SideDrawerDisplayHandler} />
                <main className = {styles.Content}>{this.props.children}</main>
            </Aux>
        
        )
    }
   
}
    


export default Layout