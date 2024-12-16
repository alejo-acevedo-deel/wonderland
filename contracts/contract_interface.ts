import { Abi, Address, createPublicClient, createWalletClient, http, PublicClient, WalletClient } from "viem";
import { mainnet } from "viem/chains";

import { GetEventsParams, GetLastNEventsParams, ReadContractParams } from "../types/contracts";
import { ContractContactError, NotBlockNumberError } from "../errors";

export default abstract class Contract {
  abi: Abi
  address: Address
  client: PublicClient
  signingCLient: WalletClient | undefined

  constructor(abi: Abi, address: Address, privateKey?: Address) {
    this.address = address;
    this.abi = abi;
    this.client = createPublicClient({chain: mainnet, transport: http()});
    this.signingCLient = privateKey && createWalletClient({chain: mainnet, transport: http()});
  }

  async readContract({functionName, args}: ReadContractParams) {
    try {
      return await this.client.readContract({
        address: this.address,
        abi: this.abi,
        functionName,
        args
      })
    } catch (e) {
      console.error(e);
      throw new ContractContactError(e)
    }
  }

  /*
  ** Viem Multicall use Multicall contract to avoid many RCP calls https://viem.sh/docs/contract/multicall#multicall
  ** We could also use Deployless Multicall for chains without Multicall contract https://github.com/Destiner/deployless-multicall
  */
  async multicall(params: ReadContractParams[]) {
    const multicallParams = params.map(p => ({
      ...p,
      abi: this.abi,
      address: this.address
    }));

    try {
      return await this.client.multicall({contracts: multicallParams})
    } catch (e) {
      console.error(e);
      throw new ContractContactError(e)
    }
  }

  async getLastNEvents({n, eventName}: GetLastNEventsParams) {
    const lastBlockNumber = await this.client.getBlockNumber();

    if (!lastBlockNumber) throw new NotBlockNumberError();

    const olderBlockNumber = lastBlockNumber - n;

    return this.getEvents({from: olderBlockNumber, to: lastBlockNumber, eventName});
  }

  async getEvents({from, to, eventName}: GetEventsParams) {
    try {
      return this.client.getContractEvents({
          abi: this.abi,
          address: this.address,
          eventName,
          fromBlock: from,
          toBlock: to
      });
    } catch (e) {
        console.error(e)
        throw new ContractContactError(e)
    }
  }
}