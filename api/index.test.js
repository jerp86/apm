import debug from "debug";
import assert from "assert";

import Http from "./index.js";

import request1 from "./mocks/request1.json";
import request2 from "./mocks/request2.json";
import database from "../database.json";

const log = debug("app:test");

const [speaksFr, speaksPt] = database;
const PORT = 3000;

async function makeRequest(data, userId, method = "POST") {
  const requestData = JSON.stringify(data);
  const options = {
    hostname: "localhost",
    port: PORT,
    path: "/",
    method,
    headers: {
      "x-app-id": `${userId}`,
      "Content-Length": requestData.length,
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const request = Http.request(options, (res) => {
      res.once("data", resolve);
      res.once("error", reject);
    });

    request.once("error", reject);
    request.write(requestData);
    request.end();
  });
}

{
  const response = await makeRequest(request1, speaksFr.id);

  const expected = {
    name: "Jerp",
    currency: "réal brésilien",
    preferences: "movies",
  };
  const data = JSON.parse(response);
  log("received", data);

  assert.deepEqual(data, expected);
}

{
  const response = await makeRequest(request2, speaksPt.id);
  const data = JSON.parse(response);

  const expected = {
    currency: "Novo dólar taiwanês",
    name: "XuxaDaSilva",
    preferences: "not found",
  };

  log("received", data);

  assert.deepEqual(data, expected);
}

process.exit(0);
