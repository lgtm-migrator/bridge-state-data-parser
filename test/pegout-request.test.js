const pegoutRequestsParser = require('../pegout-request').parseRLPToPegoutRequests;
const { expect } = require('chai');

const pegoutRequestBytes = require('./resources/pegoutRequestBytes');
 
describe("Pegout request parser", () => {

    it("should return an empty array when provided null", () => {
        const result = pegoutRequestsParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should return an empty array when provided an empty Buffer", () => {
        const result = pegoutRequestsParser(Buffer.from(""));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should throw an error when an invalid input is provided", () => {
        expect(() => pegoutRequestsParser("invalid")).to.throw(Error, "invalid remainder");
    });

    it("should return utxos", () => {
        const result = pegoutRequestsParser(Buffer.from(pegoutRequestBytes, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(22);
        const hasExpectedProperties = utxo => {
            return utxo.hasOwnProperty('destinationAddressHash160') && utxo.hasOwnProperty('amountInSatoshis') && utxo.hasOwnProperty('rskTxHash');
        };
        expect(result.every(hasExpectedProperties)).to.be.true;
    });
 
});
