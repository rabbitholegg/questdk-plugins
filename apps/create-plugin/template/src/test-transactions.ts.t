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
