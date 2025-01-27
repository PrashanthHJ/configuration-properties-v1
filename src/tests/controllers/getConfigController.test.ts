import request from "supertest";
import { app } from "../../app";
import { getConfigProperties } from "../../services/getConfigService";

jest.mock('../../services/getConfigService');

const mockResult = {
  sequenceNo: "123",
  integrationName: "TestIntegration",
  profile: "Dev",
  isActive: true,
  version: "1",
  AWSFlag: false,
  properties: {
    dbName: "TestDB",
    dbPort: "1234",
    dbHost: "localhost",
  },
};

describe('Get Config Controller', () => {
  describe('GET /api/config/:sequenceNo', () => {
    it('should retrieve a configuration successfully', async () => {
      (getConfigProperties as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/config/123')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
    });

    it('should return a 404 error if configuration is not found', async () => {
      (getConfigProperties as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/config/123')
        .send();

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Configuration not found!');
    });

    it('should return a 500 error if there is a server error', async () => {
      (getConfigProperties as jest.Mock).mockRejectedValue(new Error('Failed to retrieve configuration.'));

      const response = await request(app)
        .get('/api/config/123')
        .send();

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to retrieve configuration.');
    });
  });
})

