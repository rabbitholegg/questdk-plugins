# Mirror Plugin

## Overview
Mirror is a web3 publishing platform for writers which help creators connect with their traget ausiences in a more direct way.

## Features
- **Network Support:** Compatible with Optimism, Base, Zora and Linea

## Limitations
- Collecting Mirror Entries utilizes ERC-721 tokens, which increments by 1 after every mint. Because of this, it is not practical to use the tokenId.
- There is a limit of 1 mint (collect entry) per account, so if the required amount is set higher than 1, the quest will be impossible to complete.

## Sample Transactions
- [Collect Entry On Zora](https://explorer.zora.energy/tx/0xaffb3da18ce604a3886403047dcae5402697128384becdb02b00f510217b2412)
- [Collect Entry On Optimism](https://optimistic.etherscan.io/tx/0x5298ea426b854085b26e3625d3ba84e03420d554350c1f26da79178b8c2e9d3a)

## Notes
- URLs can be built using the contract address and chain id, like so `https://mirror.xyz/${chainId}/${contractAddress}`
- Example Link: https://mirror.xyz/7777777/0x189950164e777796CDF8844E030c300A01e65d1c
