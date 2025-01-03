import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { resetPasswordRequestSchema } from '../../validators/auth.validation';
import Button from '../ui/Button';
import FormField from './FormField';

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof resetPasswordRequestSchema>>({
    resolver: zodResolver(resetPasswordRequestSchema)
  });

  const { forgotPasswordMutation } = useAuth();

  const onSubmit = async (data: z.infer<typeof resetPasswordRequestSchema>) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
      toast.success('Un email de réinitialisation a été envoyé si le compte existe');
    } catch {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        disabled={isSubmitting || forgotPasswordMutation.status === 'pending'}
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        placeholder="dark.s@email.com"
      />
      <Button
        type="submit"
        className="mt-2 w-full"
        isPending={isSubmitting || forgotPasswordMutation.status === 'pending'}
        disabled={isSubmitting || forgotPasswordMutation.status === 'pending'}
      >
        Réinitialiser le mot de passe
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
