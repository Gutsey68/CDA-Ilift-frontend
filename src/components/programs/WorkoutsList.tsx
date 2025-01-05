import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteWorkout, updateWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditWorkoutModal from './EditWorkoutModal';

type WorkoutsListProps = {
  workouts: WorkoutType[];
};

type DragItem = {
  id: string;
  index: number;
};

interface WorkoutCardProps {
  workout: WorkoutType;
  index: number;
  onEdit: (workout: WorkoutType) => void;
  onDelete: (workout: WorkoutType) => void;
  moveWorkout: (dragIndex: number, hoverIndex: number) => void;
}

function WorkoutCard({ workout, index, onEdit, onDelete, moveWorkout }: WorkoutCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'WORKOUT',
    item: { id: workout.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'WORKOUT',
    hover: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveWorkout(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <hr className="mb-4 border-neutral-6" />
      <div className="group mb-4 flex items-center justify-between gap-8">
        <Link className="w-full" to={`/programmes/${workout.id}/exercices`}>
          <div className="group cursor-pointer">
            <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
          </div>
        </Link>
        <div className="flex gap-4">
          <Pencil
            onClick={e => {
              e.preventDefault();
              onEdit(workout);
            }}
            className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100"
          />
          <Trash
            onClick={e => {
              e.preventDefault();
              onDelete(workout);
            }}
            className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

function WorkoutsList({ workouts }: WorkoutsListProps) {
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutType | null>(null);
  const [workoutToDelete, setWorkoutToDelete] = useState<WorkoutType | null>(null);
  const queryClient = useQueryClient();

  const deleteWorkoutMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteWorkout(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Séance supprimée avec succès');
      setWorkoutToDelete(null);
    },
    onError: () => {
      toast.error('Erreur lors de la suppression de la séance');
    }
  });

  const updatePositionMutation = useMutation({
    mutationFn: (params: { id: string; position: number }) => updateWorkout(params.id, undefined, params.position),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    }
  });

  const moveWorkout = (dragIndex: number, hoverIndex: number) => {
    const draggedWorkout = workouts[dragIndex];

    updatePositionMutation.mutate({
      id: draggedWorkout.id,
      position: hoverIndex + 1
    });
  };

  return (
    <>
      <div>
        {workouts.map((workout, index) => (
          <WorkoutCard key={workout.id} workout={workout} index={index} onEdit={setWorkoutToEdit} onDelete={setWorkoutToDelete} moveWorkout={moveWorkout} />
        ))}
      </div>
      {workoutToEdit && <EditWorkoutModal workout={workoutToEdit} onClose={() => setWorkoutToEdit(null)} />}
      {workoutToDelete && (
        <ConfirmDeleteModal
          title="Supprimer la séance"
          message={`Êtes-vous sûr de vouloir supprimer la séance "${workoutToDelete.name}" ?`}
          onClose={() => setWorkoutToDelete(null)}
          onConfirm={() => deleteWorkoutMutation.mutate(workoutToDelete.id)}
          isLoading={deleteWorkoutMutation.isPending}
        />
      )}
    </>
  );
}

export default WorkoutsList;
