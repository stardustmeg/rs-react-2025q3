import { http, HttpResponse } from 'msw';

import { mockCharacters } from '@/__mocks__/mockCharacters';

export const handlers = [
  http.get(`*/character`, ({ request }) => {
    const name = new URL(request.url).searchParams.get('name');

    if (!name) {
      return HttpResponse.json({
        info: { count: 0, next: null, pages: 0, prev: null },
        results: mockCharacters,
      });
    }

    if (name === 'rick') {
      return HttpResponse.json({
        info: { count: 0, next: null, pages: 0, prev: null },
        results: mockCharacters,
      });
    }

    if (name === 'status 500') {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
