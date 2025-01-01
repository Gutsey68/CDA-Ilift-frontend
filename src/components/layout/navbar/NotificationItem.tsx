import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { formatRelativeTime } from '../../../lib/formatRelativeTime';
import { NotificationType } from '../../../types/notificationType';
import Avatar from '../../ui/Avatar';

type NotificationItemProps = {
  notification: NotificationType;
  onClose?: () => void;
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { user: me } = useContext(AuthContext);

  const containerClasses = `flex items-center gap-3 p-2 my-1 rounded ${!notification.isRead ? 'bg-neutral-2 hover:bg-neutral-3' : 'hover:bg-neutral-2'}`;

  const getNotificationLink = () => {
    switch (notification.type) {
      case 'follow':
        return `/profil/${notification.sender.id}`;
      case 'like':
        return `/profil/${me?.id}`;
      case 'comment':
        return `/profil/${me?.id}`;
      default:
        return '#';
    }
  };

  return (
    <Link to={getNotificationLink()} className={containerClasses}>
      <Avatar size="sm" src={notification.sender.profilePhoto || '/uploads/profil.png'} alt={`Avatar de ${notification.sender.pseudo}`} />
      <div>
        <p className="text-sm text-neutral-11">{notification.content}</p>
        <span className="text-xs text-neutral-10">{formatRelativeTime(notification.createdAt)}</span>
      </div>
    </Link>
  );
};

export default NotificationItem;
