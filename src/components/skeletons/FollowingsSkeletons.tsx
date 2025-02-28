/**
 * Composant de placeholder pour la liste des abonnements
 * Affiche 5 éléments de chargement simulant :
 * - Avatar
 * - Nom d'utilisateur
 * - Bouton d'action
 *
 * @component
 * @returns {JSX.Element} Animation de chargement de la liste d'abonnements
 */
function FollowingsSkeletons() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-10 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/3 rounded bg-neutral-4"></div>
        <div className="w-1/3"></div>
        <div className="h-10 w-24 rounded-md bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-10 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/3 rounded bg-neutral-4"></div>
        <div className="w-1/3"></div>
        <div className="h-10 w-24 rounded-md bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-10 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/3 rounded bg-neutral-4"></div>
        <div className="w-1/3"></div>
        <div className="h-10 w-24 rounded-md bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-10 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/3 rounded bg-neutral-4"></div>
        <div className="w-1/3"></div>
        <div className="h-10 w-24 rounded-md bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-10 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/3 rounded bg-neutral-4"></div>
        <div className="w-1/3"></div>
        <div className="h-10 w-24 rounded-md bg-neutral-4"></div>
      </div>
    </div>
  );
}
export default FollowingsSkeletons;
