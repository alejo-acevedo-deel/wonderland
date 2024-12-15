import { Address } from "viem";
import Job from "../contracts/job";

const getEvents = async (n: bigint, jobAddress: Address) => {
    try {
        const job = new Job(jobAddress);
        const events = await job.getWorkEvents(n);

        return {success: true, jobAddress, events};
    } catch (error) {
        console.warn(`Error getting job events: ${error.message} for job ${jobAddress}`);

        return {success: false, jobAddress, error};
    }
}

export const getLastNBlocksLogs = async (n: bigint, jobAddresses: Address[]) => {
    const promiseResults = jobAddresses.map(addres => getEvents(n, addres));

    return await Promise.all(promiseResults);
}