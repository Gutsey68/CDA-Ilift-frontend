import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../services/authService';
import { fetchCurrentUser } from '../services/usersService';

const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      await checkAuth();
      setUser(data.user);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      setUser(null);
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
  });

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const data = await fetchCurrentUser();
        setUser(data.data);
      }
    } catch {
      logoutMutation.mutate();
      navigate('/connexion');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    checkAuth
  };
};

export default useAuth;
