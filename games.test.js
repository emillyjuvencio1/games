const request = require("supertest")
const app = require("../app");

test("Listar jogos mostrando apenas o codigo 200", async() => {
    const response = await request(app).get("/api/games");
    expect(response.statusCode).toBe(200);
});

//retorna se é array
test("Retornando se é uma lista de jogos", async () => {
    const response = await request(app).get("/api/games");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
});

test("Criar um novo jogo", async () => {
    const response = await request(app).post("/api/games")
        .send({
            title: "MegaBoss",
            genre: "Desafio",
            release_year: 2008
        });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("MegaBoss");
    //expect(response.body.id).toBe(1)
    expect(response.body.genre).toBe("Desafio");
    expect(response.body.release_year).toBe(2008);
});

test("Se API retorna erro 400", async () => {
    const response = await request(app).post("/api/games")
    expect(response.statusCode).toBe(500);
});

//criaçao do segundo jogo buscando pelo id
test("Jogo 2", async () => {
    const response = await request(app).post("/api/games")
    .send({
        id: 4,
        title: "FreeFire",
        genre: "Tiros",
        release_year: 2017
    });
    const response2 = await request(app).get(`/api/games/${response.body.id}`);
    expect(response2.statusCode).toBe(404);
});

test("Desafio", async () => {
    const response = await request(app).post("/api/games")
    .send({
        id: 4,
        title: "FreeFire",
        genre: "Tiros",
        release_year: 2017
    });
    const response2 = await request(app).get(`/api/games/${response.body.id}`);
    expect(response2.statusCode).toBe(404);

    const response3 = await request(app).delete(`/api/games/${response.body.id}`);
    expect(response3.statusCode).toBe(204);

    const response4 = await request(app).get(`/api/games/${response.body.id}`);
    expect(response4.statusCode).toBe(404);
});

test("criar jogo",async () => {
    const response= await request(app).post("/api/games")
    .send({
        id: 5,
        title: "FreeFire",
        genre: "Tiros",
        release_year: 2017
    });
    
    expect(response.statusCode).toBe(200);
    });

//codigo nao esta bem compilado. Tem erros no "constresponse=awaitrequest(app)" falta o const, camelCase, await junto com request e ".post" separado do "(app)". Alem disso não tem conteudo dentro do send para criar um jogo
//response errado e falta puxar o titulo, genero, ano e id