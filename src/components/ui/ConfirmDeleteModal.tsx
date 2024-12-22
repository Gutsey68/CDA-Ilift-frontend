import { LoaderCircle, X } from 'lucide-react';
import Card from './Card';
import Modal from './Modal';

type ConfirmDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
};

function ConfirmDeleteModal({ onClose, onConfirm, title, message, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <p className="text-center text-neutral-11">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={isLoading} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
            {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Supprimer'}
          </button>
        </div>
      </Card>
    </Modal>
  );
}

export default ConfirmDeleteModal;
