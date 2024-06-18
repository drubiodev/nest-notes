const http = require("http");
const Router = require("./router");
const notes = require("./notes-data");
const host = "localhost";
const port = 8000;

const router = new Router();

router.options("*", (req, res) => {
  res.writeHead(204, {
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  });
  res.end();
});

router.get("/notes", (req, res) => {
  res.writeHead(200);
  res.end(JSON.stringify(notes));
});

router.post("/notes", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on("end", () => {
    const note = JSON.parse(body);
    notes[note.id] = note; // add the new note to the notes array
    res.end(JSON.stringify(notes)); // send back the updated notes
  });
});

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  router.route(req, res);
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
