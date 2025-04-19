import React, { Component } from 'react';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

class ProductDash extends Component {
  state = {
    products: [],
    newProduct: {
      name: '',
      img: '',
      weight: '',
      cost: '',
    },
    isEditing: false,
    editId: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get('https://agrofixbackend.onrender.com/products');
      this.setState({ products: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        [name]: value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, img, weight, cost } = this.state.newProduct;
    this.setState({ loading: true });
     const {editId} = this.state;
    try {
      if (this.state.isEditing) {
        await axios.put(`https://agrofixbackend.onrender.com/products/${this.state.editId}`, {
          name,
          img,
          weight,
          cost,
        });
      } else {
        await axios.post('https://agrofixbackend.onrender.com/products', {
          name,
          img,
          weight,
          cost,
        });
      }

      this.setState({
        newProduct: { name: '', img: '', weight: '', cost: '' },
        isEditing: false,
        editId: null,
      });

      this.fetchProducts();
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  handleEdit = (product) => {
    this.setState({
      newProduct: {
        name: product.name,
        img: product.img,
        weight: product.weight,
        cost: product.cost,
      },
      isEditing: true,
      editId: product.id,
    });
  };

  handleDelete = async (id) => {
    this.setState({ loading: true });
    try {
      await axios.delete(`https://agrofixbackend.onrender.com/products/${id}`);
      this.fetchProducts();
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  render() {
    const { products, newProduct, isEditing, loading } = this.state;

    if (loading) {
      return (
         <DotLottieReact
               src="https://lottie.host/c0654fa3-5256-4ae2-b888-d790661405c6/TBy1YKUagw.lottie"
               loop
               autoplay
               height="70px"
             />
      );
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={newProduct.img}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={newProduct.weight}
            onChange={this.handleChange}
            required
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={newProduct.cost}
            onChange={this.handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Product List</h3>
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.img} alt={prod.name} height="50" />
                </td>
                <td>{prod.name}</td>
                <td>{prod.weight}</td>
                <td>₹{prod.cost}</td>
                <td>
                  <button onClick={() => this.handleEdit(prod)}>Edit</button>
                  <button
                    onClick={() => this.handleDelete(prod.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductDash;
