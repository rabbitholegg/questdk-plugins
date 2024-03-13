import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Paragraph.js'

export const Paragraph: IActionPlugin = {
  pluginId: 'paragraph',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
