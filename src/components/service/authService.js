const API_URL = "http://localhost:4000/users"; 

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token); // Store JWT token in localStorage
    return data;
  } else {
    throw new Error(data.message || "Failed to login");
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token != null;
};

export const logout = () => {
  localStorage.removeItem("token");
};
