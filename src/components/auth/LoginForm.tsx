import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

const loginSchema = z.object({
  pseudo: z.string().min(1, 'Le pseudo est requis'),
  password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères')
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });
  const { loginMutation } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate('/tableau-de-bord');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('root', { type: 'manual', message: 'Erreur lors de la connexion' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {loginMutation.isError && (
        <p className="text-red-600" onClick={() => loginMutation.reset()}>
          {loginMutation.error?.message}
        </p>
      )}
      <label htmlFor="pseudo" className="mt-1 text-sm">
        Pseudo
      </label>
      <Input {...register('pseudo')} type="text" name="pseudo" placeholder="Pseudo" />
      {errors.pseudo && <p className="mb-1 text-sm text-red-600">{errors.pseudo.message?.toString()}</p>}
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="mt-1 text-sm">
          Mot de passe
        </label>
        <Link className="" to="/mot-de-passe-oublie">
          <a className="text-xs text-neutral-10 underline hover:text-green-9">Mot de passe oublié ?</a>
        </Link>
      </div>
      <Input {...register('password')} type="password" name="password" placeholder="Mot de passe" />
      {errors.password && <p className="mb-1 text-sm text-red-600">{errors.password.message?.toString()}</p>}
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || loginMutation.status === 'pending'}>
        {isSubmitting || loginMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : 'Se connecter'}
      </Button>
    </form>
  );
}

export default LoginForm;
