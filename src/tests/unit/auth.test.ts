import request from 'supertest';
import '../../loadEnvironments';

const BASE_URL = `${process.env.BASE_URL}:${process.env.PORT}`;

interface IPayload {
  username: string;
  email: string;
  password: string;
}

let payload: IPayload;
let loginPayload: Omit<IPayload, 'username'>;

describe('Test authentication routes', () => {
  beforeEach(() => {
    payload = {
      username: 'test',
      email: 'test@gamil.com',
      password: 'qwerty12345_ABC',
    };

    loginPayload = {
      email: 'test@gamil.com',
      password: 'qwerty12345_ABC',
    };
  });

  it('Should return boolean value and status 200', async () => {
    const res = await request(BASE_URL).get('/auth/check');
    expect(res.body.loggedIn).toBeTruthy;
  });

  it('Should return 201', async () => {
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe('User was created');
  });

  it('Test invalid username', async () => {
    payload.username = '';
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error.username).toBe('Name is required field!');
  });

  it('Test invalid email', async () => {
    payload.email = 'fake';
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error.email).toBe('Invalid email address');
  });

  it('Test invalid password', async () => {
    payload.password = 'only_small_letters';
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error.password).toBe(
      'Password should contain 8 characters,\n at least 1 lower case and 1 upper case letter,\n at lease one number and "_" symbol',
    );
  });

  it('Should return logged in user', async () => {
    const res = await request(BASE_URL)
      .post('/auth/signin')
      .send(loginPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe('Login was successful');
  });

  it('Test invalid email', async () => {
    payload.email = 'fake';
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error.email).toBe('Invalid email address');
  });

  it('Test invalid password', async () => {
    payload.password = 'only_small_letters';
    const res = await request(BASE_URL)
      .post('/auth/signup')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error.password).toBe(
      'Password should contain 8 characters,\n at least 1 lower case and 1 upper case letter,\n at lease one number and "_" symbol',
    );
  });

  it('Should sign out user', async () => {
    const res = await request(BASE_URL).get('/auth/signout');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe('Signed out');
  });
});
