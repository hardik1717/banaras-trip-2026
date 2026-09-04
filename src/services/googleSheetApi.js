const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

export async function getTripData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to load trip data:", error);
    throw error;
  }
}