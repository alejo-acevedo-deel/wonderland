import { Abi, Address, createPublicClient, createWalletClient, http, PublicClient, WalletClient } from "viem";
import { mainnet } from "viem/chains";

import { GetEventsParams, GetLastNEventsParams, ReadContractParams } from "../types/contracts";

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

    console.info(`Geting logs from block ${olderBlockNumber} to block ${lastBlockNumber} for job`);

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