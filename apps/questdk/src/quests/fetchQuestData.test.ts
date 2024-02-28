import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {fetchQuestActionParams, fetchQuestByUUID} from './fetchQuestData';
import { QuestActionParamsByType, type QuestDetails } from '@rabbitholegg/questdk-plugin-utils';
import { assertType, describe, expect, test, afterEach } from 'vitest'

const mock = new MockAdapter(axios);

describe('fetchQuestActionParams', () => {
  afterEach(() => {
    mock.reset();
  });

  test.only('should fetch quest action parameters successfully with actual API call', async () => {
    const uuid = 'b5cd5e86-f1e7-447c-ae73-8c142204ffbc';

    // No mock here, actual API call is made
    const result = await fetchQuestActionParams(uuid);

    // Check if result is of type QuestDetails
    assertType<QuestActionParamsByType>(result);
  });

  test('should fetch quest action parameters successfully with mock', async () => {
    const uuid = 'b5cd5e86-f1e7-447c-ae73-8c142204ffbc';
    const mockResponse: QuestDetails =  {
      actionSpecId: null,
      allowlistEnabled: true,
      id: 'test-id',
      appLink: 'https://app.example.com',
      creatorAddress: '0x1234567890abcdef',
      contractAddress: '0xabcdef1234567890',
      eligibility: { eligible: true },
      iconOption: 'option1',
      imagePath: '/path/to/image.png',
      instructionsUrl: 'https://instructions.example.com',
      name: 'Test Quest',
      network: 'ethereum',
      disabled: false,
      questAttributes: null,
      questEnd: '2023-01-01T00:00:00Z',
      questStart: '2022-01-01T00:00:00Z',
      description: 'This is a test quest',
      status: 'active',
      isReceiptEnabled: true,
      allowlistId: null,
      accessListId: null,
      rewards: [] as any, // Fill with correct test data
      tasks: [] as any, // Fill with correct test data
      filters: null,
      abiInputFilters: null,
      questAddress: '0xabcdef1234567890',
      totalParticipants: 100,
      numberMinted: 50,
      receiptsMinted: 50,
      participants: [{ account: '0x1234567890abcdef', amount: '100' }],
      questFactoryAddress: '0xabcdef1234567890',
      queued: false,
      isPublic: null,
      actionParams: { } as any,// Fill with correct test data
    };
    mock.onGet(`https://api.rabbithole.gg/quest/public/${uuid}`).reply(200, { mockResponse });

    const result = await fetchQuestByUUID(uuid);

    expect(result).toEqual(mockResponse);
  });

  test('should throw an error when the request fails', async () => {
    const uuid = 'b5cd5e86-f1e7-447c-ae73-8c142204ffbc';
    mock.onGet(`https://api.rabbithole.gg/quest/public/${uuid}`).reply(500);

    await expect(fetchQuestByUUID(uuid)).rejects.toThrow('Failed to fetch quest data');
  });
});