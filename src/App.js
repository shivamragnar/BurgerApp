import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgurBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/Checkout'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/action/index'

import Orders from './Containers/Orders/Orders'
class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthState()
  }

  render() {
    let routes = (
      <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' component={BurgerBuilder} />
            <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated){
     routes= ( <Switch>
                  <Route path='/Checkout' component={CheckOut} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/logout' component={Logout} />
                  <Route path='/auth' component={Auth} />
                  <Route path='/'exact component={BurgerBuilder} />
                  <Redirect to="/" />
              </Switch>
              )
    }


    return (
      <div >
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))