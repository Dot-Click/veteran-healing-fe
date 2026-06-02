/** Socket.IO attaches to the HTTP server root, not the `/api` REST prefix. */
export function getSocketBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  return apiUrl.replace(/\/api\/?$/, "");
}
