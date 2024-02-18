import { type {{capitalize actionType}}ActionParams } from '@rabbitholegg/questdk'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'

{{#each tx}}
export const {{uppercase ../actionType}}_TEST_{{@index}}: TestParams<{{capitalize ../actionType}}ActionParams> = {
  transaction: {
    chainId: {{this.transactionDetails.chainId}},
    from: '{{this.transactionDetails.from}}',
    hash: '{{this.transactionDetails.hash}}',
    input: '{{this.transactionDetails.input}}',
    to: '{{this.transactionDetails.to}}',
    value: '{{this.transactionDetails.value}}',
  },
  params: {
    chainId: {{this.transactionDetails.chainId}},
    contractAddress: '{{this.transactionDetails.to}}',
    recipient: '{{this.transactionDetails.from}}',
    {{#if this.tokenId}}tokenId: {{this.tokenId}},{{/if}}
    {{#if this.amount}}amount: {{this.amount}},{{/if}}
  },
}
{{/each}}
