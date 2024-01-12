# Mux Protocol Plugin

## Overview
MUX Protocol is the first decentralized perpetual aggregator. It aggregates liquidity from a few popular perp platforms, such as GMX and GAINS, on top of their own native product.
The dapp is mainly on Arbitrum, but also available on other networks.

## Features
- **Network Support:** Arbitrum One
- **Aggregation Support:** Will support trades routed through the native Mux router, as well as aggregation through gmx and gains

## Limitations
- When routing through GMX, the recipient parameter is not available in the inputs. Trades routed this way will treat recipient as if it was undefined.
- Only DAI is allowed for trades routed through GAINS, so there is no tokenIn parameter in the inputs. If the rest of the inputs match, it should be implied that they used DAI.
- There may be other ways a V1 GMX trade can be routed. From my own experience, it uses the same aggregator contract that gmx V2 trades are routed through, and uses the same function signatures.

## Sample Transactions
- [GMX V2 Trade](https://arbiscan.io/tx/0x9fb4a0394ff01c7a5ed180272970b50fddee509baced24d6667fb8e944a6790b)
- [Mux Trade](https://www.tdly.co/shared/simulation/6932c3e3-8f9a-4a30-acc2-8959f1ae7554)
- [GNS trade](https://www.tdly.co/shared/simulation/4f1ddbbd-ee59-4859-a3b3-a25346149689)

## Relevent Documentation
- [Mux Documentation](https://docs.mux.network/protocol/overview)
- [Mux JS API](https://github.com/mux-world/mux.js)
- [Gains Documentation](https://gains-network.gitbook.io/docs-home/what-is-gains-network/contract-addresses)
- [GNSTrading Implementation](https://arbiscan.io/address/0xa779e5a909cafc36b9ad82cef2e76d5ff62ff061#code)
- [GMX Documentation](https://gmx-docs.io/docs/intro)
- [GMX V2 Adapter Implementation](https://arbiscan.io/address/0xe1b50bba2255bbc60e4d4cdb4c77df61d1fddd8d#code)
