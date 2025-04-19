import React from 'react';
import {Link} from 'react-router-dom'
import './index.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🌿 AgroFix Admin Dashboard</h1>
        <p>Welcome, Admin Maneesh 👋</p>
      </header>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>🌾 Products</h2>
          <p>Add, remove or update agro products</p>
          <Link to="/product-dash">
          <button>Manage Products</button>
          </Link>
        </div>

        <div className="admin-card">
          <h2>📦 Orders</h2>
          <p>View and fulfill customer orders</p>
          <Link to="/order-dash">
          <button>View Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
