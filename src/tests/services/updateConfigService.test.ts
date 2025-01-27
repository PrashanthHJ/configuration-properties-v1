import { documentClient } from "../../config/dynamoClient";
import { updateConfigProperty } from "../../services/updateConfigService";

jest.mock('../../config/dynamoClient', () => ({
    documentClient: {
        send: jest.fn(),
    },
}));

describe('createConfigProperties', () => {
    it('should update item successfully and return updated attributes', async () => {
        const key = { sequenceNo: '12345' };
        const updateData = { property: 'newValue' };
        const updatedAttributes = { sequenceNo: '12345', property: 'newValue' };

        (documentClient.send as jest.Mock).mockResolvedValueOnce({ Attributes: updatedAttributes });

        const result = await updateConfigProperty(key, updateData);

        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
        expect(result).toEqual(updatedAttributes);
    });

    it('should handle errors during update operation', async () => {
        const key = { sequenceNo: '12345' };
        const updateData = { property: 'newValue' };
        const errorMessage = 'Update operation failed';

        (documentClient.send as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await expect(updateConfigProperty(key, updateData)).rejects.toThrow(errorMessage);
        expect(documentClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
});
