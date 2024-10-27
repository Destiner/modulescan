import ky from 'ky';

interface Response {
  data: {
    traces: Trace[];
  }[];
}

interface Trace {
  from: string;
  to: string;
  input: string;
  transactionHash: string;
}

async function fetchTraces(
  chainId: number,
  from: string,
  to: string[],
): Promise<Trace[]> {
  // Use ky to make a POST request to the REST API
  const endpoint = `https://${chainId}.hypersync.xyz/query`;
  const response = await ky
    .post<Response>(endpoint, {
      json: {
        from_block: 0,
        max_num_traces: 100,
        traces: [
          {
            from: [from],
            to,
          },
        ],
        field_selection: {
          trace: ['transaction_hash', 'from', 'to', 'input'],
        },
      },
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers here, such as authentication tokens
      },
    })
    .json();
  const data = response.data[0];
  if (!data) {
    throw new Error('No data returned from HyperSync server');
  }
  const traces = data.traces;
  if (!traces) {
    throw new Error('No traces returned from HyperSync server');
  }
  return traces;
}

// eslint-disable-next-line import-x/prefer-default-export
export { fetchTraces };
