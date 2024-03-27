import client from './client';

export const fetchUsers = () => {
  return client.get('/api/users');
};