import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WorkoutType } from '../../types/workoutsType';

type WorkoutsListProps = {
  workouts: WorkoutType[];
};

function WorkoutsList({ workouts }: WorkoutsListProps) {
  return (
    <>
      {workouts.map(workout => (
        <div key={workout.id}>
          <hr className="mb-4 border-neutral-6" />
          <div className="group flex items-center justify-between gap-8">
            <Link className="w-full" to={`/programmes/${workout.id}/exercices`}>
              <div className="group cursor-pointer">
                <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
              </div>
            </Link>
            <Pencil className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100" />
          </div>
        </div>
      ))}
    </>
  );
}
export default WorkoutsList;
