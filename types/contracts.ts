import { Address, PublicClient } from "viem"

export interface ContractMethodOptions {
    client: PublicClient,
    address: Address
}

export interface GetEventsParams {
    from: bigint,
    to: bigint
}

export interface GetJobsParams {
    indexes: bigint[]
}