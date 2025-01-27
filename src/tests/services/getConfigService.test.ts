import { documentClient } from "../../config/dynamoClient";
import { getConfigProperties } from "../../services/getConfigService";
import { unmarshall } from "@aws-sdk/util-dynamodb";

jest.mock('../../config/dynamoClient', () => ({
    documentClient: {
        send: jest.fn(),
    },
}));

jest.mock('@aws-sdk/util-dynamodb', () => ({
    unmarshall: jest.fn(),
}));

describe('getConfigProperties', () => {
    it('should retrieve and unmarshall item successfully', async () => {
        const mockItem = { sequenceNo: { S: '12345' }, property: { S: 'value' } };
        const unmarshalledItem = { sequenceNo: '12345', property: 'value' };

        (documentClient.send as jest.Mock).mockResolvedValueOnce({ Item: mockItem });
        (unmarshall as jest.Mock).mockReturnValueOnce(unmarshalledItem);

        const result = await getConfigProperties('12345');

        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
        expect(result).toEqual(unmarshalledItem);
    });

    it('should return null when item is not found', async () => {
        (documentClient.send as jest.Mock).mockResolvedValueOnce({ Item: undefined });

        const result = await getConfigProperties('12345');

        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
        expect(result).toBeNull();
    });

    it('should handle errors during get operation', async () => {
        const errorMessage = 'Get operation failed';
        (documentClient.send as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await expect(getConfigProperties('12345')).rejects.toThrow(errorMessage);
        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
});
