export function setTokenToLocalStorage(
  token: string,
  isAuthenticated: boolean,
) {
  localStorage.setItem("sleepless_access_token", token);
  localStorage.setItem("isAuthenticated", isAuthenticated.toString());
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem("sleepless_access_token");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return { token, isAuthenticated };
}
