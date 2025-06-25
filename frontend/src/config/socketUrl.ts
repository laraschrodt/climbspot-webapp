export const SOCKET_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_SOCKET_URL
    ? import.meta.env.VITE_SOCKET_URL
    : process.env.SOCKET_URL || "http://localhost:3000";
