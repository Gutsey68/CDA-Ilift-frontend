import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

/**
 * Page d'inscription de l'application
 * Fonctionnalités :
 * - Formulaire d'inscription
 * - Lien vers la page de connexion
 * - Affichage d'une image de fond sur grand écran
 *
 * @component
 * @returns {JSX.Element} Page d'inscription
 */
function RegisterPage() {
  return (
    <main className="flex h-screen justify-center bg-neutral-1 max-lg:px-4">
      <div className="flex items-center justify-center lg:w-1/2">
        <div className="my-10 flex w-96 flex-col ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Inscription</h1>
            <p className="mb-6 mt-2 text-sm text-neutral-10">Entrez vos informations pour créer un compte</p>
          </div>
          <RegisterForm />
          <Link className="my-4 text-sm text-neutral-10" to="/connexion">
            <button className="group">
              Vous avez déjà un compte ? <span className="underline group-hover:text-green-9">Se connecter</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-1/2 max-lg:hidden">
        <img src={'/uploads/registerPhoto.webp'} className="size-full bg-neutral-1 object-cover" alt="" />
      </div>
      <Link to="/">
        <Dumbbell size={36} className="absolute left-8 top-8 text-green-9" />
      </Link>
    </main>
  );
}
export default RegisterPage;
