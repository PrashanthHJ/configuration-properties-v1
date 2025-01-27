import request from "supertest";
import { app } from "../../app";
import { createConfigProperties } from "../../services/createConfigService";

jest.mock('../../services/createConfigService');

const mockRequest = {
    sequenceNo: "1",
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

const mockResponse = { "message": "Configuration created successfully!", "result": 'some-result' }

describe("Create Config Controller", () => {
    describe('POST /api/config', () => {
        it('should create a configuration successfully', async () => {
            // Mock the service function to return a successful result
            (createConfigProperties as jest.Mock).mockResolvedValue(mockResponse);

            // Make a request to the endpoint
            const response = await request(app)
                .post('/api/config')
                .send(mockRequest);

            // Assert the response
            expect(response.status).toBe(201);
            expect(response.body.message).toBe(mockResponse.message);
        });

        it('should return an error if configuration creation fails', async () => {
            (createConfigProperties as jest.Mock).mockRejectedValue(new Error('Failed to create configuration.'));

            const response = await request(app)
                .post('/api/config')
                .send(mockRequest);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to create configuration.');
        });
    });
});