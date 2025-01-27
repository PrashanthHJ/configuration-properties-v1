import { documentClient } from "../../config/dynamoClient";
import { Configuration } from "../../models/configModels";
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { getAllConfigProperties } from "../../services/getAllConfigsService";

jest.mock('../../config/dynamoClient', () => ({
    documentClient: {
        send: jest.fn(),
    },
}));

jest.mock('@aws-sdk/util-dynamodb', () => ({
    unmarshall: jest.fn(),
}));

describe('createConfigProperties', () => {
    it('should retrieve and unmarshall items successfully', async () => {
        const mockItems = [{ id: { S: '1' } }, { id: { S: '2' } }];
        const unmarshalledItems = [{ id: '1' }, { id: '2' }];

        (documentClient.send as jest.Mock).mockResolvedValueOnce({ Items: mockItems });
        (unmarshall as jest.Mock).mockImplementation(item => unmarshalledItems.find(i => i.id === item.id.S));

        const result = await getAllConfigProperties();

        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
        expect(result).toEqual(unmarshalledItems);
    });

    it('should return an empty array when no items are found', async () => {
        (documentClient.send as jest.Mock).mockResolvedValueOnce({ Items: [] });

        const result = await getAllConfigProperties();

        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
        expect(result).toEqual([]);
    });

    it('should handle errors during scan operation', async () => {
        const errorMessage = 'Scan operation failed';
        (documentClient.send as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await expect(getAllConfigProperties()).rejects.toThrow(errorMessage);
        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
});
