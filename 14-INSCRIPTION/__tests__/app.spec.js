const { app, Accounts } = require("../app");
const request = require("supertest");

describe("POST /signup", () => {
  it.each([
    { name: "PasdeMotpasse" },
    { password: "PasdeName" },
    { name: "", password: "" },
    { name: 1234, password: "passeword" },
    {},
    { no: "", passwor: "" },
    { name: "a", passwor: "aa" },
  ])(
    // Premier object contient name mais pas de password + deuxieme contient le password mais pas le name...
    "should refuse %p without inserting it.",
    async (invalidObject) => {
      const idDebutTest = Accounts.id;
      const result = await request(app)
        .post("/signup")
        .send(invalidObject)
        .expect(400); // Premier TEST
      const idFinTest = Accounts.id;
      expect(idFinTest).toBe(idDebutTest); // Deuxieme TEST
    }
  );

  it("should add to DB and return username without password", async () => {
    const id = Accounts.id;
    expect(Accounts.exists(id)).toBe(false); //Vérifier que l'element n'a pas été ajouté dans la BD
    const result = await request(app)
      .post("/signup")
      .send({ name: "Deadpool", password: "secret1234" })
      .expect(201);
    expect(Accounts.exists(id)).toBe(true);
    expect(result.body).toEqual({ name: "Deadpool" });
    expect(result.body).toEqual({ name: "Deadpool" });
  });
});
