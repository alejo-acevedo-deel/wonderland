import { Address } from "viem";
import Sequencer from "../contracts/sequencer";

export const getAllJobsAddress = async () => {
    const sequencer = new Sequencer()
    const numJobs = await sequencer.getNumJobs()
    const jobIndexes = Array.from({length: Number(numJobs.toString())}, (_, index) => BigInt(index));

    const results = await sequencer.getJobs({ indexes: jobIndexes });

    return results.map(({result}) => result) as Address[];
}