import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { documentClient } from "../../config/dynamoClient";
import { createConfigProperties } from "../../services/createConfigService";
import { Configuration } from "../../models/configModels";

jest.mock('../../config/dynamoClient', () => ({
    documentClient: {
        send: jest.fn(),
    },
}));

const configProperties: Configuration = {
    sequenceNo: "1",
    integrationName: "TestIntegration",
    profile: "Dev",
    isActive: true,
    version: 1,
    AWSFlag: false,
    properties: {
        dbName: "TestDB",
        dbPort: "1234",
        dbHost: "localhost",
    },
};

describe('createConfigProperties', () => {
    it('should create configuration properties successfully', async () => {
        (documentClient.send as jest.Mock).mockResolvedValue({});


        const result = await createConfigProperties(configProperties);

        expect(result).toEqual({});
        expect(documentClient.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
    });

    it('should throw an error if the creation fails', async () => {
        (documentClient.send as jest.Mock).mockRejectedValue(new Error('Failed to create configuration.'));

        await expect(createConfigProperties(configProperties)).rejects.toThrow('Failed to create configuration.');
    });
});
