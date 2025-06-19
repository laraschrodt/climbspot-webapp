const API_BASE = '/api/locations';

export async function getReviews(locationId: string) {
  try {
    const response = await fetch(`${API_BASE}/${locationId}/reviews`);
    if (!response.ok) throw new Error('Fehler beim Laden der Bewertungen');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function submitReview(locationId: string, content: string) {
  try {
    const response = await fetch(`${API_BASE}/${locationId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Speichern der Bewertung:', error);
    throw error;
  }
}
