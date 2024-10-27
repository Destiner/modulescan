import ky from 'ky';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function request<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = 'https://indexer.bigdevenergy.link/e8000fd/v1/graphql';

  const response: GraphQLResponse<T> = await ky
    .post(endpoint, {
      json: {
        query,
        variables,
      },
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers here, such as authentication tokens
      },
    })
    .json();

  if (response.errors) {
    throw new Error(response.errors.map((e) => e.message).join(', '));
  }

  if (!response.data) {
    throw new Error('No data returned from GraphQL server');
  }

  return response.data;
}

// eslint-disable-next-line import-x/prefer-default-export
export { request };
