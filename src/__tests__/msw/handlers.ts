import { http, HttpResponse } from 'msw';

import { mockInfo } from '@/__mocks__/mockInfo';

export const handlers = [
  http.get(`*/character`, ({ request }) => {
    const name = new URL(request.url).searchParams.get('name');

    if (!name) {
      return HttpResponse.json(mockInfo);
    }

    if (name === 'rick') {
      return HttpResponse.json(mockInfo);
    }

    if (name === 'status 500') {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
