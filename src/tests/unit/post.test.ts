import request from 'supertest';

import '../../loadEnvironments';

const BASE_URL = `${process.env.BASE_URL}:${process.env.PORT}`;

describe('GET /posts', () => {
  it('Should return all posts from db', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET the first post', async () => {
    const res = await request(BASE_URL).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toMatchObject({
      _id: '12de057x9fbh6ded2bdq7r26',
      name: 'Holly',
      age: '28',
      graduated: true,
      contacts: { phone: '+180995667349', email: 'hollyGrande@gmail.com' },
      date: '2024-03-10T19:09:48.920Z',
      createdAt: '2024-03-15T17:15:22.335Z',
    });
  });

  it('Should return 404 error if path is not correct', async () => {
    const res = await request(BASE_URL).get('/postss');
    expect(res.statusCode).toBe(404);
  });

  it('Create post request', async () => {
    const result = await request(BASE_URL).post('/posts');
    expect(result.statusCode).toBe(200);
    expect(result.body.message).toBe('Post have been added');
  });

  it('Delete post request. Should return 202', async () => {
    const result = await request(BASE_URL).delete(
      '/posts/12de057x9fbh6ded2bdq7r26'
    );
    expect(result.statusCode).toBe(202);
    expect(result.text).toBe('Post was successfully deleted');
  });

  it('Delete post request without postId. Should return 404', async () => {
    const result = await request(BASE_URL).delete('/posts');
    expect(result.statusCode).toBe(404);
    expect(result.text).toBe('Post not found');
  });

  
});
