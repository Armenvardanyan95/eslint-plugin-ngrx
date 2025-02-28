import path from 'path'
import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils'
import {
  docsUrl,
  findNgRxStoreName,
  isArrowFunctionExpression,
  isFunctionExpression,
  isLiteral,
  pipeableSelect,
  storeSelect,
} from '../../utils'

export const messageId = 'useSelectorInSelect'
export type MessageIds = typeof messageId

type Options = []

export default ESLintUtils.RuleCreator(docsUrl)<Options, MessageIds>({
  name: path.parse(__filename).name,
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Using a selector in a select method is preferred in favor of strings or props drilling',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      [messageId]:
        'Using string or props drilling is not preferred, use a selector instead',
    },
  },
  defaultOptions: [],
  create: (context) => {
    const storeName = findNgRxStoreName(context)
    if (!storeName) return {}

    return {
      [`${pipeableSelect(storeName)}, ${storeSelect(storeName)}`]({
        arguments: args,
      }: TSESTree.CallExpression) {
        args
          .filter(
            (node) =>
              isLiteral(node) ||
              isArrowFunctionExpression(node) ||
              isFunctionExpression(node),
          )
          .forEach((node) =>
            context.report({
              node,
              messageId,
            }),
          )
      },
    }
  },
})
