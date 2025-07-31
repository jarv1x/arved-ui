export function useAuth() {
  const getToken = () => localStorage.getItem('token');

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return { getToken, setToken, logout };
}
