import ky from "ky";

const api = ky.create({prefixUrl: 'https://furniture-db.onrender.com/'})

export default api;