import request from "supertest";
import { app } from "../../app";
import { deleteConfigProperties } from "../../services/deleteConfigService";

jest.mock('../../services/deleteConfigService');

const mockResponse = { "message": "Configuration deleted successfully!" }

describe("Delete Config Controller", () => {
  describe('DELETE /api/config/:sequenceNo', () => {
    it('should delete a configuration successfully', async () => {
      (deleteConfigProperties as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .delete('/api/config/123')
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Configuration deleted successfully!');
    });

    it('should return an error if configuration deletion fails', async () => {
      (deleteConfigProperties as jest.Mock).mockRejectedValue(new Error('Failed to delete configuration.'));

      const response = await request(app)
        .delete('/api/config/123')
        .send();

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to delete configuration.');
    });
  });
});
