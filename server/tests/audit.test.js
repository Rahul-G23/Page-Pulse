import request from "supertest";
import app from "../app.js";

describe("Page Pulse API", () => {

    test("should reject a non-HTML page", async () => {

        const response = await request(app)
            .post("/api/audit")
            .send({
                url: "https://httpbin.org/image/png"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);

    });

    test("should accept a valid URL", async () => {

        const response = await request(app)
            .post("/api/audit")
            .send({
                url: "https://example.com"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });

});