import client from './client';

export const writePost = ({ title, body, tags }) => {
  return client.post('/api/posts', { title, body, tags });
};

export const readPost = (id) => {
  return client.get(`/api/posts/${id}`);
};

export const listPosts = ({ page, username, tag }) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  });
};

export const updatePost = ({ id, title, body, tags }) => {
  return client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });
};

export const removePost = (id) => {
  return client.delete(`/api/posts/${id}`);
};
