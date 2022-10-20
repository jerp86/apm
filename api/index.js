import debug from "debug";
const log = debug("app:api");
import Http from "http";

import database from "../database.json";
import { start } from "../agent/agent.js";
start(database);

const startServer = async (req, res) => {
  return res.end("Hey dude!");
};

const port = 3000;
Http.createServer(startServer).listen(port, () =>
  console.log("running! at", port)
);

export default Http;

// curl -i -H "x-app-id: 1" -X POST -d '{"name":"Jerp86","currency":"BRL","preferences":{"description":"movies"}}' http://localhost:3000
// curl -i -H "x-app-id: 2" -X POST -d '{"name":"JsonBecker","currency":"CAD","preferences":null}' http://localhost:3000
