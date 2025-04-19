import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Admin from './components/Admin'
import AdminPage from './components/AdminPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDash from './components/ProductDash';
import OrdersDashboard from './components/OrderDash';
import Myordrs from './components/Myordrs';
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdRoute from './components/ProtectedAdRoute copy';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm } />
        <Route path="/admin" component={Admin } />
        <ProtectedAdRoute path="/admin-page" component={AdminPage } />
        <ProtectedAdRoute path="/order-dash" component={OrdersDashboard } />
        <ProtectedAdRoute path="/product-dash" component={ProductDash } />
        <ProtectedAdRoute path="/my-orders" component={Myordrs} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
