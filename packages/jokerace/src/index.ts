import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  propose,
  proposeWithoutProof,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './JokeRace.js'

export const JokeRace: IActionPlugin = {
  pluginId: 'jokerace',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  propose,
  proposeWithoutProof,
}
