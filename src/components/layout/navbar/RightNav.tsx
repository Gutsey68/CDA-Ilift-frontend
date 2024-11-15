import { Bell } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useAuthStore } from '../../../stores/useAuthStore';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import ThemeToggle from '../../theme/ThemeToggle';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import IconButton from '../../ui/IconButton';
import LogoutButton from './LogoutButton';

function RightNav() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userPending, userError, userData } = useCurrentUser();

  if (userPending) {
    return <RightNavSkeleton />;
  }

  if (userError) {
    return <p className="text-center text-red-600">{userError.message}</p>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavLink to={`/profil/${userData?.id}`}>
            <Avatar
              src={userData?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
              alt=""
              className="mr-1"
              size="sm"
            />
          </NavLink>
          <div className="relative">
            <IconButton icon={<Bell className="size-5" />} />
            <div className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-600">
              <span className="text-xs text-white">8</span>
            </div>
          </div>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/connexion">
            <Button>Connexion</Button>
          </Link>
        </>
      )}
      <ThemeToggle />
    </>
  );
}

export default RightNav;
