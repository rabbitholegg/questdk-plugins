## Lens

Lens Protocol is a decentralized social graph protocol designed to empower developers to build and innovate on top of a user-owned social network, providing seamless integration and interoperability across various applications.

## Collect Plugin

### Implementation Details

Lens Collect action will use the Indexer V4 along with the Lens GraphQL endpoint to determine if a certain address has collected a post.

Since there is no current way to query the time that a post was "collected" in Lens, so if someone has collected a post before a boost has started, they will be eligible for rewards. The only way around this would be to capture the data in on-chain events.

The endpoint to query for collected posts is `whoActedOnPublication` which returns a paginated response of addresses who have collected a specific postId.

https://lens-protocol.github.io/lens-sdk/classes/_lens_protocol_client.Core.Profile.html#whoActedOnPublication

There is no way to filter this response, so we will need to check each page of the response to see if the address has collected the post.

### Example Collect Post

https://hey.xyz/posts/0x015f34-0x1d4a