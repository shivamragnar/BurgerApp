import React, {Component} from 'react'
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state={
        Orders :[],
        loading: true,
    }

    componentDidMount(){
    
        axios.get('/orders.json')
        .then(res=>{
           
            const fetchedOrders =[]
            for (const key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
            console.log(fetchedOrders)
            this.setState({loading:false, Orders:fetchedOrders})
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }

        render(){
            return(
                <div>
                    {this.state.Orders.map(order =>
                        (<Order key={order.id} price={order.price} ingredients={order.ingredients}/>))}
                </div>
            )
        }
}

export default withErrorHandler(Orders,axios)