const request = require("supertest")
const app = require("../app");
// test("Primeiro teste", () => {
//     expect(1+1+1).toBe(3);
// })

// GET http://localhost:3000/api/games
// Teste código de retorno API para lista de jogos
test("Listar jogos mostrando apenas o codigo 200", async() => {
    const response = await request(app).get("/api/games");
    expect(response.statusCode).toBe(200);
});

//Testando conteudo da respostas for um array e se é maior q 0
test("Retornando se é uma lista de jogos", async () => {
    const response = await request(app).get("/api/games");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
});

// POST http://localhost:3000/api/games
test("Criar um novo jogo", async () => {
    const response = await request(app).post("/api/games")
        .send({
            id: 1,
            title: "Capim com Mel",
            genre: "Dança",
            release_year: 2026
        });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Capim com Mel");
    //expect(response.body.id).toBe(1)
    expect(response.body.genre).toBe("Dança")
    expect(response.body.release_year).toBe(2026)
});

//POST com retorno de erros
test("Post com retorno de erro 500", async () => {
    const response = await request(app).post("/api/games").send({});
    expect(response.statusCode).toBe(500);
});

test("Jogo 2", async () => {
    const response = await request(app).post("/api/games")
    .send({
        id: 2,
        title: "Downhill Domination",
        genre: "Corrida",
        release_year: 2003
    })
    const response2 = await request(app)
    .get(`/api/games/${response.body.id}`)

    expect(response2.statusCode).toBe(200);
});