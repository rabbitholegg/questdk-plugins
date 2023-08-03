import connextContracts from '@connext/smart-contracts/deployments.json'
import fs from 'fs'
import path from 'path'
import { type Abi } from 'viem'

type ConnextContractsJson = {
  [chainId: string]: {
    chainId: string
    name: string
    contracts: {
      [name: string]: {
        address: string
        abi: Abi
      }
    }
  }[]
}

const _getContract = (chainId: number, name: string) => {
  const contracts = connextContracts as ConnextContractsJson
  return contracts[chainId][0].contracts[name]
}

async function main() {
  const _CONNEXT_CONTRACT_NAME = 'Connext'
  const _networks = Object.keys(connextContracts)
  const contractAddresses: Record<string, string> = {}

  for (const network of _networks) {
    const contract = _getContract(Number(network), _CONNEXT_CONTRACT_NAME)
    if (contract) {
      contractAddresses[network] = contract.address
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../src/contract-addresses.ts'),
    JSON.stringify(contractAddresses, null, 2),
  )
}

main()
