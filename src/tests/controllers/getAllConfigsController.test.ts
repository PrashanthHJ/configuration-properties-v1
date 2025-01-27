import request from "supertest";
import { app } from "../../app";
import { getAllConfigProperties } from "../../services/getAllConfigsService";

jest.mock('../../services/getAllConfigsService');

const mockResult = [{
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
}];

describe('Get All Configs Controller', () => {
  describe('GET /api/configs', () => {
    it('should retrieve all configuration successfully', async () => {
      (getAllConfigProperties as jest.Mock).mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/configs')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
    });

    it('should return a 404 error if configuration is not found', async () => {
      (getAllConfigProperties as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/configs')
        .send();

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Configurations not found!');
    });

    it('should return a 500 error if there is a server error', async () => {
      (getAllConfigProperties as jest.Mock).mockRejectedValue(new Error('Failed to retrieve configurations.'));

      const response = await request(app)
        .get('/api/configs')
        .send();

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to retrieve configurations.');
    });
  });
})

