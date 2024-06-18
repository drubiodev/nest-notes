const BASE_URL = "http://localhost:8000";

const fetchAPI = async (url, method, data = null) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    throw error;
  }
};

export const getNotes = () => fetchAPI(`${BASE_URL}/notes`, "GET");

export const saveNote = (note) => fetchAPI(`${BASE_URL}/notes`, "POST", note);
