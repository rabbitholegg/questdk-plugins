## Orbit Lending

Orbit is a decentralized liquidity protocol that facilitates the lending and borrowing of Blast assets. Orbit's innovation is to make use of Blast's native yield to provide a better lending / borrowing experience. The protocol is expected to generate yields that are more competitive to existing lending protocols

**Documentation** - https://book.orbitlending.io/

### Implementation Details

#### Stake Plugin

The stake plugin targets the VE_ORBIT token contract which allows users to stake their ORBIT tokens in exchange for yield, and blast points. There is only one compatible token (ORBIT) and you can lock your stake for a higher rate of reward emissions. Staking times can range from 1 day to 4 years. The lock time is shown as a timestamp (in seconds) which is the time you will be allowed to withdraw your tokens.

The contract function will will be filtering for is:

- `create_lock`


### Sample Transactions

- [create_lock](https://blastscan.io/tx/0x9e4dadb4b8be32aa979367940a0316a0270aea5988853d26124568ac0a092fd8)
