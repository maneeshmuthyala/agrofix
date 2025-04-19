import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedAdRoute = props => {
  const isAdmin = Cookies.get('is_admin');

  if (isAdmin !== 'true') {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedAdRoute;
