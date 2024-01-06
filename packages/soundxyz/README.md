# Sound.xyz Plugin

## Overview
Sound.xyz is the decentralized music marketplace where artists and their fans can connect in a more direct way. Every track on sound.xyz can be minted as an NFT with the proceeds going directly to the artist. 

## Implementation Details

There is two contracts that are used as entry points for a mint. Both use the same `mintTo` function. 
- [SuperMinter](https://optimistic.etherscan.io/address/0x0000000000cf4558c36229ac0026ee16d3ae35cd#code)
- [SuperMinterV2](https://optimistic.etherscan.io/address/0x000000000001a36777f9930aaeff623771b13e70#code)

### Sample Transactions
- [superMinter](https://optimistic.etherscan.io/tx/0x29635c012e7b62b918281ac6745b00055e5edc0c2a23d24589192f814a2341e0)
- [SuperMinterV2](https://optimistic.etherscan.io/tx/0x8700a2cd751f28f98ae62e0bceba075bc2be9353000569dadd1ff117b8575907)