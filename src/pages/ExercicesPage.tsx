import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../components/error/ErrorPage';
import ExercicesList from '../components/programs/ExercicesList';
import ExercicesSkeletons from '../components/skeletons/ExercicesSkeletons';
import Button from '../components/ui/Button';
import { fetchExercicesOfWorkout } from '../services/programsService';

function ExercicesPage() {
  const { id } = useParams();

  const {
    isPending: exercicesPending,
    error: exercicesError,
    data: exercices
  } = useQuery({
    queryKey: ['exercices', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchExercicesOfWorkout(id);
    },
    enabled: !!id
  });

  const exercicesData = exercices?.data;

  if (exercicesError) {
    return <ErrorPage />;
  }

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Exercices</h1>
          <p className="mt-1 text-neutral-11">{exercicesData && exercicesData.length > 0 ? exercicesData[0].workouts[0].workout.name : ''}</p>
        </div>
        <Button className="max-sm:px-2">
          <Plus className="sm:hidden" />
          <span className="max-sm:hidden">Ajouter un exercice</span>
        </Button>
      </div>
      {exercicesData && exercicesData.length === 0 && <hr className="border-neutral-6" />}
      {exercicesPending ? <ExercicesSkeletons /> : <ExercicesList exercices={exercicesData} />}
    </div>
  );
}
export default ExercicesPage;
