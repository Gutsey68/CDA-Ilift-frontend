import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { updateWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import { updateWorkoutSchema } from '../../validators/workouts.validation';
import FormField from '../auth/FormField';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type EditWorkoutModalProps = {
  workout: WorkoutType;
  onClose: () => void;
};

type FormData = z.infer<typeof updateWorkoutSchema>['body'];

function EditWorkoutModal({ workout, onClose }: EditWorkoutModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(updateWorkoutSchema.shape.body),
    defaultValues: {
      name: workout.name
    }
  });

  const updateWorkoutMutation = useMutation({
    mutationFn: (data: FormData) => updateWorkout(workout.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Séance modifiée avec succès');
      onClose();
    },
    onError: () => {
      toast.error('Erreur lors de la modification de la séance');
    }
  });

  const onSubmit = handleSubmit(data => {
    updateWorkoutMutation.mutate(data);
  });

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Modifier la séance</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField label="Nom de la séance" name="name" type="text" register={register} errors={errors} disabled={updateWorkoutMutation.isPending} />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
              Annuler
            </button>
            <button
              type="submit"
              disabled={updateWorkoutMutation.isPending}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500"
            >
              {updateWorkoutMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Modifier'}
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditWorkoutModal;
