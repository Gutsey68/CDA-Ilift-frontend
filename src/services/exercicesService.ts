export const fetchExerciceAndResults = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  try {
    const response = await fetch(`/api/exercices/${id}`, {
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
