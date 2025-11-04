export const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const endpoints = {
register: () => `${BASE}/api/auth/register`,
login: () => `${BASE}/api/auth/login`,
me: () => `${BASE}/api/users/me`,
posts: () => `${BASE}/api/posts`,
comments: (postId) => `${BASE}/api/comments/${postId}`
};


export function authHeaders() {
const token = localStorage.getItem('token');
return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}
