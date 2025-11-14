const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// bind router database to server
server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(5000, () => {
  console.log("✅ JSON Auth API Running on http://localhost:5000");
});
