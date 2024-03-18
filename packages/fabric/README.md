# Fabric Plugin

## Overview
Fabric and the Subscription Token Protocol extends the Non Fungible Token standard with the addition of a temporal dimension, and economic incentives for distribution, adoption, growth, and retention.

Documentation: https://docs.withfabric.xyz/stp/overview

Mint Gallery: https://hypersub.withfabric.xyz/

### Mint Plugin

The mint plugin targets the mint functions on the [SubscriptionTokenV1](https://basescan.org/address/0x90e1c94ca5e161acb420e59d8be5041db931c9dd#code) contract. There are 4 functions that mints may be routed through.

- `mint`
- `mintFor`
- `mintWithReferral`
- `mintWithReferralFor`

The `mintFor` methods are used when the NFT is gifted to another address. Referral methods are used when referral metadata is attached to the transaction. Otherwise these all are very similar.

The only parameter on the mint function is `numTokens` which is the same value as `transaction.value` when ETH is used for the mint. 

On `mintFor` there is an extra parameter called `account` which is the recipient of the NFT when the gift option is choosen on the frontend. This parameter will map to the `recipient`.

##### Limitations
- only 1 subscription NFT can be minted per transaction, so the `amount` paramenter is ignored.

##### Sample Transactions
- [mint](https://basescan.org/tx/0xc0eaf3fa1e32bf3b32ff12e6f5d98b14b46865b62416237b7ed9bc898a5d7d93)
- [mintFor](https://basescan.org/tx/0x5b48379058011a2fd5419b236019b37768ffc2333c03ab097dd6d7fab432c31e)