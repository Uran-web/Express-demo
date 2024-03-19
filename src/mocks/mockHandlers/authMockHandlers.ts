import { http, HttpResponse } from 'msw';

import '../../loadEnvironments';
import { emailValidation } from '../../helpers/emailValidation';
import { passwordValidation } from '../../helpers/passwordValidation';
import { IUser } from '../../models/user.model';

export interface IMessage {
  username?: string;
  email?: string;
  password?: string;
}

type SignupRequestBody = Pick<IUser, 'username' | 'email' | 'password'>;
type SignupParams = {};
type SignUpResponseBody = {
  success?: string;
  error?: IMessage | string;
  statusCode?: number;
};

const BASE_URL = `${process.env.BASE_URL}:${process.env.PORT}`;

export const authHandlers = [
  http.get(`${BASE_URL}/auth/check`, () => {
    return HttpResponse.json({ loggedIn: true });
  }),

  http.post<
    SignupParams,
    SignupRequestBody,
    SignUpResponseBody,
    `${string}/auth/signup`
  >(`${BASE_URL}/auth/signup`, async ({ request }) => {
    let message: SignUpResponseBody = {};

    const requestBody = await request.json();

    if (
      emailValidation(requestBody.email) &&
      requestBody.username.length &&
      passwordValidation(requestBody.password)
    ) {
      message = {
        success: 'User was created',
        statusCode: 200,
      };
    }

    if (!emailValidation(requestBody.email)) {
      message = { error: { email: 'Invalid email address' }, statusCode: 400 };
    } else if (!requestBody.username.length) {
      message = {
        error: { username: 'Name is required field!' },
        statusCode: 400,
      };
    } else if (!passwordValidation(requestBody.password)) {
      message = {
        error: {
          password:
            'Password should contain 8 characters,\n at least 1 lower case and 1 upper case letter,\n at lease one number and "_" symbol',
        },
        statusCode: 400,
      };
    }

    return HttpResponse.json(message);
  }),

  http.post<
    SignupParams,
    SignupRequestBody,
    SignUpResponseBody,
    `${string}/auth/signin`
  >(`${BASE_URL}/auth/signin`, async ({ request }) => {
    const requestBody = await request.json();
    let message: SignUpResponseBody = {};

    if (
      emailValidation(requestBody.email) &&
      passwordValidation(requestBody.password)
    ) {
      message = {
        success: 'Login was successful',
      };
    } else if (!emailValidation(requestBody.email)) {
      message = { error: { email: 'Invalid email address' }, statusCode: 400 };
    } else if (!passwordValidation(requestBody.password)) {
      message = {
        error: {
          password:
            'Password should contain 8 characters,\n at least 1 lower case and 1 upper case letter,\n at lease one number and "_" symbol',
        },
        statusCode: 400,
      };
    }

    return HttpResponse.json(message);
  }),

  http.get(`${BASE_URL}/auth/signout`, async () => {
    return HttpResponse.json({ success: 'Signed out' });
  }),
];
