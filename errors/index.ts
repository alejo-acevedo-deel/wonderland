class NotBlockNumberError extends Error {
    errorCode: string;
    httpCode: number;

    constructor() {
        super('Not block number obtained');
        this.errorCode = 'NOT_BLOCK_NUMBER';
        this.httpCode = 502;
    }
}

class ContractContactError extends Error {
    errorCode: string;
    httpCode: number;
    contractError: Error;

    constructor(contractError) {
        super('Error contract response');
        this.errorCode = 'CONTRACT_CONTACT_ERROR';
        this.httpCode = 502;
        this.contractError = contractError
    }
}