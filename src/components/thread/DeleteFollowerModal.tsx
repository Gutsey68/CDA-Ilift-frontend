import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteFollower } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type DeleteFollowerModalProps = {
  closeModal: () => void;
  follower: FollowingsType;
};

function DeleteFollowerModal({ closeModal, follower }: DeleteFollowerModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteFollower(follower.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      closeModal();
    }
  });

  const handleDelete = () => {
    try {
      mutation.mutate();
      toast.success('Abonné supprimé avec succès');
    } catch {
      toast.error("Une erreur est survenue lors de la suppression de l'abonné");
    }
  };

  return (
    <Modal size="sm" onClose={closeModal}>
      <Card size="lg" className="max-h-[60vh] overflow-y-auto text-center">
        <Avatar className="m-auto" size="lg" src={follower.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${follower.pseudo}`} />
        <p className="mt-4">Supprimer le follower ?</p>
        <p className="py-2 text-xs text-neutral-11">
          Nous n'informerons pas <span className="text-neutral-12">{follower.pseudo}</span> que vous avez supprimé son compte de vos followers.
        </p>
        <hr className="border-neutral-6" />
        <button onClick={handleDelete} className="cursor-pointer py-2 text-red-600 hover:text-red-500">
          {mutation.status === 'pending' ? 'Suppression en cours...' : 'Supprimer'}
        </button>
        <hr className="border-neutral-6" />
        <button className="cursor-pointer pt-2 text-neutral-11 hover:text-neutral-12" onClick={closeModal}>
          Annuler
        </button>
        <X onClick={closeModal} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
      </Card>
    </Modal>
  );
}

export default DeleteFollowerModal;
