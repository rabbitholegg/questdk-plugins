import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  vote,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './JokeRace.js'

export const JokeRace: IActionPlugin = {
  pluginId: 'jokerace',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  vote,
}
