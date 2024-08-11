import { Address, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { getAllJobsAddress } from '../services/sequencer';
import { getLastNBlocksLogs } from '../services/job';
import { sendDiscordMessage } from '../services/discord';

const N_BLOCKS = Number(process.env.N_BLOCKS || 10)

export const checkJobWork = async () => {
    const client = createPublicClient({ 
        chain: mainnet, 
        transport: http(), 
      });

      const jobAddresses = await getAllJobsAddress(client);

      const eventsPromises = jobAddresses.map(async (address) => {
        return {address, events: await getLastNBlocksLogs(BigInt(N_BLOCKS), address, client)};
      });

      const jobEvents = await Promise.all(eventsPromises);

      const emptyJobEvents = [] as Address[];
      jobEvents.forEach(({address, events}) => {
        if (!events || events.length === 0) {
          emptyJobEvents.push(address);
        }
      })

      if(emptyJobEvents.length !== 0) {
        console.info(`Find empty events for job \n${emptyJobEvents.join('\n')}`);

        await sendDiscordMessage(emptyJobEvents, N_BLOCKS);
      }
}