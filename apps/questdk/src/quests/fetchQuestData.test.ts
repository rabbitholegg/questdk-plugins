import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchQuestByUUID } from './fetchQuestData'
import { type QuestDetails } from '@rabbitholegg/questdk-plugin-utils'
import { describe, expect, test, afterEach } from 'vitest'

const mock = new MockAdapter(axios)
const TEST_UUID = 'bdd71fd1-5b7f-4f6e-90f8-469b3d6ee67e'
describe('fetchQuestActionParams', () => {
  afterEach(() => {
    mock.reset()
  })

  test('should fetch quest action parameters successfully with mock', async () => {
    const mockResponse: QuestDetails = {
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
      actionParams: {} as any, // Fill with correct test data
    }
    mock
      .onGet(`https://api.rabbithole.gg/v1.2/quest/public/${TEST_UUID}`)
      .reply(200, mockResponse)

    const result = await fetchQuestByUUID(TEST_UUID)

    expect(result).toEqual(mockResponse)
  })

  test('should throw an error when the request fails', async () => {
    mock
      .onGet(`https://api.rabbithole.gg/v1.2/quest/public/${TEST_UUID}`)
      .reply(500)
    await expect(fetchQuestByUUID(TEST_UUID)).rejects.toThrow(
      'Failed to fetch quest data',
    )
  })
})
