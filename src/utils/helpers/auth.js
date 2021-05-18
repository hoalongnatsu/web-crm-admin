const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const clearToken = () => localStorage.removeItem("token");

const authenticated = () => {
  const token = getToken();

  if (token && token.includes("Bearer")) {
    return true;
  }

  return false;
}

const setAuthInfo = (info, token) => {
  setToken(token);
  localStorage.setItem("admin:info", JSON.stringify(info));
}

const clearAuthInfo = () => {
  clearToken();
  localStorage.removeItem("admin:info");
}

const auth = {
  authenticated,
  getToken,
  setToken,
  clearToken,
  setAuthInfo,
  clearAuthInfo
}

export default auth;
