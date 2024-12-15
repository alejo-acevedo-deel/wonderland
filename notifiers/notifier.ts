export default abstract class Notifier {
    notifyJobNotExecuted(jobAddresses, nBlocks) {}

    notifyJobContactError(jobAddresses) {}

    notifyFailure(error) {}
}