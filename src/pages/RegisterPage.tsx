import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { Spacing } from '../components/ui/Spacing';

function RegisterPage() {
  return (
    <>
      <Spacing size="sm" />
      <div className="flex items-center justify-center">
        <div className="my-10 flex w-96 flex-col ">
          <h1 className="text-2xl font-semibold ">Inscription</h1>
          <p className="mb-6 mt-2 text-sm text-neutral-10">Entrez vos informations pour créer un compte</p>
          <RegisterForm />
          <Link className="my-4 text-sm text-neutral-10" to="/connexion">
            <button className="group">
              Vous avez déjà un compte ? <span className="underline group-hover:text-green-9">Se connecter</span>
            </button>
          </Link>
        </div>
      </div>
      <Spacing />
    </>
  );
}
export default RegisterPage;
