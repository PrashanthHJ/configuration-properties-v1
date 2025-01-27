import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { documentClient } from "../../config/dynamoClient";
import { deleteConfigProperties } from "../../services/deleteConfigService";

jest.mock('../../config/dynamoClient', () => ({
    documentClient: {
        send: jest.fn(),
    },
}));

describe('deleteConfigProperties', () => {
    it('should delete configuration properties successfully', async () => {
        (documentClient.send as jest.Mock).mockResolvedValue({});


        const result = await deleteConfigProperties('123');

        expect(result).toEqual({});
        expect(documentClient.send).toHaveBeenCalledWith(expect.any(DeleteItemCommand));
    });

    it('should throw an error if the creation fails', async () => {
        (documentClient.send as jest.Mock).mockRejectedValue(new Error('Failed to delete configuration.'));

        await expect(deleteConfigProperties('123')).rejects.toThrow('Failed to delete configuration.');
    });
});
