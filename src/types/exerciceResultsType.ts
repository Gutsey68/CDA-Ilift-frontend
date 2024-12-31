export type ExerciseResult = {
  id: string;
  createdAt: string;
  updatedAt: string;
  exerciceId: string;
  userId: string;
  sets: {
    id: string;
    reps: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    exerciceResultId: string;
  }[];
  user?: {
    id: string;
    pseudo: string;
    email: string;
    passwordHash: string;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
    profilePhoto: string | null;
    roleId: string | null;
    cityId: string | null;
  };
};
