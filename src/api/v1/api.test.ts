import supertest from "supertest";
import app from "../../app";
import TESTDATA from "./test/test.data";

describe("GET /api/v1", () => {
  it("responds with a json message", async () => {
    const response: any = await supertest(app).get("/api/v1");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("v1 apis are up.");
  });
});

describe("Roles", () => {
  it("POST /api/v1/roles/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/roles/create")
      .send(TESTDATA.create);

    expect(response.statusCode).toBe(200);
  });
});

let accessToken: string = "";
let eventId: string = "";
let ticketId: string = "";

describe("Users", () => {
  it("POST /api/v1/users/signup", async () => {
    const response = await supertest(app)
      .post("/api/v1/users/signup")
      .send(TESTDATA.signup);

    expect(response.statusCode).toBe(200);
  });

  it("POST /api/v1/users/login", async () => {
    const response = await supertest(app)
      .post("/api/v1/users/login")
      .send(TESTDATA.signin);

    accessToken = response.body.access_token;
    expect(response.statusCode).toBe(200);
  });

  it("401 GET /api/v1/users", async () => {
    const response = await supertest(app).get("/api/v1/users");

    expect(response.statusCode).toBe(401);
  });

  it("200 GET /api/v1/users", async () => {
    const response = await supertest(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("Events", () => {
  it("401 GET /api/v1/events", async () => {
    const response = await supertest(app).get("/api/v1/events");

    expect(response.statusCode).toBe(401);
  });

  it("200 GET /api/v1/events", async () => {
    const response = await supertest(app)
      .get("/api/v1/events")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  it("500 POST /api/v1/events/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/events/create")
      .field("poster", "John Doe")
      .field("name", TESTDATA.createEvent.name)
      .field("slug", TESTDATA.createEvent.slug)
      .field("startDate", TESTDATA.createEvent.startDate)
      .field("endDate", TESTDATA.createEvent.endDate)
      .field("description", TESTDATA.createEvent.description)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(500);
  });

  it("401 POST /api/v1/events/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/events/create")
      .field("poster", "John Doe")
      .field("name", TESTDATA.createEvent.name)
      .field("slug", TESTDATA.createEvent.slug)
      .field("startDate", TESTDATA.createEvent.startDate)
      .field("endDate", TESTDATA.createEvent.endDate)
      .field("description", TESTDATA.createEvent.description);

    expect(response.statusCode).toBe(401);
  });

  it("200 POST /api/v1/events/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/events/create")
      .attach("poster", TESTDATA.createEvent.poster)
      .field("name", TESTDATA.createEvent.name)
      .field("slug", TESTDATA.createEvent.slug)
      .field("startDate", TESTDATA.createEvent.startDate)
      .field("endDate", TESTDATA.createEvent.endDate)
      .field("description", TESTDATA.createEvent.description)
      .set("Authorization", `Bearer ${accessToken}`);

    eventId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
});

describe("Tickets", () => {
  it("401 GET /api/v1/tickets", async () => {
    const response = await supertest(app).get("/api/v1/tickets");

    expect(response.statusCode).toBe(401);
  });

  it("200 GET /api/v1/tickets", async () => {
    const response = await supertest(app)
      .get("/api/v1/tickets")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  it("200 POST /api/v1/tickets/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/tickets/create")
      .send({ ...TESTDATA.createTicket, eventId })
      .set("Authorization", `Bearer ${accessToken}`);

    ticketId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
});

describe("Orders", () => {
  it("401 GET /api/v1/orders", async () => {
    const response = await supertest(app).get("/api/v1/orders");

    expect(response.statusCode).toBe(401);
  });

  it("200 GET /api/v1/orders", async () => {
    const response = await supertest(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  it("200 POST /api/v1/orders/create", async () => {
    const response = await supertest(app)
      .post("/api/v1/orders/create")
      .send({ ...TESTDATA.createOrder, tickets: ticketId })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });
});
