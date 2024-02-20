{{#if shouldIncludeGreaterThanOrEqual}}
import { 
  type {{capitalize actionType}}ActionParams, 
  GreaterThanOrEqual,
} from '@rabbitholegg/questdk'
{{else}}
import { type {{capitalize actionType}}ActionParams } from '@rabbitholegg/questdk'
{{/if}}

{{#if tx.length}}
import {
  createTestCase,
  type TestParams,{{#eq actionType 'bridge'}}
  Chains{{/eq}}
} from '@rabbitholegg/questdk-plugin-utils'
{{else}}
import { type TestParams } from '@rabbitholegg/questdk-plugin-utils'
{{/if}}

{{#unless tx.length}}
export const {{uppercase actionType}}_TEST: TestParams<{{capitalize actionType}}ActionParams> = {
  transaction: {
    chainId: '',
    from: '',
    hash: '',
    input: '',
    to: '',
    value: '',
  },
  params: {},
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
  {{#each tx}}
  createTestCase({{uppercase ../actionType}}_TEST_{{@index}}, 'when {{this.description}}'),
  {{/each}}
]

export const failingTestCases = [
  {{#if tx.length}}
    {{#eq actionType 'bridge'}}
    createTestCase({{uppercase actionType}}_TEST_0, 'when sourceChainId is not correct', { sourceChainId: 0 }),
    {{else}}
    createTestCase({{uppercase actionType}}_TEST_0, 'when chainId is not correct', { chainId: 0 }),
    {{/eq}}
  {{/if}}
]
