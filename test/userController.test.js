const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

describe("Test de userController", () => {
  let server;

  //Antes de todas las pruebas
  beforeAll(async () => {
    const URL_MONGO = process.env.URL_MONGO;
    await mongoose.connect(URL_MONGO);
    server = app.listen(3001);
  });

  //Después de todas las pruebas
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  //Antes de cada prueba
  beforeEach(async () => {
    await userModel.deleteMany();
  });

  //Despues de cada prueba
  afterEach(async () => {});

  describe("getAllUser", () => {
    it("Test para obtener los usuarios", async () => {
      const usersMock = [
        {
          name: "user1",
          lastName: "user1",
          email: "email1",
          password: "pass1",
        },
        {
          name: "user2",
          lastName: "user2",
          email: "email2",
          password: "pass2",
        },
      ];

      await userModel.insertMany(usersMock);

      const response = await request(app).get("/api/user");

      expect(response.status).toBe(200);
      expect(response._body.data[0].name).toBe(usersMock[0].name);
      expect(response._body.data).toHaveLength(2);
    });

    it("test cuando no hay usuario", async () => {
      const response = await request(app).get("/api/user");

      expect(response.status).toBe(200);
      expect(response._body.message).toBe("No hay usuarios");
    });

    it("test cuando falla la petición", async () => {
      jest.spyOn(userModel, "find").mockImplementationOnce(() => {
        throw new Error({ status: "Failed", error: "Ha roto" });
      });

      const response = await request(app).get("/api/user");

      expect(response.status).toBe(500);
      expect(response._body.status).toBe("Failed");
    });
  });

  describe("getUserByName", () => {
    // test para obtener los usuarios
    it("Test para obtener el usuario por nombre", async () => {
      const usersMock = [
        {
          name: "user1",
          lastName: "user1",
          email: "email1",
          password: "pass1",
        },
      ];

      await userModel.insertMany(usersMock);

      const response = await request(app).get(
        `/api/user/searchName/${usersMock[0].name}`
      );

      expect(response.status).toBe(200);
      expect(response._body.data[0].name).toBe(usersMock[0].name);
      expect(response._body.data[0].lastName).toBe(usersMock[0].lastName);
      expect(response._body.data[0].email).toBe(usersMock[0].email);
      expect(response._body.status).toBe("Success");
    });

    it("Test para cuando no encuentra el usuario por nombre", async () => {
      const response = await request(app).get("/api/user/searchName/Name");

      expect(response.status).toBe(200);
      expect(response._body.message).toBe("No hay usuarios con ese nombre");
    });

    it("Test para cuando falla la petición", async () => {
      jest.spyOn(userModel, "find").mockImplementationOnce(() => {
        throw new Error({ status: "Failed", error: "Ha fallado la petición" });
      });

      const response = await request(app).get("/api/user/searchName/Name");

      expect(response.status).toBe(500);
      expect(response._body.status).toBe("Failed");
    });
  });
});
