{{#hasAmountKey tx}}
import { 
  type {{capitalize actionType}}ActionParams, 
  GreaterThanOrEqual,
} from '@rabbitholegg/questdk'
{{else}}
import { type {{capitalize actionType}}ActionParams } from '@rabbitholegg/questdk'
{{/hasAmountKey}}
import {
  createTestCase,
  type TestParams,{{#eq actionType 'bridge'}}{{#if tx.length}}
  Chains{{/if}}{{/eq}}
} from '@rabbitholegg/questdk-plugin-utils'

{{#unless tx.length}}
// values are placeholders, replace with actual values from your test transaction
export const {{uppercase actionType}}_TEST: TestParams<{{capitalize actionType}}ActionParams> = {
  transaction: {
    chainId: 1,
    from: '0x0',
    hash: '0x0',
    input: '0x0',
    to: '0x0',
    value: '0',
  },
  params: {
  {{#eq actionType 'bridge'}}
    sourceChainId: 0,
    destinationChainId: 0,
  {{else}}
  {{#eq actionType 'mint'}}
    chainId: 0,
    contractAddress: '0x0',
  {{else}}
  {{#eq actionType 'burn'}}
    chainId: 0,
    contractAddress: '0x0',
  {{else}}
  {{#eq actionType 'delegate'}}
    chainId: 0,
    project: '0x0',
  {{else}}
  {{#eq actionType 'vote'}}
    chainId: 0,
    project: '0x0',
  {{else}}
    chainId: 0,
  {{/eq}}
  {{/eq}}
  {{/eq}}
  {{/eq}}
  {{/eq}}
  },
}
{{/unless}}
{{#each tx}}
export const {{uppercase ../actionType}}_TEST_{{@index}}: TestParams<{{capitalize ../actionType}}ActionParams> = {
  transaction: {
    chainId: {{this.transaction.chainId}},
    from: '{{this.transaction.from}}',
    hash: '{{this.transaction.hash}}',
    input: '{{this.transaction.input}}',
    to: '{{this.transaction.to}}',
    value: '{{this.transaction.value}}',
  },
  params: {
    {{#each this.params}}
    {{@key}}: {{{addressToString this}}},
    {{/each}}
  },
}
{{/each}}

export const passingTestCases = [
  {{#unless tx.length}}
  createTestCase({{uppercase actionType}}_TEST, 'this is a demo test'),
  {{/unless}}
  {{#each tx}}
  createTestCase({{uppercase ../actionType}}_TEST_{{@index}}, 'when {{this.description}}'),
  {{/each}}
]

export const failingTestCases = [
  {{#unless tx.length}}
  {{#eq actionType 'bridge'}}
  createTestCase({{uppercase actionType}}_TEST, 'when sourceChainId is not correct', { sourceChainId: 99 }),
  {{else}}
  createTestCase({{uppercase actionType}}_TEST, 'when chainId is not correct', { chainId: 99 }),
  {{/eq}}
  {{/unless}}
  {{#if tx.length}}
  {{#eq actionType 'bridge'}}
  createTestCase({{uppercase actionType}}_TEST_0, 'when sourceChainId is not correct', { sourceChainId: 0 }),
  {{else}}
  createTestCase({{uppercase actionType}}_TEST_0, 'when chainId is not correct', { chainId: 0 }),
  {{/eq}}
  {{/if}}
]
