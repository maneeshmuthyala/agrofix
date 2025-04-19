import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

class Myordrs extends Component {
  state = {
    orders: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    this.setState({ loading: true }); 
    try {
      const res = await axios.get('https://agrofixbackend.onrender.com/orders');
      this.setState({ orders: res.data, loading: false }); 
    } catch (error) {
      this.setState({ error: 'Failed to fetch orders. Please try again later.', loading: false });
      console.error('Error fetching orders:', error);
    }
  };


  renderLoader = () => {
    return (
        <DotLottieReact
        src="https://lottie.host/c0654fa3-5256-4ae2-b888-d790661405c6/TBy1YKUagw.lottie"
        loop
        autoplay
        height="70px"
      />
    );
  };

  render() {
    const { orders, error, loading } = this.state;

    return (
      <>
      <Header/>
     
      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h2>My Orders</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        {loading ? (
          this.renderLoader() 
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customer_name}</td>
                  <td>{order.product_name}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </>
    );
  }
}

export default Myordrs;
