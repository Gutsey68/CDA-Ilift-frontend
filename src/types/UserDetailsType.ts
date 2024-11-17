export type UserDetailsType = {
  id: string;
  pseudo: string;
  email: string;
  bio?: string;
  createdAt: string;
  profilePhoto?: string;
  roleId?: string;
  city?: {
    name?: string;
  };
  workouts?: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  _count?: {
    posts: number;
    followedBy: number;
    following: number;
    workouts: number;
  };
};