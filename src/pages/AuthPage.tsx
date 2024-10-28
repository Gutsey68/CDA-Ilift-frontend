import { useState } from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Card from '../components/ui/Card';

export type FormType = 'login' | 'register' | 'forgotPassword';

export default function AuthPage() {
  const [formType, setFormType] = useState<FormType>('login');

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return <LoginForm setFormType={setFormType} />;
      case 'register':
        return <RegisterForm />;
      case 'forgotPassword':
        return <ForgotPasswordForm />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card size="lg" className="my-10 flex w-96 flex-col ">
        {renderForm()}
        <div className="mt-4 flex flex-col gap-2 text-center text-sm">
          {formType !== 'login' && (
            <button className="group" onClick={() => setFormType('login')}>
              Vous avez déjà un compte ? <span className="underline group-hover:text-green-9">Se connecter</span>
            </button>
          )}
          {formType !== 'register' && (
            <button className="group" onClick={() => setFormType('register')}>
              Vous n'avez pas encore de compte ? <span className="underline group-hover:text-green-9">S'inscrire</span>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
