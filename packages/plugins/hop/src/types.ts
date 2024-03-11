export interface L1BridgeProps {
  l1CanonicalToken: string
  l1Bridge: string
  bridgeDeployedBlockNumber: number
}

export interface L2BridgeProps {
  l1CanonicalBridge: string
  l1MessengerWrapper: string
  l2CanonicalBridge: string
  l2CanonicalToken: string
  l2Bridge: string
  l2HopBridgeToken: string
  l2AmmWrapper: string
  l2SaddleSwap: string
  l2SaddleLpToken: string
  bridgeDeployedBlockNumber: number
}

export interface Bridge {
  [networkName: string]: L1BridgeProps | L2BridgeProps
}

export type Bridges = {
  [tokenSymbol: string]: Bridge
}
