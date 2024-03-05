const maxlen = 6;

export function generate() {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < maxlen; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
