import { documentClient } from "../../config/dynamoClient";


describe("DynamoDB Client", () => {
    it("should initialize the DynamoDB client", () => {
        expect(documentClient).toBeDefined();
    });
});