import { Address } from "viem";
import Notifier from "../notifiers/notifier";

export const notify = async (jobEvents, nBloks, to: Notifier[]) => {
  const emptyJobEvents = [] as Address[];
  const errorJobEvents = [] as Address[];
  
  jobEvents.forEach(({success, jobAddress, events }) => {
    if (!success) {
      errorJobEvents.push(jobAddress);
      return;
    }

    if (!events || events.length === 0) {
      emptyJobEvents.push(jobAddress);
    }
  })

  
  for (const notifier of to) {
    if (errorJobEvents.length)
      await notifier.notifyJobContactError(errorJobEvents);

    if (emptyJobEvents.length)
      await notifier.notifyJobNotExecuted(emptyJobEvents, nBloks)
  }
}

export const notifyFailure = async (error, to: Notifier[]) => {
  for (const notifier of to) {
      await notifier.notifyFailure(error);
  }
}
