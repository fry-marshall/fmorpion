import serverApp from "../app";
import http from "http";
import request from "supertest";
import sequelize from "../config/sequelize";
import Party from "../app/models/party";
import {v4 as uuid} from "uuid"

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

    describe("Success cases", () => {
      it("should return a 201 for good params", async () => {
        const body = { player1: "marshall" };

        const response = await request(server)
          .post("/party/create")
          .send(body);
        
        expect(response.status).toBe(201);

        for(let party of await Party.findAll()){
          await party.destroy()
        }
      });
    })
  });

  describe("PUT /join", () => {
    describe("Failure cases", () => {
      it("should return a 400 for wrong player name (1)", async () => {
        const body = { player2: "" };

        const response = await request(server)
          .put("/party/join")
          .send(body);
        
        expect(response.body.errors.msg).toBe("player name is not defined");
        expect(response.status).toBe(400);
      });

      it("should return a 400 for no params", async () => {
        const body = {};

        const response = await request(server)
          .put("/party/join")
          .send(body);
        expect(response.body.errors.msg).toBe("player name is not defined");
        expect(response.status).toBe(400);
      });

      it("should return a 400 for not code", async () => {
        const body = {player2: "toto"};

        const response = await request(server)
          .put("/party/join")
          .send(body);
        expect(response.body.errors.msg).toBe("code is not defined");
        expect(response.status).toBe(400);
      });

      it("should return a 400 for wrong code", async () => {
        const body = {player2: "toto", code: "12356"};

        const response = await request(server)
          .put("/party/join")
          .send(body);
        expect(response.body.errors.msg).toBe("no parties created with this code");
        expect(response.status).toBe(404);
      });
    });

    describe("Success cases", () => {

      it("should return a 202 for no party created", async () => {
        const party = await Party.create({id: uuid(), code: "12345", player1: "Marshall" })
        const body = { player2: "Edy", code: "12345" };

        const response = await request(server)
          .put("/party/join")
          .send(body);

        console.log(response.body)
        
        expect(response.status).toBe(202);
        //expect(response.body.data.code).toBe("12345");
        await party.destroy()
      });
    })
  });
});