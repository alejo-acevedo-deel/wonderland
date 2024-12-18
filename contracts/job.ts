import { Address } from 'viem';
import { GetEventsParams, ContractMethodOptions } from '../types/contracts'
import Contract from './contract_interface';

const ABI = [{"inputs":[{"internalType":"address","name":"_sequencer","type":"address"},{"internalType":"address","name":"_ilkRegistry","type":"address"},{"internalType":"address","name":"_autoline","type":"address"},{"internalType":"uint256","name":"_thi","type":"uint256"},{"internalType":"uint256","name":"_tlo","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"NotMaster","type":"error"},{"inputs":[{"internalType":"uint256","name":"line","type":"uint256"},{"internalType":"uint256","name":"nextLine","type":"uint256"}],"name":"OutsideThreshold","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"network","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"ilk","type":"bytes32"}],"name":"Work","type":"event"},{"inputs":[],"name":"autoline","outputs":[{"internalType":"contract AutoLineLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ilkRegistry","outputs":[{"internalType":"contract IlkRegistryLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sequencer","outputs":[{"internalType":"contract SequencerLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"thi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tlo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vat","outputs":[{"internalType":"contract VatLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"},{"internalType":"bytes","name":"args","type":"bytes"}],"name":"work","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"network","type":"bytes32"}],"name":"workable","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"}] as const;

export default class Job extends Contract {
    constructor(address: Address) {
        super(ABI, address);
    }

    getWorkEvents(n: bigint) {
        return this.getLastNEvents({n, eventName: 'Work'});
    }
}

