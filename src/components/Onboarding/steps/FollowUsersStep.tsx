import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { follow } from '../../../services/followersService';
import { fetchUsers } from '../../../services/usersService';
import { UserDetailsType } from '../../../types/userDetailsType';
import FollowingsSkeletons from '../../skeletons/FollowingsSkeletons';
import Avatar from '../../ui/Avatar';
import { Input } from '../../ui/Input';

const FollowUsersStep = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => fetchUsers()
  });

  const users = data?.data;

  const filteredUsers =
    searchTerm.length >= 1 ? users?.filter((user: UserDetailsType) => user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())) : users?.slice(0, 5);

  const { mutate: followUser, isPending: isFollowPending } = useMutation({
    mutationFn: (userId: string) => follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] });
      toast.success('Utilisateur suivi avec succès');
    },
    onError: () => {
      toast.error("Erreur lors du suivi de l'utilisateur");
    }
  });

  return (
    <div className="space-y-4">
      <Input placeholder="Rechercher un utilisateur" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

      {isLoading ? (
        <FollowingsSkeletons />
      ) : (
        <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
          {filteredUsers?.length ? (
            filteredUsers.map((user: UserDetailsType) => (
              <div key={user.id} className="flex items-center justify-between">
                <Link to={`/profil/${user.id}`} className="group flex w-full cursor-pointer items-center gap-3">
                  <Avatar size="sm" src={user.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${user.pseudo}`} />
                  <p className="text-sm text-neutral-11 group-hover:text-green-11">{user.pseudo}</p>
                </Link>
                <button onClick={() => followUser(user.id)} disabled={isFollowPending} className="text-sm text-green-11">
                  Suivre
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-11">Aucun utilisateur trouvé</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowUsersStep;
