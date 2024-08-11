import { Address } from 'viem'
import { ContractMethodOptions, GetJobsParams } from '../types/contracts'

const ADDRESS = (process.env.SEQUENCER_ADDRESS || '0x238b4E35dAed6100C6162fAE4510261f88996EC9') as Address;

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"exclEndIndex","type":"uint256"}],"name":"BadIndicies","type":"error"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"name":"IndexTooHigh","type":"error"},{"inputs":[{"internalType":"address","name":"network","type":"address"}],"name":"JobDoesNotExist","type":"error"},{"inputs":[{"internalType":"address","name":"job","type":"address"}],"name":"JobExists","type":"error"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"NetworkDoesNotExist","type":"error"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"NetworkExists","type":"error"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"WindowZero","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"job","type":"address"}],"name":"AddJob","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"network","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"windowSize","type":"uint256"}],"name":"AddNetwork","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usr","type":"address"}],"name":"Deny","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usr","type":"address"}],"name":"Rely","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"job","type":"address"}],"name":"RemoveJob","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"RemoveNetwork","type":"event"},{"inputs":[{"internalType":"address","name":"job","type":"address"}],"name":"addJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"},{"internalType":"uint256","name":"windowSize","type":"uint256"}],"name":"addNetwork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"deny","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMaster","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"getNextJobs","outputs":[{"components":[{"internalType":"address","name":"job","type":"address"},{"internalType":"bool","name":"canWork","type":"bool"},{"internalType":"bytes","name":"args","type":"bytes"}],"internalType":"struct Sequencer.WorkableJob[]","name":"","type":"tuple[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndexExcl","type":"uint256"}],"name":"getNextJobs","outputs":[{"components":[{"internalType":"address","name":"job","type":"address"},{"internalType":"bool","name":"canWork","type":"bool"},{"internalType":"bytes","name":"args","type":"bytes"}],"internalType":"struct Sequencer.WorkableJob[]","name":"","type":"tuple[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"job","type":"address"}],"name":"hasJob","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"hasNetwork","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"isMaster","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"jobAt","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"networkAt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numJobs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numNetworks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"rely","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"job","type":"address"}],"name":"removeJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"removeNetwork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalWindowSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"windows","outputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"stateMutability":"view","type":"function"}] as const;

export const getNumJobs = ({client}: Omit<ContractMethodOptions, 'address'>) => {
    try {
        return client.readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'numJobs',
        });
    } catch (e) {
        console.error(e);
        throw new ContractContactError(e)
    }
};

export const getJobs = ({indexes}: GetJobsParams, {client}: Omit<ContractMethodOptions, 'address'>) => {
    const contractCallArgs = {
        address: ADDRESS,
        abi: ABI,
        functionName: 'jobAt'
    };

    const multicallArgs = indexes.map((index) => ({
        ...contractCallArgs,
        args: [index]
    }));

    try {
        return client.multicall({contracts: multicallArgs});
    } catch (e) {
        console.error(e);
        throw new ContractContactError(e)
    }
};