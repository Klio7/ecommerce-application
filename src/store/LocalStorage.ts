export function setTokenToLocalStorage(
  token: string,
  isAuthenticated: boolean,
) {
  localStorage.setItem("sleepless_access_token", token);
  localStorage.setItem("isAuthenticated", isAuthenticated.toString());
}

export function setClientIdToLocalStorage(clientId: string) {
  localStorage.setItem("client_id", clientId);
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem("sleepless_access_token");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return { token, isAuthenticated };
}

export function getClientIdFromLocalStorage() {
  return localStorage.getItem("client_id");
}

export function setCartIdFromLocalStorage(cartId: string) {
  return localStorage.setItem("cartId", cartId);
}

export function getCartIdFromLocalStorage() {
  return localStorage.getItem("cartId");
}

export function removeCartIdFromLocalStorage() {
  return localStorage.removeItem("cartId");
}
