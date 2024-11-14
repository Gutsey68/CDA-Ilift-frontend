export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const response = await fetch(`http://localhost:3000/api/posts/users/${id}/tableau-de-bord`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Non autorisé');
  }

  return response.json();
};
