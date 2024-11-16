import { Link } from 'react-router-dom';
import { SuggestedUser } from '../../types/SuggestedUserType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

type SuggestedProfilsProps = {
  suggestedUsers: SuggestedUser[];
};

function SuggestedProfils({ suggestedUsers }: SuggestedProfilsProps) {
  return (
    <Card size="md" className="sticky top-[80px] flex flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Profils suggérés</h2>
      </div>
      {suggestedUsers.map((user, index) => (
        <Link to={`/profil/${user.id}`} key={index} className="flex items-center gap-4">
          <Avatar alt="" size="sm" src={user.profilePhoto ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user.pseudo}</h1>
            <p className="text-xs text-neutral-11">
              {user.followedBy.length > 0 && user.followedBy[0].following.length > 0 ? (
                <span>
                  Suivi(e) par {user.followedBy[0].following[0].pseudo} et {user._count.followedBy - 1} autres
                </span>
              ) : (
                <span>Suggestions</span>
              )}
            </p>
          </div>
        </Link>
      ))}
    </Card>
  );
}
export default SuggestedProfils;
