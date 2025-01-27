import request from "supertest";
import { app } from "../../app";


describe("Config Routes", () => {
    it("should handle ping endpoint", async () => {
        const response = await request(app).get("/api/ping");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Server is up and running" });
    });

    it("should get all configuration", async () => {
        const res = await request(app).get("/api/configs");
        expect(res.statusCode).toBe(200);
    });

    it("should get configuration by sequenceNo", async () => {
        const res = await request(app).get("/api/config/1");
        expect(res.statusCode).toBe(200);
    });

    it("should create a configuration", async () => {
        const res = await request(app)
            .post("/api/config")
            .send({
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
            });
        expect(res.statusCode).toBe(201);
    });

    it("should update the configuration by sequenceNo", async () => {
        const res = await request(app).put("/api/config/1")
            .send({
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
            });

        expect(res.statusCode).toBe(200);
    });

    it("should delete a configuration", async () => {
        const res = await request(app).delete("/api/config/1");
        expect(res.statusCode).toBe(200);
    });
});