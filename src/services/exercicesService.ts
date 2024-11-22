import useAuth from '../hooks/useAuth';

export const fetchExerciceAndResults = async (id: string) => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  try {
    const response = await fetch(`http://localhost:3000/api/exercices/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { message: errorData.error || 'Non autorisé', status: response.status };
    }

    return response.json();
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};
