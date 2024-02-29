import {fetchQuestActionParams} from './fetchQuestData';
import { QuestActionParamsByType } from '@rabbitholegg/questdk-plugin-utils';
import { assertType, describe, test } from 'vitest'


// const mock = new MockAdapter(axios);
const TEST_UUID = 'bdd71fd1-5b7f-4f6e-90f8-469b3d6ee67e';
describe.only('fetchQuestActionParams.live', () => {

  test('should fetch quest action parameters successfully with actual API call', async () => {

    // No mock here, actual API call is made
    const result = await fetchQuestActionParams(TEST_UUID);

    // Check if result is of type QuestDetails
    assertType<QuestActionParamsByType>(result);
  });

});