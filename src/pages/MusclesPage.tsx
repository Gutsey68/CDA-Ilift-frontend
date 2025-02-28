import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { fetchMuscleGroups } from '../services/muscleGroupsService';
import { MuscleGroupsResponseType } from '../types/musclesType';

/**
 * Composant de sélection de groupe musculaire
 * Fonctionnalités :
 * - Affichage d'un menu déroulant pour sélectionner un groupe musculaire
 * - Chargement des groupes musculaires depuis l'API
 * - Gestion des états de chargement
 *
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {string} props.value - Valeur actuelle du champ de sélection
 * @param {(value: string) => void} props.onChange - Fonction appelée lors du changement de valeur
 * @returns {JSX.Element} Composant de sélection de groupe musculaire
 */
function MuscleGroupSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { data: muscleGroups, isLoading } = useQuery<MuscleGroupsResponseType>({
    queryKey: ['muscleGroups'],
    queryFn: fetchMuscleGroups
  });

  if (isLoading) {
    return <LoaderCircle className="animate-spin" size={24} />;
  }

  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="rounded-md border border-neutral-6 bg-neutral-1 px-4 py-2 text-sm">
      <option value="all">Tous les groupes musculaires</option>
      {muscleGroups?.data?.map(mg => (
        <option key={mg.id} value={mg.id}>
          {mg.name}
        </option>
      ))}
    </select>
  );
}

export default MuscleGroupSelect;
