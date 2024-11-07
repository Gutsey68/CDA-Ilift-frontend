import { CalendarDays, Camera, MapPin } from 'lucide-react';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { useAuthStore } from '../../stores/useAuthStore';
import Avatar from '../ui/Avatar';

function ProfileCard() {
  const userDetails = useAuthStore(state => state.userDetails);

  return (
    <div className="flex items-center gap-4 border-b border-neutral-6 p-6 shadow-sm">
      <div className="relative">
        <Avatar src={userDetails?.profilePhoto} alt="" className="mr-1" size="xl" />
        <button className="absolute bottom-3 right-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-neutral-11 shadow-md">
          <Camera size={20} className="text-neutral-1" />
        </button>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold">{userDetails?.pseudo}</h1>
        <p className="text-neutral-11">{userDetails?.bio}</p>
        <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
          <p>
            <MapPin size={16} className="mr-1 inline-block" />
            {userDetails?.city}
          </p>
          <p>
            <CalendarDays size={16} className="mr-1 inline-block" />A rejoint Ilift {userDetails?.createdAt ? formatRelativeTime(userDetails.createdAt) : ''}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
          <p className="flex items-center gap-1">
            <span className="text-lg font-semibold text-green-9">143</span>
            abonnements
          </p>
          <p className="flex items-center gap-1">
            <span className="text-lg font-semibold text-green-9">143</span>
            abonnés
          </p>
          <p className="flex items-center gap-1">
            <span className="text-lg font-semibold text-green-9">22</span>
            activités
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
