# JokeRace Plugin

## Overview
contests for communities to run, grow, and monetize.

Documentation: https://docs.jokerace.io

### Vote Plugin

The mint plugin targets the [`castVoteWithoutProof()`]() function on JokeRace Contests, which are either called once an address has already proven they are on the contest's voting allowlist for contests with allowlists, or are the only voting function called in anyone can vote contests.

##### Limitations
- This plugin only currently supports contests that are anyone can vote.

##### Sample Transactions
- [castVoteWithoutProof](https://optimistic.etherscan.io/tx/0x465dfa83d66c4536952a97958933bf695ec331051c5c012b4176ad216c458790)