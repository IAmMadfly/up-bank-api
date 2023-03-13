import { UpClient } from '../helper/client';
import { TransactionsApi } from './api';

type ProcessEnv = {
  TEST_UPBANK_KEY: string;
};

function getKey(): string {
  const env: ProcessEnv = process.env as ProcessEnv;
  const key: string = env.TEST_UPBANK_KEY;

  return key;
}

test('transactions list works', async () => {
  const client: UpClient = new UpClient(getKey());
  const transactions: TransactionsApi = new TransactionsApi(client);

  const list = await transactions.list();

  if (!list.links.next) {
    return false;
  }

  const next = await list.links.next();

  expect(next).toBeTruthy();
});
