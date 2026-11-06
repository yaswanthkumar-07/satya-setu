
import { api, unwrap } from './api';

const STORAGE_KEY = 'satya_setu_auth';

// Read the saved login information
export function getStoredAuth() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Save the user's login information
function saveAuth(data) {
  if (!data?.token || !data?.user) {
    throw new Error('Invalid authentication response from server.');
  }

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      token: data.token,
      user: data.user,
    })
  );

  return data.user;
}

// Login using the MySQL backend
export async function loginUser(email, password) {
  const response = await api.post('/users/login', {
    email: email.trim(),
    password,
  });

  return saveAuth(unwrap(response));
}

// Register using the MySQL backend,
// then automatically log in the new user.
export async function registerUser(name, email, password) {
  await api.post('/users/register', {
    name: name.trim(),
    email: email.trim(),
    password,
  });

  return loginUser(email, password);
}

// Logout
export function logoutUser() {
  sessionStorage.removeItem(STORAGE_KEY);
}
