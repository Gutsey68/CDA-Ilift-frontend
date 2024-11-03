import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

function LoginForm() {
  const { loginMutation } = useAuth();
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const [credentials, setCredentials] = useState({ pseudo: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(credentials);

      setAuthenticated(true);

      navigate('/tableau-de-bord');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erreur lors de la connexion');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Connexion</h2>
      <label htmlFor="pseudo" className="mt-1 text-sm">
        Pseudo
      </label>
      <Input name="pseudo" onChange={handleChange} value={credentials.pseudo} placeholder="Pseudo" />

      <label htmlFor="password" className="mt-1 text-sm">
        Mot de passe
      </label>
      <Input name="password" type="password" onChange={handleChange} value={credentials.password} placeholder="Mot de passe" />

      {error && <p className="mb-1 text-sm text-red-600">{error}</p>}
      <Button type="submit" className="mt-2 w-full">
        Se connecter
      </Button>
    </form>
  );
}

export default LoginForm;
