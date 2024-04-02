import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './Paragraph.js'

export const Paragraph: IActionPlugin = {
  pluginId: 'paragraph',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
