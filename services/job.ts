import { PublicClient, Address } from "viem";
import { getEvents } from "../contracts/job";

export const getLastNBlocksLogs = async (n: bigint, jobAddress: Address, client: PublicClient) => {
    const lastBlockNumber = await client.getBlockNumber();

    if (!lastBlockNumber) throw new NotBlockNumberError();

    const olderBlockNumber = lastBlockNumber - n;

    console.info(`Geting logs from block ${olderBlockNumber} to block ${lastBlockNumber} for job ${jobAddress}`);

    return getEvents({from: olderBlockNumber, to: lastBlockNumber}, {client, address: jobAddress});
}