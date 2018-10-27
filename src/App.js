import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgurBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/Checkout'
import {Route, Switch} from 'react-router-dom'

import Orders from './Containers/Orders/Orders'
class App extends Component {
  render() {
    return (
      <div >
          <Layout>
              <Switch>
                  <Route path='/Checkout' component={CheckOut} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/' component={BurgerBuilder} />
              </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
