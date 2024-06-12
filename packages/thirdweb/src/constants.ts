import { DropERC1155Abi, OpenEditionERC721Abi } from './abi'
import { type AbiFunction, getAbiItem } from 'viem'

export const SUPPORTS_INTERFACE_FRAGMENT = getAbiItem({
  abi: DropERC1155Abi,
  name: 'supportsInterface',
}) as AbiFunction

// 1155 fragments
export const CLAIM_1155_FRAGMENT = getAbiItem({
  abi: DropERC1155Abi,
  name: 'claim',
}) as AbiFunction

export const GET_CLAIM_ID_1155_FRAGMENT = getAbiItem({
  abi: DropERC1155Abi,
  name: 'getActiveClaimConditionId',
}) as AbiFunction

export const GET_CLAIM_CONDITION_1155_FRAGMENT = getAbiItem({
  abi: DropERC1155Abi,
  name: 'getClaimConditionById',
}) as AbiFunction

// 721 fragments
export const CLAIM_721_FRAGMENT = getAbiItem({
  abi: OpenEditionERC721Abi,
  name: 'claim',
}) as AbiFunction

export const GET_CLAIM_ID_721_FRAGMENT = getAbiItem({
  abi: OpenEditionERC721Abi,
  name: 'getActiveClaimConditionId',
}) as AbiFunction

export const GET_CLAIM_CONDITION_721_FRAGMENT = getAbiItem({
  abi: OpenEditionERC721Abi,
  name: 'getClaimConditionById',
}) as AbiFunction
