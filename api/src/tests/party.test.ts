import serverApp from "../app";
import http from "http";
import request from "supertest";
import sequelize from "../config/sequelize";

let server: http.Server;

beforeAll(async () => {
  await sequelize.authenticate();
  server = serverApp.listen();
});

afterAll(async () => {
  server.close();
  await sequelize.close();
});

describe("party", () => {
  describe("POST /create", () => {
    describe("Failure cases", () => {
      it("should return a 400 for wrong player name (1)", async () => {
        const body = { player1: "" };

        const response = await request(server)
          .post("/party/create")
          .send(body);
        
        expect(response.body.errors.msg).toBe("player name is not defined");
        expect(response.status).toBe(400);
      });

      it("should return a 400 for wrong player name (2)", async () => {
        const body = {};

        const response = await request(server)
          .post("/party/create")
          .send(body);
        expect(response.body.errors.msg).toBe("player name is not defined");
        expect(response.status).toBe(400);
      });
    });
  });
});