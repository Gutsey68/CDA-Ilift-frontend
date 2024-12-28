import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { loginSchema } from '../../validators/auth.validation';
import Button from '../ui/Button';
import FormField from './FormField';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });
  const { loginMutation } = useAuth();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(data);
      toast('Connexion réussie', { icon: '🎉' });
    } catch {
      toast.error(loginMutation.error?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        disabled={isSubmitting || loginMutation.status === 'pending'}
        label="Pseudo"
        name="pseudo"
        type="text"
        register={register}
        errors={errors}
        placeholder="darkSasuke"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className={`mt-1 text-sm ${errors.password && 'text-red-11'}`}>
            Mot de passe
          </label>
          <Link className="" to="/mot-de-passe-oublie">
            <p className="text-xs text-neutral-10 underline hover:text-green-9">Mot de passe oublié ?</p>
          </Link>
        </div>
        <FormField disabled={isSubmitting || loginMutation.status === 'pending'} label="" name="password" type="password" register={register} errors={errors} />
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || loginMutation.status === 'pending'}>
        {isSubmitting || loginMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : 'Se connecter'}
      </Button>
    </form>
  );
}

export default LoginForm;
