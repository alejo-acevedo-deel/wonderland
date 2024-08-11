import { PublicClient, Address } from "viem";
import { getJobs, getNumJobs } from "../contracts/sequencer";

export const getAllJobsAddress = async (client: PublicClient) => {
    const numJobs = await getNumJobs({client});
    const jobIndexes = Array.from({length: Number(numJobs.toString())}, (_, index) => BigInt(index));

    const results = await getJobs({indexes: jobIndexes}, {client});

    return results.map(({result}) => result) as Address[];
}