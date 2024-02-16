import { BaseError } from './base.js'

export class AssertQuestError extends BaseError {
  override name = 'AssertQuestError'
  constructor({ docsPath }: { docsPath?: string } = {}) {
    super(['The quest is not valid.'].join('\n'), {
      docsPath,
      docsSlug: 'quest',
    })
  }
}
