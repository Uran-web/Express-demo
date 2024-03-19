import { http, HttpResponse } from 'msw';
import '../../loadEnvironments';

const BASE_URL = `${process.env.BASE_URL}:${process.env.PORT}`;

export const postHandlers = [
  http.get(`${BASE_URL}/posts`, () => {
    return HttpResponse.json([
      {
        _id: '12de057x9fbh6ded2bdq7r26',
        name: 'Holly',
        age: '28',
        graduated: true,
        contacts: {
          phone: '+180995667349',
          email: 'hollyGrande@gmail.com',
        },
        date: '2024-03-10T19:09:48.920Z',
        createdAt: '2024-03-15T17:15:22.335Z',
      },
      {
        _id: '52de057x9fjk6red4bdc7r76',
        name: 'Mike',
        age: '19',
        graduated: false,
        contacts: {
          phone: '+180495667591',
          email: 'mikeSweeter@gmail.com',
        },
        date: '2024-03-10T19:09:48.920Z',
        createdAt: '2024-03-15T17:15:22.335Z',
      },
      {
        _id: '12de057x9fbh6ded2bdq7r26',
        name: 'Garry',
        age: '56',
        graduated: true,
        contacts: {
          phone: '+160951667440',
          email: 'garryGrande@gmail.com',
        },
        date: '2024-03-10T19:09:48.920Z',
        createdAt: '2024-03-15T17:15:22.335Z',
      },
    ]);
  }),

  http.get(`${BASE_URL}/postss`, () => {
    return new HttpResponse('Not founded', {
      status: 404,
    });
  }),

  http.post(`${BASE_URL}/posts`, () => {
    return HttpResponse.json({ message: 'Post have been added' });
  }),

  http.delete(`${BASE_URL}/posts/:postId`, ({ params }) => {
    const { postId } = params;

    const status = postId ? 202 : 404;
    const message = postId ? 'Post was successfully deleted' : 'Post not found';

    return new HttpResponse(message, {
      status: status,
    });
  }),

  http.delete(`${BASE_URL}/posts`, () => {
    return new HttpResponse('Post not found', {
      status: 404,
    });
  }),
];
