import { Component } from "react";
import Header from "../Header";
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import 'reactjs-popup';
import './index.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Home extends Component {
  state = {
    products: [],
    apiStatus: apiStatusConstants.initial,
    selectedProduct: null,
    userName: '',
    userPhone: '',
    userAddress: '',
    orderPlaced: false,
  };

  componentDidMount() {
    this.renderProducts();
  }

  renderProducts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    try {
      const response = await fetch('https://agrofixbackend.onrender.com/products');
      if (response.ok === true) {
        const data = await response.json();
        this.setState({ products: data, apiStatus: apiStatusConstants.success });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  openPopup = (product) => {
    this.setState({ selectedProduct: product });
  };

  closePopup = () => {
    this.setState({ selectedProduct: null });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, userPhone, userAddress, selectedProduct } = this.state;

    const orderData = {
      customer_name: userName,
      contact: userPhone,
      address: userAddress,
      product_name: selectedProduct.name,
    };

    try {
      const response = await fetch('https://agrofixbackend.onrender.com/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        this.setState({
          orderPlaced: true,
          selectedProduct: null,
          userName: '',
          userPhone: '',
          userAddress: '',
        });
      } else {
        console.error('Order not placed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  closeOrderPopup = () => {
    this.setState({ orderPlaced: false });
  };

  render() {
    const { products, selectedProduct, orderPlaced, userName, userPhone, userAddress, apiStatus } = this.state;

    if (apiStatus === apiStatusConstants.inProgress) {
      return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <DotLottieReact
                         src="https://lottie.host/c0654fa3-5256-4ae2-b888-d790661405c6/TBy1YKUagw.lottie"
                         loop
                         autoplay height="70px"/>
        </div>
      );
    }

    return (
      <>
        <Header />
        <div className="man">
          <div className="mani">
            <img src="https://res.cloudinary.com/dvmcsww2y/image/upload/v1744988531/mart_s5i8vc.jpg" className="mani"/>
          </div>
          <div className="sel-cont"></div>
          <ul className="list">
            {products.map(each => (
              <div className="product-card" key={each.id}>
                {each.name === 'Grapes' && <span className="discount-badge">16%</span>}
                <FaHeart className="wishlist-icon" />
                <div className="image-wrapper">
                  <div className="pink-circle"></div>
                  <div className="blue-border">
                    <img src={each.img} alt={each.name} />
                  </div>
                </div>
                <p className="price">&#8377;{each.cost}</p>
                <h3 className="title">{each.name}</h3>
                <p className="weight">{each.weight}</p>
                <button className="add-to-cart" onClick={() => this.openPopup(each)}>
                  <FaShoppingBag />
                </button>
              </div>
            ))}
          </ul>

          <Popup open={selectedProduct !== null} closeOnDocumentClick onClose={this.closePopup} modal nested>
            <div className="popup-form-container">
              <button className="close" onClick={this.closePopup}>X</button>
              <h2>Order: {selectedProduct?.name}</h2>
              <form onSubmit={this.handleSubmit} className="user-form">
                <input
                  type="text"
                  name="userName"
                  placeholder="Name"
                  value={userName}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="tel"
                  name="userPhone"
                  placeholder="Phone Number"
                  value={userPhone}
                  onChange={this.handleChange}
                  required
                />
                <textarea
                  name="userAddress"
                  placeholder="Address"
                  value={userAddress}
                  onChange={this.handleChange}
                  required
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </Popup>

          <Popup open={orderPlaced} closeOnDocumentClick onClose={this.closeOrderPopup} modal>
            <div className="popup-confirmation">
              <h2>🎉 Order Placed Successfully!</h2>
              <p>Thank you for your order. We’ll get back to you shortly.</p>
              <button onClick={this.closeOrderPopup}>Close</button>
            </div>
          </Popup>
        </div>
      </>
    );
  }
}

export default Home;
