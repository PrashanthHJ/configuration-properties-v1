import request from "supertest";
import { app } from "../../app";
import { updateConfigProperty } from "../../services/updateConfigService";


jest.mock('../../services/updateConfigService');

const mockRequest = {
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

describe('Update Config Controller', () => {
    describe('PUT /api/config/:sequenceNo', () => {
        it('should update a configuration successfully', async () => {
            (updateConfigProperty as jest.Mock).mockResolvedValue(mockRequest);

            // Make a request to the endpoint
            const response = await request(app)
                .put('/api/config/123')
                .send(mockRequest);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Configuration updated successfully!');
            expect(response.body.data).toEqual(mockRequest);
        });

        it('should return a bad request error if updatedData is missing', async () => {
            let response = await request(app)
                .put('/api/config/123')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Bad Request');
        });

        it('should return an error if configuration update fails', async () => {
            (updateConfigProperty as jest.Mock).mockRejectedValue(new Error('Failed to update configuration.'));

            const response = await request(app)
                .put('/api/config/123')
                .send(mockRequest);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to create configuration.');
            expect(response.body.details).toBeDefined();
        });
    });
})