import { Address, ContractFunctionArgs, PublicClient } from "viem"

export interface ContractMethodOptions {
    client: PublicClient,
    address: Address
}

export interface GetEventsParams {
    eventName: string,
    from: bigint,
    to: bigint
}

export interface GetLastNEventsParams {
    eventName: string,
    n: bigint,
}


export interface GetJobsParams {
    indexes: bigint[]
}

export interface ReadContractParams {
    functionName: string,
    args?: ContractFunctionArgs
}