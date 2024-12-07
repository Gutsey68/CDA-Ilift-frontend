import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function NotAuthenticatedRoute() {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/accueil" /> : <Outlet />;
}

export default NotAuthenticatedRoute;
