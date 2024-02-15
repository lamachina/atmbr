import { ElectrumApiMock } from 'utils/builder/services/electrum-api-mock';

export const getMockApi = (notFound: boolean = false): any => {
  const client = new ElectrumApiMock();
  client.setAtomicalsByScripthash(() => {
    return {
    }
  });
  return client;
};
