const mockReadContract = jest.fn();
const mockMulticall = jest.fn();
const mockGetContractEvents = jest.fn();
const mockGetBlockNumber = jest.fn();

jest.mock('viem', () => ({
    http: jest.fn(),
    createPublicClient: jest.fn(() => {
        return {
            readContract: mockReadContract,
            multicall: mockMulticall,
            getContractEvents: mockGetContractEvents,
            getBlockNumber: mockGetBlockNumber
        }
    })
}));

import Discord from '../notifiers/discord'

jest.mock('../notifiers/discord')

import { checkJobWorkHandler } from "../tasks/checkJobWork";
import { mockEventData } from "./util"

describe('Check Job Work', () => {
    it('when numJobs is 2 should make a multicall for two', async () => {
        mockReadContract.mockResolvedValue(2);
        mockMulticall.mockResolvedValue([]);

        await checkJobWorkHandler();

        expect(mockMulticall).toHaveBeenCalledWith({contracts:[
                {
                    address: expect.stringMatching('0x.*'),
                    abi: expect.anything(),
                    functionName: 'jobAt',
                    args: [BigInt(0)]
                },
                expect.objectContaining({
                    address: expect.stringMatching('0x.*'),
                    abi: expect.anything(),
                    functionName: 'jobAt',
                    args: [BigInt(1)]
                })
            ]}
        )
    })

    it('when job address is returned getContractEvents should be called', async () => {
        mockReadContract.mockResolvedValue(2);
        mockMulticall.mockResolvedValue([{result: '0xaddressJob1'}, {result: '0xaddressJob2'}]);
        mockGetBlockNumber.mockResolvedValue(BigInt(20));

        await checkJobWorkHandler();

        expect(mockGetContractEvents).toHaveBeenCalledTimes(2)
        expect(mockGetContractEvents).toHaveBeenCalledWith(
            {
                address: '0xaddressJob1',
                abi: expect.anything(),
                eventName: 'Work',
                fromBlock: BigInt(10),
                toBlock: BigInt(20)
            }
        )

        expect(mockGetContractEvents).toHaveBeenCalledWith(
            {
                address: '0xaddressJob2',
                abi: expect.anything(),
                eventName: 'Work',
                fromBlock: BigInt(10),
                toBlock: BigInt(20)
            }
        )
    })

    it('should call to send discord message only for the address without event', async () => {
        mockReadContract.mockResolvedValue(2);
        mockMulticall.mockResolvedValue([{result: '0xaddressJob1'}, {result: '0xaddressJob2'}]);
        mockGetBlockNumber.mockResolvedValue(BigInt(20));
        mockGetContractEvents.mockImplementation((({address}) => {
            if(address === '0xaddressJob1')
                return [mockEventData];

            return [];
        }));

        const mockedNotifyJobNotExecuted = jest.spyOn(Discord.prototype, 'notifyJobNotExecuted')

        await checkJobWorkHandler();

        expect(mockedNotifyJobNotExecuted).toHaveBeenCalledWith(['0xaddressJob2'], 10);
    })
})