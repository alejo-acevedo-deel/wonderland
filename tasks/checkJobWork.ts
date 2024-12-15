import Discord from '../notifiers/discord';
import { getAllJobsAddress } from '../services/sequencer';
import { getLastNBlocksLogs } from '../services/job';
import { notify, notifyFailure } from '../services/notify';

const N_BLOCKS = Number(process.env.N_BLOCKS || 10)

export const checkJobWorkHandler = async () => {
      try {
            const jobAddresses = await getAllJobsAddress();

            const jobEvents = await getLastNBlocksLogs(BigInt(N_BLOCKS), jobAddresses)

            await notify(jobEvents, N_BLOCKS, [new Discord()])
      } catch (error) {
            await notifyFailure(error, [new Discord()])
      }
}